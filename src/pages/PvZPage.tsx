import PvZ from "../components/PvZ";

export const PvZPage = () => {
  return (
    <div className="pt-1">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center bg-gradient-to-r from-green-300 to-purple-500 bg-clip-text text-transparent leading-tight pb-1"> 
        🧟 Plants vs Zombies
      </h2>
      <PvZ />
    </div>
  );
};