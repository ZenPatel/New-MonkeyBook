import React from "react";

const NarutoNinjaCouncil4: React.FC = () => {
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
        src="/narutonc4.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Naruto Ninja Council 4"
      />
    </div>
  );
};

export default NarutoNinjaCouncil4;