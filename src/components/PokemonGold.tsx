import React from "react";

const PokemonGold: React.FC = () => {
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
        src="/pokemongold.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Pokemon Gold"
      />
    </div>
  );
};

export default PokemonGold;