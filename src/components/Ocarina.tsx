import React from "react";

const Ocarina: React.FC = () => {
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
        src="/ocarina.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Ocarina"
      />
    </div>
  );
};

export default Ocarina;