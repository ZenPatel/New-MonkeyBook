import React from "react";

const LoZ: React.FC = () => {
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
        src="/loz.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="LoZ"
      />
    </div>
  );
};

export default LoZ;