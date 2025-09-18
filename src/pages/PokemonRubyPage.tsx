import PokemonRuby from "../components/PokemonRuby";

export const PokemonRubyPage = () => {
  return (
    <div className="pt-1">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent leading-tight pb-1"> 
        ◓ Pokemon Ruby
      </h2>
      <PokemonRuby />
    </div>
  );
}