import React from "react";

export const Monopoly: React.FC = () => {
  return (
    <div className="grid place-items-center h-screen">
      <iframe src="https://gamesfrog.com/games/puzzle/monopoly-online/iframe" title="Monopoly" height="600" width="100%" className="border rounded-lg" allowFullScreen allow="fullscreen"/>
    </div>
  );
};