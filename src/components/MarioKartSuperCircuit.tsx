import React from "react";

const MarioKartSuperCircuit: React.FC = () => {
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
        src="/mariokartsupercircuit.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Mario Kart Super Circuit"
      />
    </div>
  );
};

export default MarioKartSuperCircuit;