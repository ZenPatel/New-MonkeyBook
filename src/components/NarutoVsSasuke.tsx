import React from "react";

const NarutoVsSasuke: React.FC = () => {
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
        src="/narutovssasuke.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Naruto vs Sasuke"
      />
    </div>
  );
};

export default NarutoVsSasuke;