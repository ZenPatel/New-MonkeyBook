import { Link } from "react-router";

interface Show {
  id: string;
  posterUrl: string;
  title: string;
}

const shows: Show[] = [
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
  {
    id: "borat",
    posterUrl:
      "https://i.ebayimg.com/images/g/FGUAAOSwNPti~flg/s-l1600.webp",
    title: "Borat",
  },
];

export const ShowsList = () => {
  return (
    <div className="max-w-8xl mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {shows.map((show) => (
          <Link
            key={show.id}
            to={`/shows/${show.id}`}
            className="group block"
          >
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src={show.posterUrl}
                alt={show.title}
                className="w-full h-auto object-cover rounded-lg transform transition duration-300 group-hover:scale-105 group-hover:brightness-75"
              />
            </div>
            <p className="mt-2 text-sm font-medium text-gray-300 group-hover:text-white transition-colors truncate">
              {show.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};