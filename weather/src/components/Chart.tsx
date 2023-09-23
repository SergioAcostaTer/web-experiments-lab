// import { useEffect, useRef, useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// interface ChartProps {
//   title: string;
//   data: number[] | undefined;
//   unit: string;
//   time: string[] | undefined;
// }

// export const Chart = ({ title, data = [], time }: ChartProps) => {
//   const initialData = data.map((item, i) => ({
//     temperature: item,
//     hour: time?.[i],
//   }));
//   const [chartData, setChartData] = useState(initialData.slice(-24));
//   const [filter, setFilter] = useState("24h");

//   useEffect(() => {
//     setChartData(initialData.slice(-24));
//   }, [data]);

//   useEffect(() => {
//     if (filter === "24h") {
//       setChartData(initialData.slice(-24));
//     } else if (filter === "48h") {
//       setChartData(initialData.slice(-48));
//     } else if (filter === "full") {
//       setChartData(initialData);
//     }
//   }, [filter]);

//   console.log(chartData);

//   return (
//     <div className="flex flex-col items-center justify-center bg-blue-100 p-4 rounded-[9px] shadow-md">
//       <h2 className="text-xl font-bold">{title}</h2>
//      <ResponsiveContainer>
//          <LineChart
//            data={chartData}
//            margin={{
//              top: 5,
//              bottom: 5,
//            }}
//          >
//            <Tooltip />
//            <Line
//              type="monotone"
//              dataKey="temperature"
//              stroke="#8884d8"
//              activeDot={{ r: 8 }}
//            />
//          </LineChart>
//      </ResponsiveContainer>
//       <div className="flex gap-4">
//         <button onClick={() => setFilter("24h")}>24h</button>
//         <button onClick={() => setFilter("48h")}>48h</button>
//         <button onClick={() => setFilter("full")}>last week</button>
//       </div>
//     </div>
//   );
// };
