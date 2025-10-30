import React, { useState } from "react";
import ShowPlayer from "./ShowPlayer";

const Boondocks = {
  title: "The Boondocks",
  seasons: [
    {
      season: 0,
      episodes: [
        {
          title: "Pilot",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/BoondocksPilot.mp4",
        }
      ]
    },
    {
      season: 1,
      episodes: [
        {
          title: "Episode 1 - The Garden Party",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season1/The+Boondocks+-+S01E01+-+The+Garden+Party.ia.mp4",
        },
        {
          title: "Episode 2 - The Trial of R. Kelly",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season1/The+Boondocks+-+S01E02+-+The+Trial+of+Robert+Kelly.ia.mp4"
        },
        {
          title: "Episode 3 - Guess Hoe's Coming to Dinner",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season1/The+Boondocks+-+S01E03+-+Guess+Hoe's+Coming+to+Dinner.ia.mp4"
        },
        {
          title: "Episode 4 - Granddad's Fight",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season1/The+Boondocks+-+S01E04+-+Granddad's+Fight.ia.mp4"
        },
        {
          title: "Episode 5 - A Date With the Health Inspector",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season1/The+Boondocks+-+S01E05+-+A+Date+With+the+Health+Inspector.ia.mp4"
        },
        {
          title: "Episode 6 - The Story of Gangstalicious",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season1/The+Boondocks+-+S01E06+-+The+Story+of+Gangstalicious.ia.mp4"
        },
        {
          title: "Episode 7 - A Huey Freeman Christmas",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season1/The+Boondocks+-+S01E07+-+A+Huey+Freeman+Christmas.ia.mp4"
        },
        {
          title: "Episode 8 - The Real",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season1/The+Boondocks+-+S01E08+-+The+Real.ia.mp4"
        },
        {
          title: "Episode 9 - Return of the King",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season1/The+Boondocks+-+S01E09+-+Return+of+the+King.ia.mp4"
        },
        {
          title: "Episode 10 - The Itis",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season1/The+Boondocks+-+Se1+-+Ep10+-+The+Itis+HD+Watch.mp4"
        },
        {
          title: "Episode 11 - Let's Nab Oprah",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season1/The+Boondocks+-+S01E11+-+Let's+Nab+Oprah.ia.mp4"
        },
        {
          title: "Episode 12 - Riley Wuz Here",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season1/The+Boondocks+-+S01E12+-+Riley+Wuz+Here.ia.mp4"
        },
        {
          title: "Episode 13 - Wingmen",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season1/The+Boondocks+-+S01E13+-+Wingmen.ia.mp4"
        },
        {
          title: "Episode 14 - The Block is Hot",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season1/The+Boondocks+-+S01E14+-+The+Block+is+Hot.ia.mp4"
        },
        {
          title: "Episode 15 - The Passion of Reverend Ruckus",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season1/The+Boondocks+-+S01E15+-+The+Passion+of+Reverend+Ruckus.ia.mp4"
        },
      ],
    },
    {
        season: 2,
        episodes: [
        {
          title: "Episode 1 - ...Or Die Trying",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season2/The+Boondocks+-+S02E01+-+...Or+Die+Trying.mp4",
        },
        {
          title: "Episode 2 - Tom, Sarah and Usher",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season2/The+Boondocks+-+S02E02+-+Tom%2C+Sarah%2C+and+Usher.mp4"
        },
        {
          title: "Episode 3 - Thank You for Not Snitching",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season2/The+Boondocks+-+S02E03+-+Thank+You+for+Not+Snitching.mp4"
        },
        {
          title: "Episode 4 - Stinkmeaner Strikes Back",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season2/The+Boondocks+-+S02E04+-+Stinkmeaner+Strikes+Back.mp4"
        },
        {
          title: "Episode 5 - The Story of Thugnificent",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season2/The+Boondocks+-+S02E05+-+The+Story+of+Thugnificent.mp4"
        },
        {
          title: "Episode 6 - Attack of the Killer Kung-Fu Wolf Bitch",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season2/The+Boondocks+-+S02E06+-+Attack+of+the+Killer+Kung-Fu+Wolf+Bitch.mp4"
        },
        {
          title: "Episode 7 - Shinin'",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season2/The+Boondocks+-+S02E07+-+Shinin'.mp4"
        },
        {
          title: "Episode 8 - Ballin'",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season2/The+Boondocks+-+S02E08+-+Ballin'.mp4"
        },
        {
          title: "Episode 9 - Invasion of the Katrinians",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season2/The+Boondocks+-+S02E09+-+Invasion+of+the+Katrinians.mp4"
        },
        {
          title: "Episode 10 - Home Alone",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season2/The+Boondocks+-+S02E10+-+Home+Alone.mp4"
        },
        {
          title: "Episode 11 - The S-Word",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season2/The+Boondocks+-+S02E11+-+The+S+Word.mp4"
        },
        {
          title: "Episode 12 - The Story of Catcher Freeman",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season2/The+Boondocks+-+S02E12+-+The+Story+of+Catcher+Freeman.mp4"
        },
        {
          title: "Episode 13 - The Story of Gangstalicious Part 2",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season2/The+Boondocks+-+S02E13+-+The+Story+of+Gangstalicious+Part+2.mp4"
        },
        {
          title: "Episode 14 - The Hunger Strike",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season2/The+Boondocks+-+S02E14+-+The+Hunger+Strike.mp4"
        },
        {
          title: "Episode 15 - 	The Uncle Ruckus Reality Show",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season2/The+Boondocks+-+S02E15+-+The+Uncle+Ruckus+Reality+Show.mp4"
        },
      ],
    },
    {
      season: 3,
      episodes: [
        {
          title: "Episode 1 - It's a Black President, Huey Freeman",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season+3/The+Boondocks+-+S03E01+-+It's+a+Black+President%2C+Huey+Freeman.mp4",
        },
        {
          title: "Episode 2 - Bitches to Rags",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season+3/The+Boondocks+-+S03E02+-+Bitches+to+Rags.ia.mp4"
        },
        {
          title: "Episode 3 - The Red Ball",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season+3/The+Boondocks+-+S03E03+-+The+Red+Ball.ia.mp4"
        },
        {
          title: "Episode 4 - The Story of Jimmy Rebel",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season+3/The+Boondocks+-+S03E04+-+The+Story+of+Jimmy+Rebel.mp4"
        },
        {
          title: "Episode 5 - Stinkmeaner 3: The Hateocracy",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season+3/The+Boondocks+(4K)+S3+E05+-+Stinkmeaner+3+The+Hateocracy.ia.mp4"
        },
        {
          title: "Episode 6 - Smokin' with Cigarettes",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season+3/The+Boondocks+-+S03E06+-+Smokin'+With+Cigarettes.ia.mp4"
        },
        {
          title: "Episode 7 - The Fundraiser",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season+3/The+Boondocks+-+S03E07+-+The+Fundraiser.ia.mp4"
        },
        {
          title: "Episode 8 - Pause",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season+3/The+Boondocks+-+S03E08+-+Pause.ia.mp4"
        },
        {
          title: "Episode 9 - A Date with the Booty Warrior",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season+3/The+Boondocks+-+S03E09+-+A+Date+With+the+Booty+Warrior.ia.mp4"
        },
        {
          title: "Episode 10 - The Story of Lando Freeman",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season+3/The+Boondocks+-+S03E10+-+The+Story+of+Lando+Freeman.ia.mp4"
        },
        {
          title: "Episode 11 - Lovely Ebony Brown",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season+3/The+Boondocks+-+S03E11+-+Lovely+Ebony+Brown.ia.mp4"
        },
        {
          title: "Episode 12 - Mr. Medicinal",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season+3/The+Boondocks+(4K)+S3+E12+-+Mr.+Medicinal.ia.mp4"
        },
        {
          title: "Episode 13 - The Fried Chicken Flu",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season+3/The+Boondocks+(4K)+S3+E13+-+The+Fried+Chicken+Flu.ia.mp4"
        },
        {
          title: "Episode 14 - The Color Ruckus",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season+3/The+Boondocks+-+S03E14+-+The+Color+Ruckus.ia.mp4"
        },
        {
          title: "Episode 15 - 	It's Goin' Down",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season+3/The+Boondocks+-+S03E15+-+It's+Goin+Down.ia.mp4"
        },
      ],
    },
    {
      season: 4,
      episodes: [
        {
          title: "Episode 1 - Pretty Boy Flizzy",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season+4/The+Boondocks+-+S04E01+-+Pretty+Boy+Flizzy.ia.mp4",
        },
        {
          title: "Episode 2 - Good Times",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season+4/The+Boondocks+-+S04E02+-+Good+Times.ia.mp4"
        },
        {
          title: "Episode 3 - Breaking Granddad",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season+4/The+Boondocks+-+S04E03+-+Breaking+Granddad.ia.mp4"
        },
        {
          title: "Episode 4 - Early Bird Special",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season+4/The+Boondocks+-+S04E04+-+Early+Bird+Special.ia.mp4"
        },
        {
          title: "Episode 5 - Freedom Ride or Die",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season+4/The+Boondocks+-+S04E05+-+Freedom+Ride+or+Die.ia.mp4"
        },
        {
          title: "Episode 6 - Granddad Dates a Kardashian",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season+4/The+Boondocks+-+S04E06+-+Granddad+Dates+a+Kardashian.ia.mp4"
        },
        {
          title: "Episode 7 - Freedomland",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season+4/The+Boondocks+-+S04E07+-+Freedomland.ia.mp4"
        },
        {
          title: "Episode 8 - I Dream of Siri",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season+4/The+Boondocks+-+S04E08+-+I+Dream+of+Siri.ia.mp4"
        },
        {
          title: "Episode 9 - Stinkmeaner: Begun the Clone War Has",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season+4/The+Boondocks+-+S04E09+-+Stinkmeaner+Begun+the+Clone+War+Has.ia.mp4"
        },
        {
          title: "Episode 10 - The New Black",
          src: "https://monkeybookshows.s3.us-east-2.amazonaws.com/The+Boondocks/Season+4/The+Boondocks+-+S04E10+-+The+New+Black.ia.mp4"
        },
      ],
    },
  ],
};

export const BoondocksShow: React.FC = () => {
  const [seasonIndex, setSeasonIndex] = useState(0);
  const [episodeIndex, setEpisodeIndex] = useState(0);

  const currentSeason = Boondocks.seasons[seasonIndex];
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
          {Boondocks.seasons.map((s, i) => (
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