// src/components/DonutChartCard.tsx
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface DonutChartCardProps {
  title: string;
  data: { name: string; value: number }[];
  colors?: string[];
}

const DonutChartCard: React.FC<DonutChartCardProps> = ({ title, data, colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"] }) => {
  return (
    <div
      className="donut-chart-card"
      style={{
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
        background: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
      }}
    >
      <h3 style={{ marginBottom: "0.5rem", fontSize: "1.1rem", color: "#333" }}>{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChartCard;