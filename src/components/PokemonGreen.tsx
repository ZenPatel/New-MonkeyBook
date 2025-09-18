import React from "react";

const PokemonGreen: React.FC = () => {
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
        src="/pokemongreen.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Pokemon Green"
      />
    </div>
  );
};

export default PokemonGreen;