import PokemonBlue from "../components/PokemonBlue";

export const PokemonBluePage = () => {
  return (
    <div className="pt-1">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent leading-tight pb-1"> 
        ◓ Pokemon Blue
      </h2>
      <PokemonBlue />
    </div>
  );
}