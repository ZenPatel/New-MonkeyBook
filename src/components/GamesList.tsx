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
    id: 'conker',
    title: 'Conkers Bad Fur Day',
    description: 'Play as a alcoholic squirrel in his journey to return home to his gf!',
    icon: '🐿️',
    difficulty: 'Medium',
    category: 'N64'
  },
  {
    id: 'dk1',
    title: 'Donkey Kong Country',
    description: 'This is Monkey Patel and Sabbombs favourite game for a reason!',
    icon: '🍌',
    difficulty: 'Medium',
    category: 'SNES'
  },
  {
    id: 'dk2',
    title: 'Donkey Kong Country 2',
    description: 'The adventure of Diddy to diddle and save DK!',
    icon: '🍌',
    difficulty: 'Medium',
    category: 'SNES'
  },
  {
    id: 'dk3',
    title: 'Donkey Kong Country 3',
    description: 'Play as disabled monkeys (girl and mentally challenged) in this monkey adventure!',
    icon: '🍌',
    difficulty: 'Medium',
    category: 'SNES'
  },
  {
    id: 'drmario',
    title: 'Dr Mario',
    description: 'A Mario spinoff game that is a falling block puzzle like tetris.',
    icon: '💊',
    difficulty: 'Medium',
    category: 'NES'
  },
  {
    id: 'fifa95',
    title: 'FIFA 95',
    description: 'The first game in the iconic FIFA series to feature both clubs and countries.',
    icon: '⚽',
    difficulty: 'Easy',
    category: 'Mega Drive'
  },
  {
    id: 'hnids',
    title: 'Hajime No Ippo DS',
    description: 'Play as and take on your favourite characters from Hajime No Ippo!',
    icon: '🥊',
    difficulty: 'Medium',
    category: 'DS'
  },
  {
    id: 'LoZ',
    title: 'LoZ',
    description: 'Released in 1986, this was the first game in the iconic Legend of Zelda Series.',
    icon: '🗡',
    difficulty: 'Hard',
    category: 'NES'
  },
  {
    id: 'majorasmask',
    title: 'LoZ Majoras Mask',
    description: 'Continue Links adventure in Termina as he tries to stop the moon from falling in 3 days!',
    icon: '👹',
    difficulty: 'Medium',
    category: 'N64'
  },
  {
    id: 'ocarina',
    title: 'LoZ Ocarina of Time',
    description: 'The first release in the 3D Legend of Zelda series.',
    icon: '🪈',
    difficulty: 'Medium',
    category: 'N64'
  },
  {
    id: 'mariokart64',
    title: 'Mario Kart 64',
    description: 'The second game in the Mario Kart series released for the N64 in 1996.',
    icon: '🏎️',
    difficulty: 'Medium',
    category: 'N64'
  },
  {
    id: 'mariokartds',
    title: 'Mario Kart DS',
    description: 'The hit mario racing game for the Nintendo DS from 2005.',
    icon: '🏎️',
    difficulty: 'Medium',
    category: 'DS'
  },
  {
    id: 'mktrilogy',
    title: 'Mortal Kombat Trilogy',
    description: 'An updated compilation of the first three games in the mortal kombat series.',
    icon: '🐉',
    difficulty: 'Hard',
    category: 'N64'
  },
  {
    id: 'narutonc1',
    title: 'Naruto Ninja Council',
    description: 'The first game in the Ninja Council series following the adventures of Naruto Uzumaki.',
    icon: '🍥',
    difficulty: 'Easy',
    category: 'GBA'
  },
  {
    id: 'narutonc2',
    title: 'Naruto Ninja Council 2',
    description: 'The second game in the Ninja Council series following the adventures of Naruto Uzumaki.',
    icon: '🍥',
    difficulty: 'Easy',
    category: 'GBA'
  },
  {
    id: 'pacman',
    title: 'Pac-Man',
    description: 'The classic maze game where you must eat all the dots while avoiding the ghosts!',
    icon: 'ᱝ',
    difficulty: 'Medium',
    category: 'NES'
  },
  {
    id: 'pvz',
    title: 'Plants vs Zombies',
    description: 'Use plants as your defense against zombies invading your home!',
    icon: '🧟',
    difficulty: 'Easy',
    category: 'DS'
  },
  {
    id: 'pong',
    title: 'Pong',
    description: 'A clone of the classic 1972 Atari table tennis simulator.',
    icon: '🏓',
    difficulty: 'Easy',
    category: 'JS'
  },
  {
    id: 'punchout',
    title: 'Punch Out',
    description: 'The original punch out game released in 1984 featuring Mike Tyson.',
    icon: '🥊',
    difficulty: 'Hard',
    category: 'NES'
  },
  {
    id: 'snake',
    title: 'Snake',
    description: 'Classic snake game - eat food, grow longer, avoid walls and yourself!',
    icon: '🐍',
    difficulty: 'Easy',
    category: 'JS'
  },
  {
    id: 'sonic',
    title: 'Sonic',
    description: 'Made in 1991 for the Sega Mega Drive and the first game in the iconic Sonic series.',
    icon: '🦔',
    difficulty: 'Medium',
    category: 'Mega Drive'
  },
  {
    id: 'mario',
    title: 'Super Mario Bros',
    description: 'The OG platformer made for the NES in 1985.',
    icon: '🍄',
    difficulty: 'Medium',
    category: 'NES'
  },
  {
    id: 'mario2ja',
    title: 'Super Mario Bros 2 JA',
    description: 'The Japanese version of Mario 2 which provides a challenging platform experience.',
    icon: '🍄',
    difficulty: 'Hard',
    category: 'NES'
  },
  {
    id: 'mario2usa',
    title: 'Super Mario Bros 2 USA',
    description: 'The American Mario 2 that provides a unique platform experience.',
    icon: '🍄',
    difficulty: 'Medium',
    category: 'NES'
  },
  {
    id: 'mario3',
    title: 'Super Mario Bros 3',
    description: 'The third release in the Mario series features several new mechanics and powerups.',
    icon: '🍄',
    difficulty: 'Medium',
    category: 'NES'
  },
  {
    id: 'mario64',
    title: 'Super Mario Bros 64',
    description: 'The first mario game to feature 3D gameplay and a open-world.',
    icon: '🍄',
    difficulty: 'Medium',
    category: 'N64'
  },
  {
    id: 'mariods',
    title: 'Super Mario Bros DS',
    description: 'Complete over 80 levels across 8 worlds to save Princess Peach!',
    icon: '🍄',
    difficulty: 'Medium',
    category: 'DS'
  },
  {
    id: 'supermariokart',
    title: 'Super Mario Kart',
    description: 'The first mario kart game and it has 4 cups and 20 tracks.',
    icon: '🏎️',
    difficulty: 'Medium',
    category: 'SNES'
  },
  {
    id: 'mariorpg',
    title: 'Super Mario RPG',
    description: 'Play as Mario and defeat the Smithy gang in the first Mario RPG game.',
    icon: '🍄',
    difficulty: 'Medium',
    category: 'SNES'
  },
  {
    id: 'marioworld',
    title: 'Super Mario World',
    description: 'Use Yoshi and numerous other new features to save Princess Peach again!',
    icon: '🍄',
    difficulty: 'Medium',
    category: 'SNES'
  },
  {
    id: 'tekkengba',
    title: 'Tekken Advance',
    description: 'GBA exclusive that follows the events of Tekken 3.',
    icon: '🥋',
    difficulty: 'Medium',
    category: 'GBA'
  },
  {
    id: 'tictactoe',
    title: 'TicTacToe',
    description: 'Get three Xs or Os in a row before the other player does!',
    icon: '#',
    difficulty: 'Easy',
    category: 'JS'
  },
  {
    id: 'warioland',
    title: 'Wario Land',
    description: 'Play as a Jew Mario on the critically acclaimed virtual boy!',
    icon: '💰',
    difficulty: 'Easy',
    category: 'Virtual Boy'
  }
];

export const GamesList = () => {
  return (
    <div className="max-w-8xl mx-auto px-4">
      <div className="flex flex-wrap gap-6 justify-center">
        {games.map((game) => (
          <div key={game.id} className="relative group w-80 cursor-pointer">
            <div className="absolute -inset-1 rounded-[20px] bg-gradient-to-r from-yellow-300 to-pink-700 blur-sm opacity-0 group-hover:opacity-50 transition duration-300 pointer-events-none"></div>
            
            <Link to={`/games/${game.id}`} className="block relative z-10">
              <div className="bg-[rgb(24,27,32)] border border-[rgb(84,90,106)] rounded-[20px] p-5 flex flex-col h-full transition-all duration-300 group-hover:bg-gray-800 group-hover:scale-[1.02]">
                
                {/* Game Icon & Title */}
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2">{game.icon}</div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-yellow-300 transition-colors">
                    {game.title}
                  </h3>
                </div>

                {/* Description & Info */}
                <div className="flex-1 space-y-3">
                  <p className="text-gray-300 text-sm leading-relaxed">{game.description}</p>
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
