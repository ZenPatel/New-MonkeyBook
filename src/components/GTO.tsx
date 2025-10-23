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
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%201.mp4",
        },
        {
          title: "Episode 2 - Enter Uchiyamada!",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%202.mp4"
        },
        {
          title: "Episode 3 - Late Night Roof Diving",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%203.mp4"
        },
        {
          title: "Episode 4 - The Secret Life of Onizuka",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%204.mp4"
        },
        {
          title: "Episode 5 - An Eye for an Eye, a Butt for a Butt",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%205.mp4"
        },
        {
          title: "Episode 6 - Conspiracies All Around",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%206.mp4"
        },
        {
          title: "Episode 7 - The Mother of all Crushes",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%207.mp4"
        },
        {
          title: "Episode 8 - Bungee Jumping Made Easy",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%208.mp4"
        },
        {
          title: "Episode 9 - Onizuka and the Art of War",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%209.mp4"
        },
        {
          title: "Episode 10 - Outside Looking In",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2010.mp4"
        },
        {
          title: "Episode 11 - To Be Idolized by a Nation",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2011.mp4"
        },
        {
          title: "Episode 12 - The Formula for Treachery",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2012.mp4"
        },
        {
          title: "Episode 13 - Only the Best Will Do",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2013.mp4"
        },
        {
          title: "Episode 14 - Between a Rock and a Hard Place",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2014.mp4"
        },
        {
          title: "Episode 15 - The Great Sacrifice",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2015.mp4"
        },
        {
          title: "Episode 16 - Beauty + Brains = A Dangerous Mix", 
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2016.mp4"
        },
        {
          title: "Episode 17 - Falling for The Great Onizuka",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2017.mp4"
        },
        {
          title: "Episode 18 - How to Dine and Dash",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2018.mp4"
        },
        {
          title: "Episode 19 - Private Investigations",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2019.mp4"
        },
        {
          title: "Episode 20 - Love Letters",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2020.mp4"
        },
        {
          title: "Episode 21 - Revolution Everywhere",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2021.mp4"
        },
        {
          title: "Episode 22 - The Art of Demolition",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2022.mp4"
        },
        {
          title: "Episode 23 - Superstition",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2023.mp4"
        },
        {
          title: "Episode 24 - Compromising Positions",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2024.mp4"
        },
        {
          title: "Episode 25 - Playing Doctor - GTO Style",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2025.mp4"
        },
        {
          title: "Episode 26 - Onizuka Meets His Match",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2026.mp4"
        },
        {
          title: "Episode 27 - GTO - Agent to the Stars",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2027.mp4"
        },
        {
          title: "Episode 28 - Whatever Can Go Wrong, Will Go Wrong",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2028.mp4"
        },
        {
          title: "Episode 29 - Studies in High Finance",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2029.mp4"
        },
        {
          title: "Episode 30 - Money Talks, GTO Walks",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2030.mp4"
        },
        {
          title: "Episode 31 - Destination: Okinawa",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2031.mp4"
        },
        {
          title: "Episode 32 - The Law of Probability",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2032.mp4"
        },
        {
          title: "Episode 33 - Search and Rescue",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2033.mp4"
        },
        {
          title: "Episode 34 - Good Cop/Bad Cop",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2034.mp4"
        },
        {
          title: "Episode 35 - Wedding Bell Blues",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2035.mp4"
        },
        {
          title: "Episode 36 - Self-Improvement",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2036.mp4"
        },
        {
          title: "Episode 37 - Living Together",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2037.mp4"
        },
        {
          title: "Episode 38 - Great Treasure Okinawa",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2038.mp4"
        },
        {
          title: "Episode 39 - Alone in the Dark",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2039.mp4"
        },
        {
          title: "Episode 40 - Matters of the Heart",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2040.mp4"
        },
        {
          title: "Episode 41 - Confessions",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2041.mp4"
        },
        {
          title: "Episode 42 - Old Wounds Revisited",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2042.mp4"
        },
        {
          title: "Episode 43 - Onizuka's Final Battle",
          src: "https://archive.org/download/great-teacher-onizuka-dub/Great%20Teacher%20Onizuka/Great%20Teacher%20Onizuka%20%28Dub%29%20Episode%2043.mp4"
        }
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