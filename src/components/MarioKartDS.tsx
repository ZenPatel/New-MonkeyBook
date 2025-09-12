import React from "react";

const MarioKartDS: React.FC = () => {
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
        src="/mariokartds.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Mario Kart DS"
      />
    </div>
  );
};

export default MarioKartDS;