import React from "react";

const Mario2USA: React.FC = () => {
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
        src="/mario2usa.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Super Mario Bros 2 USA"
      />
    </div>
  );
};

export default Mario2USA;