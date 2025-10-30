import React, { useState } from "react";
import ShowPlayer from "./ShowPlayer";

const BlueLock = {
  title: "Blue Lock",
  seasons: [
    {
      season: 1,
      episodes: [
        {
          title: "Episode 1 - Dream",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season1/S01E01-Dream.mp4",
        },
        {
          title: "Episode 2 - Monster",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season1/S01E02-Monster.mp4"
        },
        {
          title: "Episode 3 - Soccer's Zero",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season1/S01E02-Monster.mp4"
        },
        {
          title: "Episode 4 - Premonition and Intuition",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season1/S01E04-Premonition+and+Intuition.mp4"
        },
        {
          title: "Episode 5 - To Be Reborn",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season1/S01E05-To+Be+Reborn.mp4"
        },
        {
          title: "Episode 6 - I'm Sorry",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season1/S01E06-I'm+Sorry.mp4"
        },
        {
          title: "Episode 7 - Rush",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season1/S01E07-Rush.mp4"
        },
        {
          title: "Episode 8 - The Formula for Goals",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season1/S01E08-The+Formula+for+Goals.mp4"
        },
        {
          title: "Episode 9 - Awakening",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season1/S01E09-Awakening.mp4"
        },
        {
          title: "Episode 10 - The Way It Is",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season1/S01E10-Just+the+Way+It+Is.mp4"
        },
        {
          title: "Episode 11 - The Final Piece",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season1/S01E11-The+Final+Piece.mp4"
        },
        {
          title: "Episode 12 - The Second Selection",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season1/S01E12-The+Second+Selection.mp4"
        },
        {
          title: "Episode 13 - TOP 3",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season1/S01E13-TOP+3.mp4"
        },
        {
          title: "Episode 14 - The Geniuses and the Average Joes",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season1/S01E14-The+Geniuses+and+the+Average+Joes.mp4"
        },
        {
          title: "Episode 15 - Devour",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season1/S01E15-Devour.mp4"
        },
      ],
    },
  ],
};

export const BlueLockShow: React.FC = () => {
  const [seasonIndex, setSeasonIndex] = useState(0);
  const [episodeIndex, setEpisodeIndex] = useState(0);

  const currentSeason = BlueLock.seasons[seasonIndex];
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
          {BlueLock.seasons.map((s, i) => (
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