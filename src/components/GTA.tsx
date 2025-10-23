import React from "react";

export const GTA: React.FC = () => {
  return (
    <div className="grid place-items-center h-screen">
      <iframe src="https://gam.onl/psx/grand-theft-auto.html#grand-theft-auto" title="GTA" height="600" width="100%" className="border rounded-lg" allowFullScreen allow="fullscreen"/>
    </div>
  );
};