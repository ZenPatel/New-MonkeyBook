import React, { useState, useEffect, useCallback } from 'react';

const GRID_SIZE = 20;
const CANVAS_SIZE = 400;

interface Position {
  x: number;
  y: number;
}

interface GameState {
  snake: Position[];
  food: Position;
  direction: Position;
  gameOver: boolean;
  score: number;
  isPlaying: boolean;
}

const initialGameState: GameState = {
  snake: [{ x: 10, y: 10 }],
  food: { x: 15, y: 15 },
  direction: { x: 0, y: 0 },
  gameOver: false,
  score: 0,
  isPlaying: false
};

const SnakeGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const generateFood = useCallback((snake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)),
        y: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE))
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    const newFood = generateFood([{ x: 10, y: 10 }]);
    setGameState({
      snake: [{ x: 10, y: 10 }],
      food: newFood,
      direction: { x: 0, y: 0 },
      gameOver: false,
      score: 0,
      isPlaying: false
    });
  }, [generateFood]);

  const startGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPlaying: true }));
  }, []);

  const moveSnake = useCallback(() => {
    setGameState(prevState => {
      if (!prevState.isPlaying || prevState.gameOver || (prevState.direction.x === 0 && prevState.direction.y === 0)) {
        return prevState;
      }

      const newSnake = [...prevState.snake];
      const head = { 
        x: newSnake[0].x + prevState.direction.x, 
        y: newSnake[0].y + prevState.direction.y 
      };

      // Check wall collision
      if (head.x < 0 || head.x >= CANVAS_SIZE / GRID_SIZE || 
          head.y < 0 || head.y >= CANVAS_SIZE / GRID_SIZE) {
        return { ...prevState, gameOver: true, isPlaying: false };
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        return { ...prevState, gameOver: true, isPlaying: false };
      }

      newSnake.unshift(head);

      // Check food collision
      let newFood = prevState.food;
      let newScore = prevState.score;
      
      if (head.x === prevState.food.x && head.y === prevState.food.y) {
        newScore += 10;
        newFood = generateFood(newSnake);
      } else {
        newSnake.pop();
      }

      return {
        ...prevState,
        snake: newSnake,
        food: newFood,
        score: newScore
      };
    });
  }, [generateFood]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!gameState.isPlaying) return;

    const { direction } = gameState;
    
    switch (event.key) {
      case 'w': 
      case 'W':
        if (direction.y === 0) {
          setGameState(prev => ({ ...prev, direction: { x: 0, y: -1 } }));
        }
        break;
      case 's': 
      case 'S':
        if (direction.y === 0) {
          setGameState(prev => ({ ...prev, direction: { x: 0, y: 1 } }));
        }
        break;
      case 'a': 
      case 'A':
        if (direction.x === 0) {
          setGameState(prev => ({ ...prev, direction: { x: -1, y: 0 } }));
        }
        break;
      case 'd': 
      case 'D':
        if (direction.x === 0) {
          setGameState(prev => ({ ...prev, direction: { x: 1, y: 0 } }));
        }
        break;
}

  }, [gameState.isPlaying, gameState.direction]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 150);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const renderGame = () => {
    const cells = [];
    
    for (let y = 0; y < CANVAS_SIZE / GRID_SIZE; y++) {
      for (let x = 0; x < CANVAS_SIZE / GRID_SIZE; x++) {
        let cellType = '';
        
        if (gameState.snake.some(segment => segment.x === x && segment.y === y)) {
          cellType = gameState.snake[0].x === x && gameState.snake[0].y === y ? 'head' : 'body';
        } else if (gameState.food.x === x && gameState.food.y === y) {
          cellType = 'food';
        }
        
        cells.push(
          <div
            key={`${x}-${y}`}
            className={`w-5 h-5 flex items-center justify-center ${
              cellType === 'head' 
                ? 'bg-green-400' 
                : cellType === 'body' 
                ? 'bg-green-600' 
                : 'bg-gray-800'
            }`}
          >
           {cellType === 'food' ? (
            <span className="text-lg">🍎</span>
           ) : null}
          </div>
        );
      }
    }
    
    return cells;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
          🐍 Snake Game
        </h1>
        <div className="text-2xl mb-4">
          Score: <span className="text-yellow-300 font-bold">{gameState.score}</span>
        </div>
      </div>

      <div 
        className="grid grid-cols-20 gap-0 mb-8"
        style={{ 
          gridTemplateColumns: `repeat(${CANVAS_SIZE / GRID_SIZE}, minmax(0, 1fr))`,
          width: `${CANVAS_SIZE}px`,
          height: `${CANVAS_SIZE}px`
        }}
      >
        {renderGame()}
      </div>

      <div className="text-center space-y-4">
        {!gameState.isPlaying && !gameState.gameOver && (
          <div>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-green-600 text-white hover:text-black rounded-lg font-bold text-lg transition-colors"
            >
              Start Game
            </button>
            <p className="mt-4 text-gray-400">Use WASD to control the snake</p>
          </div>
        )}
        
        {gameState.gameOver && (
          <div>
            <div className="text-2xl text-red-400 font-bold mb-4">Game Over!</div>
            <div className="text-lg mb-4">Final Score: {gameState.score}</div>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-blue-600 text-white hover:text-black rounded-lg font-bold text-lg transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
        
        {gameState.isPlaying && (
          <div className="text-gray-400">
            <p>🎮 Use WASD to move</p>
            <p>🍎 Eat the red food to grow</p>
            <p>⚠️ Don't hit the walls or yourself!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SnakeGame;