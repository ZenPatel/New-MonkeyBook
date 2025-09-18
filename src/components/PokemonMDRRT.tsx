import React from "react";

const PokemonMDRRT: React.FC = () => {
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
        src="/pokemonmdrrt.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Pokemon MDRRT"
      />
    </div>
  );
};

export default PokemonMDRRT;