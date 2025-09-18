import React from "react";

const PokemonLeafGreen: React.FC = () => {
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
        src="/pokemonleafgreen.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Pokemon LeafGreen"
      />
    </div>
  );
};

export default PokemonLeafGreen;