import React from "react";

const SonicAndKnuckles: React.FC = () => {
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
        src="/sonicandknuckles.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Sonic and Knuckles"
      />
    </div>
  );
};

export default SonicAndKnuckles;