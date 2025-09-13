import React from "react";

const Fifa95: React.FC = () => {
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
        src="/fifa95.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="FIFA 95"
      />
    </div>
  );
};

export default Fifa95;
