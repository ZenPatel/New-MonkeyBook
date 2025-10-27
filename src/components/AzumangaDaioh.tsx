import React, { useState } from "react";
import ShowPlayer from "./ShowPlayer";

const AzumangaDaioh = {
  title: "Azumanga Daioh",
  seasons: [
    {
      season: 1,
      episodes: [
        {
          title: "Episode 1 - Child High School Student",
          src: "https://archive.org/download/azumanga-daioh-full-series-english-sub/EP.01.v1.1640965802.1080p.mp4",
        },
        {
          title: "Episode 2 - Osaka Today As Well",
          src: "https://archive.org/download/azumanga-daioh-full-series-english-sub/EP.02.v1.1640965862.1080p.mp4",
        },
        {
            title: "Episode 3 - Nyamo",
            src: "https://archive.org/download/azumanga-daioh-full-series-english-sub/EP.03.v1.1640966642.1080p.mp4",
        },
        {
            title: "Episode 4 - A Fun Profession",
            src: "https://archive.org/download/azumanga-daioh-full-series-english-sub/EP.04.v1.1640966879.1080p.mp4",
        },
        {
            title: "Episode 5 - Summer Break",
            src: "https://archive.org/download/azumanga-daioh-full-series-english-sub/EP.05.v1.1640966642.1080p.mp4",
        },
        {
            title: "Episode 6 - Equation for Victory",
            src: "https://archive.org/download/azumanga-daioh-full-series-english-sub/EP.06.v1.1640966363.1080p.mp4",
        },
        {
            title: "Episode 7 - Fairyland Class",
            src: "https://archive.org/download/azumanga-daioh-full-series-english-sub/EP.07.v1.1640967162.1080p.mp4"
        },
        {
            title: "Episode 8 - Osaka's New Year's Dream",
            src: "https://archive.org/download/azumanga-daioh-full-series-english-sub/EP.08.v1.1640966342.1080p.mp4",
        },
        {
            title: "Episode 9 - If I Can't Pet One...",
            src: "https://archive.org/download/azumanga-daioh-full-series-english-sub/EP.09.v1.1640966909.1080p.mp4",
        },
        {
            title: "Episode 10 - Draft Nomination",
            src: "https://archive.org/download/azumanga-daioh-full-series-english-sub/EP.10.v1.1640966402.1080p.mp4",
        },
        {
            title: "Episode 11 - Cosmopolitan City",
            src: "https://archive.org/download/azumanga-daioh-full-series-english-sub/EP.11.v1.1640967003.1080p.mp4",
        },
        {
            title: "Episode 12 - Chiyo-chan's Day",
            src: "https://archive.org/download/azumanga-daioh-full-series-english-sub/EP.12.v1.1640967258.1080p.mp4",
        },
        {
            title: "Episode 13 - Tactics without Guard",
            src: "https://archive.org/download/azumanga-daioh-full-series-english-sub/EP.13.v1.1640967602.1080p.mp4",
        },
        {
            title: "Episode 14 - Shopping",
            src: "https://archive.org/download/azumanga-daioh-full-series-english-sub/EP.14.v1.1640966401.1080p.mp4",
        },
        {
            title: "Episode 15 - Kimura's Family",
            src: "https://archive.org/download/azumanga-daioh-full-series-english-sub/EP.15.v1.1640965802.1080p.mp4"
        },
        {
            title: "Episode 16 - Combination",
            src: "https://archive.org/download/azumanga-daioh-full-series-english-sub/EP.16.v1.1640966332.1080p.mp4",
        },
        {
            title: "Episode 17 - Osaka's Scary Story",
            src: "https://archive.org/download/azumanga-daioh-full-series-english-sub/EP.17.v1.1640966642.1080p.mp4",
        },
        {
            title: "Episode 18 - Elated Yomi",
            src: "https://archive.org/download/azumanga-daioh-full-series-english-sub/EP.18.v1.1640966642.1080p.mp4",
        },
        {
            title: "Episode 19 - Yawning Expert",
            src: "https://archive.org/download/azumanga-daioh-full-series-english-sub/EP.19.v1.1640966642.1080p.mp4",
        },
        {
            title: "Episode 20 - Separation",
            src: "https://archive.org/download/azumanga-daioh-full-series-english-sub/EP.20.v1.1640967165.1080p.mp4",
        },
        {
            title: "Episode 21 - Anticipation",
            src: "https://archive.org/download/azumanga-daioh-full-series-english-sub/EP.21.v1.1640967917.1080p.mp4",
        },
        {
            title: "Episode 22 - It's Nice",
            src: "https://archive.org/download/azumanga-daioh-full-series-english-sub/EP.22.v1.1640965862.1080p.mp4",
        },
        {
            title: "Episode 23 - Chewed",
            src: "https://archive.org/download/azumanga-daioh-full-series-english-sub/EP.23.v1.1640966907.1080p.mp4",
        },
        {
            title: "Episode 24 - Career Path",
            src: "https://archive.org/download/azumanga-daioh-full-series-english-sub/EP.24.v1.1640967144.1080p.mp4",
        },
        {
            title: "Episode 25 - Course Discussion",
            src: "https://archive.org/download/azumanga-daioh-full-series-english-sub/EP.25.v1.1640966402.1080p.mp4",
        },
        {
            title: "Episode 26 - First Graduation",
            src: "https://archive.org/download/azumanga-daioh-full-series-english-sub/EP.26.v1.1640966385.1080p.mp4",
        },
      ],
    },
  ],
};

export const AzumangaDaiohShow: React.FC = () => {
  const [seasonIndex, setSeasonIndex] = useState(0);
  const [episodeIndex, setEpisodeIndex] = useState(0);

  const currentSeason = AzumangaDaioh.seasons[seasonIndex];
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
          {AzumangaDaioh.seasons.map((s, i) => (
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