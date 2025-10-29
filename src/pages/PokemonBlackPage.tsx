import { PokemonBlack } from "../components/PokemonBlack";

export const PokemonBlackPage = () => {
  return (
    <div className="pt-1">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center bg-gradient-to-r from-Black-999 to-gray-300 bg-clip-text text-transparent leading-tight pb-1"> 
        ◓ Pokemon Black
      </h2>
      <PokemonBlack />
    </div>
  );
}