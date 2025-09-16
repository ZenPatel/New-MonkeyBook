import React from "react";

const PokemonBlue: React.FC = () => {
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
        src="/pokemonblue.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Pokemon Blue"
      />
    </div>
  );
};

export default PokemonBlue;