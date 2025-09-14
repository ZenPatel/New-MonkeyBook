import React from "react";

const MarioKart64: React.FC = () => {
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
        src="/mariokart64.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Mario Kart 64"
      />
    </div>
  );
};

export default MarioKart64;