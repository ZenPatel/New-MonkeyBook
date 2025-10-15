import React from "react";

export const Minecraft: React.FC = () => {
  return (
    <div className="grid place-items-center h-screen">
      <iframe src="https://eaglercraft.com/mc/1.8.8" title="Minecraft" height="600" width="100%" className="border rounded-lg" allowFullScreen allow="fullscreen"/>
    </div>
  );
};