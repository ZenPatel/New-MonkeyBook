import React from "react";

const TekkenGBA: React.FC = () => {
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
        src="/tekkengba.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Tekken Advance"
      />
    </div>
  );
};

export default TekkenGBA;
