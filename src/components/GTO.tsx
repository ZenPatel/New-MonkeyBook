import React, { useState } from "react";
import ShowPlayer from "./ShowPlayer";

const GTO = {
  title: "Great Teacher Onizuka",
  seasons: [
    {
      season: 1,
      episodes: [
        {
          title: "Episode 1 - GTO - The Legend Begins",
          src: "https://archive.org/embed/great-teacher-onizuka-dub/Great+Teacher+Onizuka/Great+Teacher+Onizuka+(Dub)+Episode+1.mp4",
        },
      ],
    },
  ],
};

export const GTOShow: React.FC = () => {
  const [seasonIndex, setSeasonIndex] = useState(0);
  const [episodeIndex, setEpisodeIndex] = useState(0);

  const currentSeason = GTO.seasons[seasonIndex];
  const currentEpisode = currentSeason.episodes[episodeIndex];

  return (
    <div className="space-y-4">

      {/* Season + Episode selectors */}
      <div className="flex gap-4 justify-center">
        {/* Season selector */}
        <select
          value={seasonIndex}
          onChange={(e) => {
            setSeasonIndex(Number(e.target.value));
            setEpisodeIndex(0); // reset to first ep when season changes
          }}
          className="p-2 border rounded text-black bg-white"
        >
          {GTO.seasons.map((s, i) => (
            <option key={i} value={i}>
              Season {s.season}
            </option>
          ))}
        </select>

        {/* Episode selector */}
        <select
          value={episodeIndex}
          onChange={(e) => setEpisodeIndex(Number(e.target.value))}
          className="p-2 border rounded text-black bg-white"
        >
          {currentSeason.episodes.map((ep, i) => (
            <option key={i} value={i}>
              {ep.title}
            </option>
          ))}
        </select>
      </div>

      {/* Player */}
      <ShowPlayer src={currentEpisode.src} title={currentEpisode.title} />
    </div>
  );
};