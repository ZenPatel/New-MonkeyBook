import { PokemonSoulSilver } from "../components/PokemonSoulSilver";

export const PokemonSoulSilverPage = () => {
  return (
    <div className="pt-1">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center bg-gradient-to-r from-gray-500 to-blue-500 bg-clip-text text-transparent leading-tight pb-1"> 
        ◓ Pokemon SoulSilver
      </h2>
      <PokemonSoulSilver />
    </div>
  );
}