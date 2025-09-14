import React from "react";

const Mario64: React.FC = () => {
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
        src="/mario64.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Super Mario Bros 64"
      />
    </div>
  );
};

export default Mario64;