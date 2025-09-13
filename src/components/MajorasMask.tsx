import React from "react";

const MajorasMask: React.FC = () => {
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
        src="/majorasmask.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="LoZ Majora's Mask"
      />
    </div>
  );
};

export default MajorasMask;
