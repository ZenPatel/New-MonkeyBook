import { Superhot } from "../components/Superhot";

export const SuperhotPage = () => {
  return (
    <div className="pt-1">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent leading-tight pb-1"> 
        🔫 Superhot
      </h2>
      <p className="text-sm text-gray-500 italic text-center">
        Disclaimer: this is just an implementation of the game made in Unity WebGL
      </p>
      <Superhot />
    </div>
  );
};