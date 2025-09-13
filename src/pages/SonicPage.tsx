import Sonic from "../components/Sonic";

export const SonicPage = () => {
  return (
    <div className="pt-1">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent leading-tight pb-1"> 
        🦔 Sonic
      </h2>
      <Sonic />
    </div>
  );
};
