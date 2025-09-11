import React from "react";

const SuperMarioBros: React.FC = () => {
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
        src="/supermario.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Super Mario Bros"
      />
    </div>
  );
};

export default SuperMarioBros;
