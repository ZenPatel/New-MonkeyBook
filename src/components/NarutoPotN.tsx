import React from "react";

const NarutoPotN: React.FC = () => {
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
        src="/narutopotn.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Naruto PotN"
      />
    </div>
  );
};

export default NarutoPotN;