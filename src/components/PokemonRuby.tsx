import React from "react";

const PokemonRuby: React.FC = () => {
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
        src="/pokemonruby.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Pokemon Ruby"
      />
    </div>
  );
};

export default PokemonRuby;