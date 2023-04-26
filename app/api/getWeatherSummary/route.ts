import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // weatherdata in the body of the POST req
  const { weatherData } = await request.json();

  // https://platform.openai.com/docs/api-reference/chat/create?lang=node.js
  // 如果你沒有權限 access 'gpt-4' 可能會得到 error code 401 回應
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false, // 因為我們想要回來的是一個完整的格式
    messages: [
      // 我們要製造一個對話情境
      // 告訴 "system" 也就是 gpt 你現在假裝你是一個氣象播報員
      {
        role: "system",
        content: `Pretend you're a weather news presenter presenting LIVE on television. be energetic and full of charisma. Introduce yourself as Sonny and say you are LIVE from the PAPAFAM Headquarters. State the city you are providing a summary for. Then give a summary of todays weather only. Make it easy for the viewer to understand and know what to do to prepare for those weather conditions such as wear SPF if the UV is high etc. use the uv_index data provided to provide UV advice. Provide a joke regarding the weather. Assume the data came from your team at the news office and not the user.`,
      },
      // 現在 "user" 告訴假裝是氣象播報員的 "system"（gpt）一些關於今天的氣象資料，請 "system" 給出一個總結
      {
        role: "user",
        // 繁體中文版，請 gpt 以繁體中文回應
        // content: `Hi there, can i get a summary of todays weather in Traditional Chinese not Simplified Chinese, use the following information to get the weather data: ${JSON.stringify(
        //   weatherData
        // )}`,
        content: `Hi there, can i get a summary of todays weather, use the following information to get the weather data: ${JSON.stringify(
          weatherData
        )}`,
      },
    ],
  });

  const { data } = response;

  console.log("DATA IS: ", data);

  return NextResponse.json(data.choices[0].message);
}
