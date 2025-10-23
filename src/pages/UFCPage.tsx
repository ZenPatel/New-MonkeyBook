import { UFC } from "../components/UFC";

export const UFCPage = () => {
  return (
    <div className="pt-1">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent leading-tight pb-1"> 
        🥊 UFC
      </h2>
      <UFC />
    </div>
  );
};