import PokemonMDED from "../components/PokemonMDED";

export const PokemonMDEDPage = () => {
  return (
    <div className="pt-1">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent leading-tight pb-1"> 
        ◓ Pokemon MDED
      </h2>
      <PokemonMDED />
    </div>
  );
}