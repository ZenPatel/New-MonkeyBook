import React from "react";

const MarioAndLuigiPiT: React.FC = () => {
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
        src="/marioandluigipit.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Mario and Luigi PiT"
      />
    </div>
  );
};

export default MarioAndLuigiPiT;