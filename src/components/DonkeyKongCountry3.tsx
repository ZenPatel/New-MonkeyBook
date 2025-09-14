import React from "react";

const DonkeyKongCountry3: React.FC = () => {
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
        src="/dk3.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Donkey Kong Country 3"
      />
    </div>
  );
};

export default DonkeyKongCountry3;