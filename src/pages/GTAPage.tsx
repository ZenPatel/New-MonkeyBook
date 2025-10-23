import { GTA } from "../components/GTA";

export const GTAPage = () => {
  return (
    <div className="pt-1">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-300 to-red-500 bg-clip-text text-transparent leading-tight pb-1"> 
        🏎️ GTA
      </h2>
      <GTA />
    </div>
  );
};