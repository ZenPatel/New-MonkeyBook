import React, { useState } from "react";
import ShowPlayer from "./ShowPlayer";

const Berserk = {
  title: "Berserk 1997",
  seasons: [
    {
      season: 1,
      episodes: [
        {
          title: "Episode 1 - The Black Swordsman",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/Berserk/Berserk+%5B1997%5D+-+01%EF%BC%9A+The+Black+Swordsman.mp4",
        },
        {
          title: "Episode 2 - The Band of the Hawk",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/Berserk/Berserk+%5B1997%5D+-+02%EF%BC%9A+The+Band+of+the+Hawk.mp4",
        },
        {
            title: "Episode 3 - First Battle",
            src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/Berserk/Berserk+%5B1997%5D+-+03%EF%BC%9A+First+Battle.mp4",
        },
        {
            title: "Episode 4 - The Hand of God",
            src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/Berserk/Berserk+%5B1997%5D+-+04%EF%BC%9A+The+Hand+of+God.mp4",
        },
        {
            title: "Episode 5 - Sword and the Wind",
            src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/Berserk/Berserk+%5B1997%5D+-+05%EF%BC%9A+Sword+and+the+Wind.mp4",
        },
        {
            title: "Episode 6 - Zodd the Immortal",
            src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/Berserk/Berserk+%5B1997%5D+-+06%EF%BC%9A+Zodd+the+Immortal.mp4",
        },
        {
            title: "Episode 7 - The Sword Master",
            src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/Berserk/Berserk+%5B1997%5D+-+07%EF%BC%9A+The+Sword+Master.mp4"
        },
        {
            title: "Episode 8 - Conspiracy",
            src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/Berserk/Berserk+%5B1997%5D+-+08%EF%BC%9A+Conspiracy.mp4",
        },
        {
            title: "Episode 9 - Assassination",
            src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/Berserk/Berserk+%5B1997%5D+-+09%EF%BC%9A+Assassination.mp4",
        },
        {
            title: "Episode 10 - Nobleman",
            src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/Berserk/Berserk+%5B1997%5D+-+10%EF%BC%9A+Nobleman.mp4",
        },
        {
            title: "Episode 11 - Battle Engagement",
            src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/Berserk/Berserk+%5B1997%5D+-+11%EF%BC%9A+Battle+Engagement.mp4",
        },
        {
            title: "Episode 12 - Two People",
            src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/Berserk/Berserk+%5B1997%5D+-+12%EF%BC%9A+Two+People.mp4",
        },
        {
            title: "Episode 13 - Suicidal Act",
            src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/Berserk/Berserk+%5B1997%5D+-+13%EF%BC%9A+Suicidal+Act.mp4",
        },
        {
            title: "Episode 14 - Campfire of Dreams",
            src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/Berserk/Berserk+%5B1997%5D+-+14%EF%BC%9A+Campfire+of+Dreams.mp4",
        },
        {
            title: "Episode 15 - The Decisive Battle",
            src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/Berserk/Berserk+%5B1997%5D+-+15%EF%BC%9A+The+Decisive+Battle.mp4"
        },
        {
            title: "Episode 16 - The Conqueror",
            src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/Berserk/Berserk+%5B1997%5D+-+16%EF%BC%9A+The+Conqueror.mp4",
        },
        {
            title: "Episode 17 - Moment of Glory",
            src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/Berserk/Berserk+%5B1997%5D+-+17%EF%BC%9A+Moment+of+Glory.mp4",
        },
        {
            title: "Episode 18 - Tombstone of Flames",
            src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/Berserk/Berserk+%5B1997%5D+-+18%EF%BC%9A+Tombstone+of+Flames.mp4",
        },
        {
            title: "Episode 19 - Parting",
            src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/Berserk/Berserk+%5B1997%5D+-+19%EF%BC%9A+Parting.mp4",
        },
        {
            title: "Episode 20 - The Spark",
            src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/Berserk/Berserk+%5B1997%5D+-+20%EF%BC%9A+The+Spark.mp4",
        },
        {
            title: "Episode 21 - Confession",
            src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/Berserk/Berserk+%5B1997%5D+-+21%EF%BC%9A+Confession.mp4",
        },
        {
            title: "Episode 22 - The Infiltration",
            src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/Berserk/Berserk+%5B1997%5D+-+22%EF%BC%9A+The+Infiltration.mp4",
        },
        {
            title: "Episode 23 - Eve of the Feast",
            src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/Berserk/Berserk+%5B1997%5D+-+23%EF%BC%9A+Eve+of+the+Feast.mp4",
        },
        {
            title: "Episode 24 - Eclipse",
            src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/Berserk/Berserk+%5B1997%5D+-+24%EF%BC%9A+Eclipse.mp4",
        },
        {
            title: "Episode 25 - Perpetual Time",
            src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/Berserk/Berserk+%5B1997%5D+-+25%EF%BC%9A+Perpetual+Time.mp4",
        },
      ],
    },
  ],
};

export const BerserkShow: React.FC = () => {
  const [seasonIndex, setSeasonIndex] = useState(0);
  const [episodeIndex, setEpisodeIndex] = useState(0);

  const currentSeason = Berserk.seasons[seasonIndex];
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
          className="p-2 border rounded text-black"
        >
          {Berserk.seasons.map((s, i) => (
            <option key={i} value={i}>
              Season {s.season}
            </option>
          ))}
        </select>

        {/* Episode selector */}
        <select
          value={episodeIndex}
          onChange={(e) => setEpisodeIndex(Number(e.target.value))}
          className="p-2 border rounded text-black"
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