import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DonutChartItem = {
  name?: string;
  label?: string;
  status?: string;
  value?: number;
  count?: number;
  total?: number;
};

interface DonutChartCardProps {
  title?: string;
  subtitle?: string;
  data?: DonutChartItem[];
  colors?: string[];
}

const DonutChartCard: React.FC<DonutChartCardProps> = ({
  title = "Order Status Overview",
  subtitle = "status distribution overview",
  data = [],
  colors = ["#d97706", "#22c55e", "#3b82f6", "#ef4444"],
}) => {
  const chartData =
    data.length > 0
      ? data
          .map((item, index) => ({
            name:
              item.name ||
              item.label ||
              item.status ||
              `item ${index + 1}`,
            value: Number(item.value ?? item.count ?? item.total ?? 0),
          }))
          .filter((item) => item.value > 0)
      : [
          { name: "pending", value: 0 },
          { name: "preparing", value: 0 },
          { name: "completed", value: 0 },
          { name: "cancelled", value: 0 },
        ];

  const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);
  const hasData = totalValue > 0;

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || payload.length === 0) {
      return null;
    }

    const item = payload[0].payload;
    const percentage =
      totalValue > 0 ? ((item.value / totalValue) * 100).toFixed(1) : "0.0";

    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3">
        <p className="text-sm font-bold text-gray-900 capitalize">
          {item.name}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Count:{" "}
          <span className="font-bold text-gray-900">
            {item.value}
          </span>
        </p>
        <p className="text-xs text-gray-500">
          Share:{" "}
          <span className="font-bold text-amber-600">
            {percentage}%
          </span>
        </p>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="mb-4">
        <h3 className="font-bold text-gray-900">{title}</h3>
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">
          {subtitle}
        </p>
      </div>

      {!hasData ? (
        <div className="w-full h-[220px] rounded-2xl bg-gray-50 border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-full bg-white border border-gray-100 flex items-center justify-center mb-3">
            <span className="text-xl font-bold text-gray-300">0</span>
          </div>
          <p className="text-sm font-bold text-gray-500">
            No chart data yet
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Order status data will appear here.
          </p>
        </div>
      ) : (
        <>
          <div className="w-full h-[220px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={3}
                  cornerRadius={8}
                  labelLine={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.name}-${index}`}
                      fill={colors[index % colors.length]}
                      stroke="#ffffff"
                      strokeWidth={3}
                    />
                  ))}
                </Pie>

                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Total
                </p>
                <p className="text-3xl font-black text-gray-900 leading-tight">
                  {totalValue}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            {chartData.map((item, index) => {
              const percentage =
                totalValue > 0
                  ? Math.round((item.value / totalValue) * 100)
                  : 0;

              return (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-3 bg-gray-50 rounded-2xl px-3 py-2"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: colors[index % colors.length] }}
                    />
                    <span className="text-xs font-bold text-gray-600 truncate capitalize">
                      {item.name}
                    </span>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-gray-900">
                      {item.value}
                    </p>
                    <p className="text-[10px] font-bold text-gray-400">
                      {percentage}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default DonutChartCard;
