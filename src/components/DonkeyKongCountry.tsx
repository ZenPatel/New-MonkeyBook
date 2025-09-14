import React from "react";

const DonkeyKongCountry: React.FC = () => {
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
        src="/dk1.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Donkey Kong Country"
      />
    </div>
  );
};

export default DonkeyKongCountry;