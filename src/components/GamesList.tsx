import { Link } from "react-router";

interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
}

const games: Game[] = [
  {
    id: 'snake',
    title: 'Snake',
    description: 'Classic snake game - eat food, grow longer, avoid walls and yourself!',
    icon: '🐍',
    difficulty: 'Easy',
    category: 'Arcade'
  },
  {
    id: 'tictactoe',
    title: 'TicTacToe',
    description: 'Get three Xs or Os in a row before the other player does!',
    icon: '#',
    difficulty: 'Easy',
    category: 'Board'
  },
  {
    id: 'pong',
    title: 'Pong',
    description: 'A clone of the classic Atari 1970s table tennis simulator.',
    icon: '🏓',
    difficulty: 'Easy',
    category: 'Arcade'
  }
  // Future games will be added here
];

export const GamesList = () => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex flex-wrap justify-center gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              className="relative group cursor-pointer w-80"
            >
              <div className="absolute -inset-1 rounded-[20px] bg-gradient-to-r from-yellow-300 to-pink-700 blur-sm opacity-0 group-hover:opacity-50 transition duration-300 pointer-events-none"></div>
            
              <Link to={`/games/${game.id}`} className="block relative z-10">
                <div className="bg-[rgb(24,27,32)] border border-[rgb(84,90,106)] rounded-xl p-6 h-full transition-all duration-300 group-hover:bg-gray-800 group-hover:scale-[1.02]">
                  {/* Game Icon */}
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-2">{game.icon}</div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-yellow-300 transition-colors">
                      {game.title}
                    </h3>
                  </div>
                
                  {/* Game Info */}
                  <div className="space-y-3">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {game.description}
                    </p>
                  
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-blue-400 bg-blue-900/30 px-2 py-1 rounded-full border border-blue-500/50">
                          {game.category}
                        </span>
                      </div>
                    
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        game.difficulty === 'Easy' 
                          ? 'text-green-400 bg-green-900/30 border border-green-500/50'
                          : game.difficulty === 'Medium'
                          ? 'text-yellow-400 bg-yellow-900/30 border border-yellow-500/50'
                          : 'text-red-400 bg-red-900/30 border border-red-500/50'
                      }`}>
                        {game.difficulty}
                      </div>
                    </div>
                  </div>
                
                  {/* Play Button */}
                  <div className="mt-6 text-center">
                    <div className="bg-yellow-300 text-black px-4 py-2 rounded cursor-pointer hover:text-white transition-colors">
                      Play Now
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
    </div>
  );
};