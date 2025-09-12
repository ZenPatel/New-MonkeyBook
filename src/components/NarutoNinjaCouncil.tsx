import React from "react";

const NarutoNinjaCouncil: React.FC = () => {
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
        src="/narutonc1.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="HNI DS"
      />
    </div>
  );
};

export default NarutoNinjaCouncil;
