import React from "react";

const PacMan: React.FC = () => {
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
        src="/pacman.html"
        style={{ width: "800px", height: "600px", border: "none" }}
        title="Pac-Man"
      />
    </div>
  );
};

export default PacMan;