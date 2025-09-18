import PokemonLeafGreen from "../components/PokemonLeafGreen";

export const PokemonLeafGreenPage = () => {
  return (
    <div className="pt-1">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center bg-gradient-to-r from-green-500 to-green-300 bg-clip-text text-transparent leading-tight pb-1"> 
        ◓ Pokemon LeafGreen
      </h2>
      <PokemonLeafGreen />
    </div>
  );
}