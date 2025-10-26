import React from "react";

export const Roulette: React.FC = () => {
  return (
    <div className="grid place-items-center h-screen">
      <iframe src="https://gamesfrog.com/games/arcade/las-vegas-roulette/iframe" title="Roulette" height="600" width="100%" className="border rounded-lg" allowFullScreen allow="fullscreen"/>
    </div>
  );
};