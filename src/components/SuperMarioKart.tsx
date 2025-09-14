import React from "react";

const SuperMarioKart: React.FC = () => {
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
        src="/supermariokart.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Super Mario Kart"
      />
    </div>
  );
};

export default SuperMarioKart;