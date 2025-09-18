import React from "react";

const PokemonSapphire: React.FC = () => {
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
        src="/pokemonsapphire.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Pokemon Sapphire"
      />
    </div>
  );
};

export default PokemonSapphire;