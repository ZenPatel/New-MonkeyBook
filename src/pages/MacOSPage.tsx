import { MacOS } from "../components/MacOS";

export const MacOSPage = () => {
  return (
    <div className="pt-1">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-300 to-pink-700 bg-clip-text text-transparent leading-tight pb-1"> 
        MacOS
      </h2>
      <p className="text-sm text-gray-500 italic text-center">Disclaimer: the MacOS implementation is minimal</p>
      <MacOS />
    </div>
  );
};