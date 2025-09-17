import React from "react";

const Sonic2: React.FC = () => {
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
        src="/sonic2.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Sonic 2"
      />
    </div>
  );
};

export default Sonic2;
