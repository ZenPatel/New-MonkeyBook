import Sonic3 from "../components/Sonic3";

export const Sonic3Page = () => {
  return (
    <div className="pt-1">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent leading-tight pb-1"> 
        🦔 Sonic 3
      </h2>
      <Sonic3 />
    </div>
  );
};