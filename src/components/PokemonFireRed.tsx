import React from "react";

const PokemonFireRed: React.FC = () => {
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
        src="/pokemonfirered.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Pokemon FireRed"
      />
    </div>
  );
};

export default PokemonFireRed;