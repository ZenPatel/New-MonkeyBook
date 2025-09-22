import React from "react";

const PokemonSoulSilver: React.FC = () => {
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
        src="/pokemonsoulsilver.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Pokemon SoulSilver"
      />
    </div>
  );
};

export default PokemonSoulSilver;