// src/components/LineChartCard.tsx
import React from "react";

interface LineChartCardProps {
  title: string;
  data?: any;
}

const LineChartCard: React.FC<LineChartCardProps> = ({ title }) => {
  return (
    <div className="line-chart-card" style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "8px", background: "#fff", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
      <h3 style={{ marginBottom: "0.5rem", fontSize: "1.1rem", color: "#333" }}>{title}</h3>
      {/* placeholder for chart */}
      <div style={{ height: "200px", background: "#f0f0f0", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", color: "#888" }}>
        Chart goes here
      </div>
    </div>
  );
};

export default LineChartCard;