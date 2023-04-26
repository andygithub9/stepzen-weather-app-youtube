# set up

1. https://nextjs.org/docs/messages/opening-an-issue  
   `npx create-next-app@canary`
2. install tremor: https://www.tremor.so/docs/getting-started/installation

# GraphQL Set Up

1. install Apollo Client  
   https://www.apollographql.com/docs/react/  
   `npm install @apollo/client graphql`
2. create apollo-client.ts at root to connect backend
3. create query at graphql/queries/fetchWeatherQueries.ts
4. send query to backend see: app/location/[city]/[lat]/[long]/page.tsx

# Setpzen

1. Connect to StepZen  
   https://stepzen.com/docs/connecting-frontends/connecting-to-stepzen  
   要在 request header 加上 Authorization: apikey [your api key]
2. Deploys the code and open local dashboard  
    https://stepzen.com/docs/cli/cli-commands#stepzen-start  
    `stepzen start --dashboard=local`
   ```sh
   Deploying api/volted-lobster to StepZen... done in 2.6s 🚀
   # 下面這行 url 就是部署到 stepzen 的 api endpoint
   ✓ 🔐 https://guiren.stepzen.net/api/volted-lobster/__graphql
   ```

# Stepzen connet

在 `stepzen import curl https://api.open-meteo.com/v1/forecast?latitude=51.51&longitude=-0.13&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,windgusts_10m,uv_index,uv_index_clear_sky&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max&current_weather=true&timezone=Europe%2FLondon` 把 url 的資料結構和類型抓到 stepzen/curl/index.graphql 的時候，Stepzen 會把原本是 String 的類型轉換成 DateTime，所以要手動再把 stepzen/curl/index.graphql 裡面的 DateTime 類型換成 String 類型

# 在 GraphQL 設定 Revalidating Data (ISR)

https://beta.nextjs.org/docs/data-fetching/revalidating#background-revalidation
如果不是用 fetch 而是用其他的工具請求 api （像是 GraphQL）的話要在 page.tsx export const revalidate = 秒數
如果是用 fetch 的話，加在 fetch 的 next.revalidate option 就可以了

# 注意事項

1. 目前每一頁都要寫 loading.tsx 作為 loading page，因為現在 next.js 不會用最底層的 loading.tsx 作為 loading page，而是要在每一層的 page.tsx 都創建一個 loading.tsx
2. https://vercel.com/docs/concepts/limits/overview
   Hobby plan 的 Serverless Function Execution Timeout (Seconds): 10  
   因為我們的後端 api/getWeatherSummary 這支 api 打到 openai 後通常等待回應的時間都會超過 10 秒，所以部署到 vercel 上後我們打這支 api 會得到 status: 504，statusText: 'Gateway Timeout'  
   所以專案部署到 vercel 就會壞掉因為內頁會打這隻 api ，這隻 api 打到 openai 後的等待回應時間超過 vercel 的 10 秒等待回應時間上限，除非你付費升級你的 plan

# 用 vercel cli 部署到 vercel 上
`vercel` 指令是 Preview 環境的部署
`vercel --prod` 指令是 Production 環境的部署