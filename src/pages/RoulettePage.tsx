import { Roulette } from "../components/Roulette";

export const RoulettePage = () => {
  return (
    <div className="pt-1">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center bg-gradient-to-r from-red-500 to-green-400 bg-clip-text text-transparent leading-tight pb-1"> 
        𖥕 Roulette
      </h2>
      <Roulette />
    </div>
  );
};