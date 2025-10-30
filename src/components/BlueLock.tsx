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
        {
          title: "Episode 16 - Tri-Fusion",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season1/S01E16-Tri-Fusion.mp4",
        },
        {
          title: "Episode 17 - Donkey",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season1/S01E17-Donkey.mp4",
        },
        {
          title: "Episode 18 - The Stage for the Lead",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season1/S01E18-The+Stage+for+the+Lead.mp4",
        },
        {
          title: "Episode 19 - Dancing Boy",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season1/S01E19-Dancing+Boy.mp4",
        },
        {
          title: "Episode 20 - Super Link-Up Play",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season1/S01E20-Super+Link-Up+Play.mp4",
        },
        {
          title: "Episode 21 - I'm Not There",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season1/S01E21-I'm+Not+There.mp4",
        },
        {
          title: "Episode 22 - Voice",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season1/S01E22-Voice.mp4",
        },
        {
          title: "Episode 23 - Luck",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season1/S01E23-Luck.mp4",
        },
        {
          title: "Episode 24 - The Time Has Come",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season1/S01E24-The+Time+Has+Come.mp4",
        },
      ],
    },
    {
      season: 2,
      episodes: [
        {
          title: "Episode 1 - Tryouts",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season2/%5BYameii%5D+BLUE+LOCK+-+S02E01+%5BEnglish+Dub%5D+%5BCR+WEB-DL+1080p%5D+%5B0BE1606D%5D.mp4",
        },
        {
          title: "Episode 2 - The Assassin and the Ninja",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season2/%5BYameii%5D+BLUE+LOCK+-+S02E02+%5BEnglish+Dub%5D+%5BCR+WEB-DL+1080p%5D+%5B488F431A%5D.mp4"
        },
        {
          title: "Episode 3 - The World You Feel",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season2/%5BYameii%5D+BLUE+LOCK+-+S02E03+%5BEnglish+Dub%5D+%5BCR+WEB-DL+1080p%5D+%5BD806DD49%5D.mp4"
        },
        {
          title: "Episode 4 - Chameleon",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season2/%5BYameii%5D+BLUE+LOCK+-+S02E04+%5BEnglish+Dub%5D+%5BCR+WEB-DL+1080p%5D+%5BF5006300%5D.mp4"
        },
        {
          title: "Episode 5 - Flow",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season2/%5BYameii%5D+BLUE+LOCK+-+S02E05+%5BEnglish+Dub%5D+%5BCR+WEB-DL+1080p%5D+%5B4C9E2A67%5D.mp4"
        },
        {
          title: "Episode 6 - The Big Stage",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season2/%5BYameii%5D+BLUE+LOCK+-+S02E06+%5BEnglish+Dub%5D+%5BCR+WEB-DL+1080p%5D+%5BA815F01C%5D.mp4"
        },
        {
          title: "Episode 7 - Itoshi Sae",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season2/%5BYameii%5D+BLUE+LOCK+-+S02E07+%5BEnglish+Dub%5D+%5BCR+WEB-DL+1080p%5D+%5BBB4F75E6%5D.mp4"
        },
        {
          title: "Episode 8 - Blue Genes",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season2/%5BYameii%5D+BLUE+LOCK+-+S02E08+%5BEnglish+Dub%5D+%5BCR+WEB-DL+1080p%5D+%5B406ABDA4%5D.mp4"
        },
        {
          title: "Episode 9 - Night Snow",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season2/%5BYameii%5D+BLUE+LOCK+-+S02E09+%5BEnglish+Dub%5D+%5BCR+WEB-DL+1080p%5D+%5B7BBC2973%5D.mp4"
        },
        {
          title: "Episode 10 - The Subs Take to the Stage",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season2/%5BYameii%5D+BLUE+LOCK+-+S02E10+%5BEnglish+Dub%5D+%5BCR+WEB-DL+1080p%5D+%5BA946FD0D%5D.mp4"
        },
        {
          title: "Episode 11 - What You Taught Us",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season2/%5BYameii%5D+BLUE+LOCK+-+S02E11+%5BEnglish+Dub%5D+%5BCR+WEB-DL+1080p%5D+%5B48652D69%5D.mp4"
        },
        {
          title: "Episode 12 - Flowers",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season2/%5BYameii%5D+BLUE+LOCK+-+S02E12+%5BEnglish+Dub%5D+%5BCR+WEB-DL+1080p%5D+%5B41763277%5D.mp4"
        },
        {
          title: "Episode 13 - Not Alone",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season2/%5BYameii%5D+BLUE+LOCK+-+S02E13+%5BEnglish+Dub%5D+%5BCR+WEB-DL+1080p%5D+%5B82F8D7F2%5D.mp4"
        },
        {
          title: "Episode 14 - Last Attack",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/blue+lock/Season2/%5BYameii%5D+BLUE+LOCK+-+S02E14+%5BEnglish+Dub%5D+%5BCR+WEB-DL+1080p%5D+%5BBE363563%5D.mp4"
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