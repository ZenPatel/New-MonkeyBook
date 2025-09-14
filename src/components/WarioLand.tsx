import React from "react";

const WarioLand: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Optional: fills the viewport vertically
      }}
    >
      <iframe
        src="/warioland.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Wario Land"
      />
    </div>
  );
};

export default WarioLand;