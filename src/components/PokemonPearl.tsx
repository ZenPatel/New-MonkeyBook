import React from "react";

const PokemonPearl: React.FC = () => {
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
        src="/pokemonpearl.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Pokemon Pearl"
      />
    </div>
  );
};

export default PokemonPearl;