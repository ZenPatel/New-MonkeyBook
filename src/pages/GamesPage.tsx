import { GamesList } from "../components/GamesList"

export const GamesPage = () => {
    return (
      <div className="pt-1">
        <h2 className="text-6xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-300 to-pink-700 bg-clip-text text-transparent leading-tight pb-1"> 
            MonkeyBook Games
        </h2> 
        <GamesList />
      </div>
    )
}