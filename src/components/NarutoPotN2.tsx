import React from "react";

const NarutoPotN2: React.FC = () => {
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
        src="/narutopotn2.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Naruto PotN 2"
      />
    </div>
  );
};

export default NarutoPotN2;