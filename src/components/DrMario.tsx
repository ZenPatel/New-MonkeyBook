import React from "react";

const DrMario: React.FC = () => {
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
        src="/drmario.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Dr Mario"
      />
    </div>
  );
};

export default DrMario;