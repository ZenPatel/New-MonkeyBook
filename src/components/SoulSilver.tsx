import React from "react";

const SoulSilver: React.FC = () => {
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
        src="/soulsilver.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Pokemon - SoulSilver"
      />
    </div>
  );
};

export default SoulSilver;
