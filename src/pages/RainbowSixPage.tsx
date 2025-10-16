import { RainbowSix } from "../components/RainbowSix";

export const RainbowSixPage = () => {
  return (
    <div className="pt-1">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent leading-tight pb-1"> 
        🔫 Rainbow Six
      </h2>
      <RainbowSix />
    </div>
  );
};