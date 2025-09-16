import React from "react";

const PokemonYellow: React.FC = () => {
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
        src="/pokemonyellow.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Pokemon Yellow"
      />
    </div>
  );
};

export default PokemonYellow;