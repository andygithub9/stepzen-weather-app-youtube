'use client'
import { AreaChart, Card, Title } from "@tremor/react";

type Props = {
  results: Root;
};
export default function TempChart({ results }: Props) {
  const hourly = results.hourly.time
    .map((time) =>
      new Date(time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: false,
      })
    )
    .slice(0, 24);

  const data = hourly.map((hour, i) => ({
    time: Number(hour),
    "UV Index": results.hourly.uv_index[i],
    "Temperature (C)": results.hourly.temperature_2m[i],
  }));

  const dataFormatter = (number: number) => `${number}`;

  return (
    <Card>
      <Title>Temperature & UV Index</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time" // 定義 x 軸
        categories={["Temperature (C)", "UV Index"]} // 定義 y 軸
        colors={["yellow", "rose"]} // "yellow" 對應 "Temperature (C)", "UV Index" 對應 "UV Index"
        minValue={0}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
}
