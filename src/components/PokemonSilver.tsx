import React from "react";

const PokemonSilver: React.FC = () => {
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
        src="/pokemonsilver.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Pokemon Silver"
      />
    </div>
  );
};

export default PokemonSilver;