import React from "react";

export const MacOS: React.FC = () => {
  return (
    <div className="grid place-items-center h-screen">
      <iframe src="https://macosweb.netlify.app/" title="MacOS" height="600" width="100%" className="border rounded-lg" allowFullScreen allow="fullscreen"/>
    </div>
  );
};