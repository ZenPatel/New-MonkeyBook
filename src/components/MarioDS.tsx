import React from "react";

const MarioDS: React.FC = () => {
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
        src="/mariods.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Super Mario Bros DS"
      />
    </div>
  );
};

export default MarioDS;