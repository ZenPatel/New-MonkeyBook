import { Link } from "react-router";

interface Show {
  id: string;
  posterUrl: string;
  title: string;
}

const shows: Show[] = [
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
    id: "hnichampionroad",
    posterUrl:
      "https://monkeybookshows.s3.us-east-2.amazonaws.com/Posters/championroadposter.jpg",
    title: "Hajime No Ippo Champion Road",
  },
  {
    id: "kimuravsmashiba",
    posterUrl:
      "https://monkeybookshows.s3.us-east-2.amazonaws.com/Posters/kimuravsmashibaposter.jpg",
    title: "Kimura vs Mashiba",
  },
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