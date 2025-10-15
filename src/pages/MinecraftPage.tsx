import { Minecraft } from "../components/Minecraft";

export const MinecraftPage = () => {
  return (
    <div className="pt-1">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-orange-650 bg-clip-text text-transparent leading-tight pb-1"> 
        ⛏️ Minecraft
      </h2>
      <h4 className="text-1xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-orange-650 bg-clip-text text-transparent leading-tight pb-1"> 
        Powered by: Eaglercraft X
      </h4>
      <Minecraft />
    </div>
  );
};