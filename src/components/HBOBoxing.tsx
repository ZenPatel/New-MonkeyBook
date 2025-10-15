import React from "react";

export const HBOBoxing: React.FC = () => {
  return (
    <div className="grid place-items-center h-screen">
      <iframe src="https://gam.onl/psx/hbo-boxing.html#hbo-boxing" title="HBO Boxing" height="600" width="100%" className="border rounded-lg" allowFullScreen allow="fullscreen"/>
    </div>
  );
};