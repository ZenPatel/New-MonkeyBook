import React, { useState, useCallback } from 'react';

type Player = 'X' | 'O' | null;
type GameResult = Player | 'draw';

interface GameState {
  board: Player[];
  currentPlayer: Player;
  winner: Player;
  gameOver: boolean;
  isPlaying: boolean;
  isDraw: boolean;
  score: {
    X: number;
    O: number;
    draws: number;
  };
}

const initialGameState: GameState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  gameOver: false,
  isPlaying: false,
  isDraw: false,
  score: {
    X: 0,
    O: 0,
    draws: 0
  }
};

const TicTacToeGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const checkWinner = useCallback((board: Player[]): GameResult => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    // Check for draw
    if (board.every(cell => cell !== null)) {
      return 'draw';
    }

    return null;
  }, []);

  const startGame = useCallback(() => {
    setGameState(prev => ({ 
      ...prev, 
      isPlaying: true,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      gameOver: false,
      isDraw: false
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      gameOver: false,
      isPlaying: false,
      isDraw: false
    }));
  }, []);

  const resetScore = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      score: { X: 0, O: 0, draws: 0 }
    }));
  }, []);

  const makeMove = useCallback((index: number) => {
    setGameState(prevState => {
      if (!prevState.isPlaying || prevState.gameOver || prevState.board[index]) {
        return prevState;
      }

      const newBoard = [...prevState.board];
      newBoard[index] = prevState.currentPlayer;

      const result = checkWinner(newBoard);
      const isGameOver = result !== null;
      const isDraw = result === 'draw';
      const winner = isDraw ? null : result as Player;
      
      let newScore = { ...prevState.score };
      if (result === 'X') {
        newScore.X += 1;
      } else if (result === 'O') {
        newScore.O += 1;
      } else if (result === 'draw') {
        newScore.draws += 1;
      }

      return {
        ...prevState,
        board: newBoard,
        currentPlayer: prevState.currentPlayer === 'X' ? 'O' : 'X',
        winner,
        gameOver: isGameOver,
        isDraw,
        score: newScore
      };
    });
  }, [checkWinner]);

  const getWinningMessage = () => {
    if (gameState.winner) {
      return `🎉 Player ${gameState.winner} Wins!`;
    } else if (gameState.isDraw) {
      return "🤝 It's a Draw!";
    }
    return '';
  };

  const renderCell = (index: number) => {
    const value = gameState.board[index];
    return (
      <button
        key={index}
        onClick={() => makeMove(index)}
        disabled={!gameState.isPlaying || gameState.gameOver || value !== null}
        className={`
          w-24 h-24 border-2 border-gray-600 bg-gray-800 hover:bg-gray-700 
          text-4xl font-bold transition-all duration-200 transform hover:scale-105
          ${!gameState.isPlaying || gameState.gameOver || value ? 'cursor-not-allowed' : 'cursor-pointer'}
          ${value === 'X' ? 'text-blue-400' : value === 'O' ? 'text-red-400' : 'text-gray-400'}
        `}
      >
        {value === 'X' && '❌'}
        {value === 'O' && '⭕'}
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
          # TicTacToe
        </h1>
        
        {/* Score Board */}
        <div className="flex justify-center space-x-8 mb-4 text-lg">
          <div className="text-blue-400">
            <span className="text-white">Player X:</span> <span className="font-bold">{gameState.score.X}</span>
          </div>
          <div className="text-gray-400">
            <span className="text-white">Draws:</span> <span className="font-bold">{gameState.score.draws}</span>
          </div>
          <div className="text-red-400">
            <span className="text-white">Player O:</span> <span className="font-bold">{gameState.score.O}</span>
          </div>
        </div>

        {gameState.isPlaying && !gameState.gameOver && (
          <div className="text-xl mb-4">
            Current Player: <span className={`font-bold ${gameState.currentPlayer === 'X' ? 'text-blue-400' : 'text-red-400'}`}>
              {gameState.currentPlayer === 'X' ? '❌' : '⭕'} Player {gameState.currentPlayer}
            </span>
          </div>
        )}
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-2 mb-8 p-4 bg-gray-900 rounded-lg">
        {Array.from({ length: 9 }, (_, index) => renderCell(index))}
      </div>

      {/* Game Controls */}
      <div className="text-center space-y-4">
        {!gameState.isPlaying && !gameState.gameOver && (
          <div>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-blue-600 text-white hover:text-black text-white rounded-lg font-bold text-lg transition-colors mr-4"
            >
              Start Game
            </button>
            <button
              onClick={resetScore}
              className="px-6 py-3 bg-gray-600 text-white hover:text-black text-white rounded-lg font-bold text-lg transition-colors"
            >
              Reset Score
            </button>
            <p className="mt-4 text-gray-400">Click on any cell to make your move!</p>
          </div>
        )}
        
        {gameState.gameOver && (
          <div>
            <div className="text-2xl font-bold mb-4">
              {getWinningMessage()}
            </div>
            <div className="space-x-4">
              <button
                onClick={startGame}
                className="px-6 py-3 bg-green-600 text-white hover:text-black text-white rounded-lg font-bold text-lg transition-colors"
              >
                Play Again
              </button>
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-gray-600 text-white hover:text-black text-white rounded-lg font-bold text-lg transition-colors"
              >
                Back to Menu
              </button>
            </div>
          </div>
        )}
        
        {gameState.isPlaying && !gameState.gameOver && (
          <div className="text-gray-400">
            <p>🎮 Click on any empty cell to place your mark</p>
            <p>🎯 Get 3 in a row to win!</p>
            <p>⚡ First player to get 3 in a row (horizontal, vertical, or diagonal) wins!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicTacToeGame;