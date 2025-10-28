import { PokemonHeartGold } from "../components/PokemonHeartGold";

export const PokemonHeartGoldPage = () => {
  return (
    <div className="pt-1">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-400 to-orange-750 bg-clip-text text-transparent leading-tight pb-1"> 
        ◓ Pokemon HeartGold
      </h2>
      <PokemonHeartGold />
    </div>
  );
}