import React from "react";

const MarioPartyDS: React.FC = () => {
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
        src="/mariopartyds.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Mario Party DS"
      />
    </div>
  );
};

export default MarioPartyDS;