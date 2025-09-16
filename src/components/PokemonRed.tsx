import React from "react";

const PokemonRed: React.FC = () => {
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
        src="/pokemonred.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Pokemon Red"
      />
    </div>
  );
};

export default PokemonRed;