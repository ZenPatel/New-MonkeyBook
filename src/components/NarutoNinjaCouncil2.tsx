import React from "react";

const NarutoNinjaCouncil2: React.FC = () => {
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
        src="/narutonc2.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Naruto Ninja Council 2"
      />
    </div>
  );
};

export default NarutoNinjaCouncil2;
