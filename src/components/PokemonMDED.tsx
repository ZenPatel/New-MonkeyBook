import React from "react";

const PokemonMDED: React.FC = () => {
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
        src="/pokemonmded.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Pokemon MDED"
      />
    </div>
  );
};

export default PokemonMDED;