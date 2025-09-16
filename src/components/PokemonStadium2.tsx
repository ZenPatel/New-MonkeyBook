import React from "react";

const PokemonStadium2: React.FC = () => {
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
        src="/pokemonstadium2.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Pokemon Stadium 2"
      />
    </div>
  );
};

export default PokemonStadium2;