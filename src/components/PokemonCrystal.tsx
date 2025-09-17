import React from "react";

const PokemonCrystal: React.FC = () => {
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
        src="/pokemoncrystal.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Pokemon Crystal"
      />
    </div>
  );
};

export default PokemonCrystal;