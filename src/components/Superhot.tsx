import React from "react";

export const Superhot: React.FC = () => {
  return (
    <div className="grid place-items-center h-screen">
      <iframe src="https://elfexds.github.io/superhot2/" title="Superhot" height="600" width="100%" className="border rounded-lg" allowFullScreen allow="fullscreen"/>
    </div>
  );
};