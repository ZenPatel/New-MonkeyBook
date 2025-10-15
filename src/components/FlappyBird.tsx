import React from "react";

export const FlappyBird: React.FC = () => {
  return (
    <div className="grid place-items-center h-screen">
      <iframe src="https://tylerpalko.github.io/gamehub/flappybird/" title="Flappy Bird" height="600" width="100%" className="border rounded-lg" allowFullScreen allow="fullscreen"/>
    </div>
  );
};