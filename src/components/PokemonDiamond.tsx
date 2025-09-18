import React from "react";

const PokemonDiamond: React.FC = () => {
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
        src="/pokemondiamond.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Pokemon Diamond"
      />
    </div>
  );
};

export default PokemonDiamond;