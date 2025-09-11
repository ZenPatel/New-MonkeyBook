import React from "react";

const PunchOut: React.FC = () => {
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
        src="/punchout.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Punch Out"
      />
    </div>
  );
};

export default PunchOut;
