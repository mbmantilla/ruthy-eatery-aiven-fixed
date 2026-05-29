// src/components/LineChartCard.tsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type ChartItem = {
  name?: string;
  label?: string;
  month?: string;
  date?: string;
  value?: number;
  revenue?: number;
  total?: number;
};

interface LineChartCardProps {
  title?: string;
  data?: ChartItem[];
}

const LineChartCard: React.FC<LineChartCardProps> = ({
  title = "Revenue Trend",
  data = [],
}) => {
  const chartData =
    data.length > 0
      ? data.map((item, index) => ({
          name:
            item.name ||
            item.label ||
            item.month ||
            item.date ||
            `item ${index + 1}`,
          value: Number(item.value ?? item.revenue ?? item.total ?? 0),
        }))
      : [
          { name: "mon", value: 0 },
          { name: "tue", value: 0 },
          { name: "wed", value: 0 },
          { name: "thu", value: 0 },
          { name: "fri", value: 0 },
        ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="mb-4">
        <h3 className="font-bold text-gray-900">{title}</h3>
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">
          sales and activity overview
        </p>
      </div>

      <div className="w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#d97706"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartCard;