import { BlueLockShow } from "../components/BlueLock";

export const BlueLockPage = () => {
  return (
    <div className="pt-1">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-300 to-pink-700 bg-clip-text text-transparent leading-tight pb-1"> 
        Blue Lock
      </h2>
      <h4 className="text-1xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-300 to-pink-700 bg-clip-text text-transparent leading-tight pb-1"> 
        Be patient, the rest of the episodes are coming soon
      </h4>
      <BlueLockShow />
    </div>
  );
};