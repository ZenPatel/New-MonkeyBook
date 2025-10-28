import { PokemonPlatinum } from "../components/PokemonPlatinum";

export const PokemonPlatinumPage = () => {
  return (
    <div className="pt-1">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-gray-400 bg-clip-text text-transparent leading-tight pb-1"> 
        ◓ Pokemon Platinum
      </h2>
      <PokemonPlatinum />
    </div>
  );
}