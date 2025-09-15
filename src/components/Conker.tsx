import React from "react";

const Conker: React.FC = () => {
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
        src="/conker.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Conkers Bad Fur Day"
      />
    </div>
  );
};

export default Conker;