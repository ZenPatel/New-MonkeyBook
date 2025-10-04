import { Link } from "react-router";

interface Show {
  id: string;
  posterUrl: string;
  title: string;
}

const shows: Show[] = [
  {
    id: "aminecraftmovie",
    posterUrl:
      "https://monkeybookshows.s3.us-east-2.amazonaws.com/Posters/A+Minecraft+Movie+Poster.jpg",
    title: "A Minecraft Movie"
  },
  {
    id: "berserk",
    posterUrl:
      "https://monkeybookshows.s3.us-east-2.amazonaws.com/Posters/Berserk+Cover.jpg",
    title: "Berserk 1997"
  },
  {
    id: "borat",
    posterUrl:
      "https://i.ebayimg.com/images/g/FGUAAOSwNPti~flg/s-l1600.webp",
    title: "Borat",
  },
  {
    id: "borat2",
    posterUrl:
      "https://monkeybookshows.s3.us-east-2.amazonaws.com/Posters/borat2cover.webp",
    title: "Borat 2"
  },
  {
    id: "f1",
    posterUrl:
      "https://monkeybookshows.s3.us-east-2.amazonaws.com/Posters/f1+poster.jpg",
    title: "F1: The Movie"
  },
  {
    id: "fnafmovie",
    posterUrl:
      "https://monkeybookshows.s3.us-east-2.amazonaws.com/Posters/Fnaf_Movie_Poster.webp",
    title: "FNAF Movie"
  },
  {
    id: "friday",
    posterUrl:
      "https://monkeybookshows.s3.us-east-2.amazonaws.com/Posters/Friday+Cover.jpg",
    title: "Friday"
  },
  {
    id: "fridayafternext",
    posterUrl:
      "https://monkeybookshows.s3.us-east-2.amazonaws.com/Posters/Friday+After+Next+Cover.jpg",
    title: "Friday After Next"
  },
  {
    id: "fullmetaljacket",
    posterUrl:
      "https://monkeybookshows.s3.us-east-2.amazonaws.com/Posters/Full+Metal+Jacket+Poster.jpg",
    title: "Full Metal Jacket"
  },
  {
    id: "hnichampionroad",
    posterUrl:
      "https://monkeybookshows.s3.us-east-2.amazonaws.com/Posters/championroadposter.jpg",
    title: "Hajime No Ippo: Champion Road",
  },
  {
    id: "hnikimuravsmashiba",
    posterUrl:
      "https://monkeybookshows.s3.us-east-2.amazonaws.com/Posters/kimuravsmashibaposter.jpg",
    title: "Hajime No Ippo: Kimura vs Mashiba",
  },
  {
    id: "nextfriday",
    posterUrl:
      "https://monkeybookshows.s3.us-east-2.amazonaws.com/Posters/Next+Friday+Cover.jpg",
    title: "Next Friday"
  }
];

export const ShowsList = () => {
  return (
    <div className="max-w-8xl mx-auto px-4 py-8">
      <div className="flex flex-wrap justify-center gap-6">
        {shows.map((show) => (
          <Link
            key={show.id}
            to={`/shows/${show.id}`}
            className="group block w-40"
          >
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg">
              <img
                src={show.posterUrl}
                alt={show.title}
                className="w-full h-full object-cover transform transition duration-300 group-hover:scale-105 group-hover:brightness-75"
              />
            </div>
            <p className="mt-2 text-sm font-medium text-gray-300 group-hover:text-white transition-colors text-center truncate">
              {show.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};