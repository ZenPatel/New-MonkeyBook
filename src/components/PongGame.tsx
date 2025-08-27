import React, { useState, useEffect, useCallback, useRef } from 'react';

const GAME_WIDTH = 600;
const GAME_HEIGHT = 400;
const PADDLE_HEIGHT = 80;
const PADDLE_WIDTH = 10;
const BALL_SIZE = 10;
const PADDLE_SPEED = 6;
const INITIAL_BALL_SPEED = 3;

interface Ball {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
}

interface GameState {
  leftPaddle: number;
  rightPaddle: number;
  ball: Ball;
  leftScore: number;
  rightScore: number;
  isPlaying: boolean;
  gameOver: boolean;
  winner: string;
}

const initialGameState: GameState = {
  leftPaddle: GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2,
  rightPaddle: GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2,
  ball: {
    x: GAME_WIDTH / 2 - BALL_SIZE / 2,
    y: GAME_HEIGHT / 2 - BALL_SIZE / 2,
    velocityX: INITIAL_BALL_SPEED,
    velocityY: INITIAL_BALL_SPEED
  },
  leftScore: 0,
  rightScore: 0,
  isPlaying: false,
  gameOver: false,
  winner: ''
};

const PongGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const keysPressed = useRef<Set<string>>(new Set());

  const resetBall = useCallback((direction: number = 1) => {
    return {
      x: GAME_WIDTH / 2 - BALL_SIZE / 2,
      y: GAME_HEIGHT / 2 - BALL_SIZE / 2,
      velocityX: INITIAL_BALL_SPEED * direction,
      velocityY: (Math.random() - 0.5) * INITIAL_BALL_SPEED
    };
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      leftPaddle: GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2,
      rightPaddle: GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2,
      ball: resetBall(),
      leftScore: 0,
      rightScore: 0,
      isPlaying: false,
      gameOver: false,
      winner: ''
    });
  }, [resetBall]);

  const startGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPlaying: true }));
  }, []);

  const updateGame = useCallback(() => {
    setGameState(prevState => {
      if (!prevState.isPlaying || prevState.gameOver) {
        return prevState;
      }

      let newState = { ...prevState };
      
      // Move paddles based on keys pressed
      if (keysPressed.current.has('w') && newState.leftPaddle > 0) {
        newState.leftPaddle = Math.max(0, newState.leftPaddle - PADDLE_SPEED);
      }
      if (keysPressed.current.has('s') && newState.leftPaddle < GAME_HEIGHT - PADDLE_HEIGHT) {
        newState.leftPaddle = Math.min(GAME_HEIGHT - PADDLE_HEIGHT, newState.leftPaddle + PADDLE_SPEED);
      }
      if (keysPressed.current.has('arrowup') && newState.rightPaddle > 0) {
        newState.rightPaddle = Math.max(0, newState.rightPaddle - PADDLE_SPEED);
      }
      if (keysPressed.current.has('arrowdown') && newState.rightPaddle < GAME_HEIGHT - PADDLE_HEIGHT) {
        newState.rightPaddle = Math.min(GAME_HEIGHT - PADDLE_HEIGHT, newState.rightPaddle + PADDLE_SPEED);
      }

      // Move ball
      let newBall = { ...newState.ball };
      newBall.x += newBall.velocityX;
      newBall.y += newBall.velocityY;

      // Ball collision with top and bottom walls
      if (newBall.y <= 0 || newBall.y >= GAME_HEIGHT - BALL_SIZE) {
        newBall.velocityY = -newBall.velocityY;
        newBall.y = Math.max(0, Math.min(GAME_HEIGHT - BALL_SIZE, newBall.y));
      }

      // Ball collision with left paddle
      if (
        newBall.x <= PADDLE_WIDTH &&
        newBall.y + BALL_SIZE >= newState.leftPaddle &&
        newBall.y <= newState.leftPaddle + PADDLE_HEIGHT &&
        newBall.velocityX < 0
      ) {
        newBall.velocityX = -newBall.velocityX * 1.05; // Slight speed increase
        const paddleCenter = newState.leftPaddle + PADDLE_HEIGHT / 2;
        const ballCenter = newBall.y + BALL_SIZE / 2;
        const hitPosition = (ballCenter - paddleCenter) / (PADDLE_HEIGHT / 2);
        newBall.velocityY = hitPosition * INITIAL_BALL_SPEED;
      }

      // Ball collision with right paddle
      if (
        newBall.x + BALL_SIZE >= GAME_WIDTH - PADDLE_WIDTH &&
        newBall.y + BALL_SIZE >= newState.rightPaddle &&
        newBall.y <= newState.rightPaddle + PADDLE_HEIGHT &&
        newBall.velocityX > 0
      ) {
        newBall.velocityX = -newBall.velocityX * 1.05; // Slight speed increase
        const paddleCenter = newState.rightPaddle + PADDLE_HEIGHT / 2;
        const ballCenter = newBall.y + BALL_SIZE / 2;
        const hitPosition = (ballCenter - paddleCenter) / (PADDLE_HEIGHT / 2);
        newBall.velocityY = hitPosition * INITIAL_BALL_SPEED;
      }

      // Ball goes off left side (right player scores)
      if (newBall.x < -BALL_SIZE) {
        newState.rightScore += 1;
        if (newState.rightScore >= 5) {
          newState.gameOver = true;
          newState.isPlaying = false;
          newState.winner = 'Player 2';
        } else {
          newBall = resetBall(1);
        }
      }

      // Ball goes off right side (left player scores)
      if (newBall.x > GAME_WIDTH) {
        newState.leftScore += 1;
        if (newState.leftScore >= 5) {
          newState.gameOver = true;
          newState.isPlaying = false;
          newState.winner = 'Player 1';
        } else {
          newBall = resetBall(-1);
        }
      }

      newState.ball = newBall;
      return newState;
    });
  }, [resetBall]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    keysPressed.current.add(key);
    event.preventDefault();
  }, []);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    keysPressed.current.delete(key);
    event.preventDefault();
  }, []);

  useEffect(() => {
    const gameInterval = setInterval(updateGame, 16); // ~60 FPS
    return () => clearInterval(gameInterval);
  }, [updateGame]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-yellow-400 bg-clip-text text-transparent">
          🏓 ATARI PONG
        </h1>
        <div className="text-2xl mb-4 flex items-center justify-center gap-8">
          <div>
            <span className="text-cyan-300">Player 1: </span>
            <span className="text-yellow-300 font-bold">{gameState.leftScore}</span>
          </div>
          <div className="text-gray-400">|</div>
          <div>
            <span className="text-cyan-300">Player 2: </span>
            <span className="text-yellow-300 font-bold">{gameState.rightScore}</span>
          </div>
        </div>
      </div>

      <div 
        className="relative bg-gray-900 border-2 border-cyan-400 mb-8"
        style={{ 
          width: `${GAME_WIDTH}px`,
          height: `${GAME_HEIGHT}px`
        }}
      >
        {/* Center line */}
        <div 
          className="absolute bg-cyan-400 opacity-30"
          style={{
            left: `${GAME_WIDTH / 2 - 1}px`,
            top: 0,
            width: '2px',
            height: '100%'
          }}
        />

        {/* Left paddle */}
        <div
          className="absolute bg-cyan-400"
          style={{
            left: '0px',
            top: `${gameState.leftPaddle}px`,
            width: `${PADDLE_WIDTH}px`,
            height: `${PADDLE_HEIGHT}px`
          }}
        />

        {/* Right paddle */}
        <div
          className="absolute bg-cyan-400"
          style={{
            right: '0px',
            top: `${gameState.rightPaddle}px`,
            width: `${PADDLE_WIDTH}px`,
            height: `${PADDLE_HEIGHT}px`
          }}
        />

        {/* Ball */}
        <div
          className="absolute bg-white rounded-full"
          style={{
            left: `${gameState.ball.x}px`,
            top: `${gameState.ball.y}px`,
            width: `${BALL_SIZE}px`,
            height: `${BALL_SIZE}px`
          }}
        />
      </div>

      <div className="text-center space-y-4">
        {!gameState.isPlaying && !gameState.gameOver && (
          <div>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-cyan-600 text-white hover:text-black rounded-lg font-bold text-lg transition-colors"
            >
              Start Game
            </button>
            <div className="mt-4 text-gray-400 space-y-2">
              <p><strong>Player 1 (Left):</strong> W/S keys</p>
              <p><strong>Player 2 (Right):</strong> ↑/↓ arrow keys</p>
              <p>First to 5 points wins!</p>
            </div>
          </div>
        )}
        
        {gameState.gameOver && (
          <div>
            <div className="text-3xl text-yellow-300 font-bold mb-4">
              🏆 {gameState.winner} Wins!
            </div>
            <div className="text-lg mb-4">
              Final Score: {gameState.leftScore} - {gameState.rightScore}
            </div>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-blue-600 text-white hover:text-black rounded-lg font-bold text-lg transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
        
        {gameState.isPlaying && (
          <div className="text-gray-400 text-sm">
            <p>🎮 Control your paddle to hit the ball</p>
            <p>⚡ Ball speeds up with each hit</p>
            <p>🏆 First to 5 points wins!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PongGame;