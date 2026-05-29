// src/components/DonutChartCard.tsx
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface DonutChartCardProps {
  title: string;
  data: { name: string; value: number }[];
  colors?: string[];
  height?: number;
  showLabels?: boolean; // optional prop to show slice labels
}

const DonutChartCard: React.FC<DonutChartCardProps> = ({
  title,
  data,
  colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
  height = 200,
  showLabels = false,
}) => {
  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      return (
        <div
          style={{
            background: "#fff",
            border: "1px solid #ccc",
            padding: "0.5rem",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <strong>{name}</strong>: {value}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="donut-chart-card"
      style={{
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
        background: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ marginBottom: "0.5rem", fontSize: "1.1rem", color: "#333" }}>
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            label={showLabels ? ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%` : undefined}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChartCard;