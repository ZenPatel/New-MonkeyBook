import PokemonCrystal from "../components/PokemonCrystal";

export const PokemonCrystalPage = () => {
  return (
    <div className="pt-1">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center bg-gradient-to-r from-blue-300 to-blue-50 bg-clip-text text-transparent leading-tight pb-1"> 
        ◓ Pokemon Crystal
      </h2>
      <PokemonCrystal />
    </div>
  );
}