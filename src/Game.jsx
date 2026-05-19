import { useState, useEffect, useRef } from 'react';
import Board from './components/Board';
import Score from './components/Score';
import StartScreen from './components/StartScreen';
import GameOver from './components/GameOver';
import Controls from './components/Controls';

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const BASE_SPEED = 200;

const randomFood = (snake) => {
  let pos;
  do {
    pos = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  } while (snake.some(s => s.x === pos.x && s.y === pos.y));
  return pos;
};

const Game = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(() => randomFood(INITIAL_SNAKE));
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState('start');
  const directionRef = useRef(INITIAL_DIRECTION);
  const pendingDirRef = useRef(INITIAL_DIRECTION);

  const handleStart = () => {
    const initSnake = INITIAL_SNAKE;
    setSnake(initSnake);
    setFood(randomFood(initSnake));
    setScore(0);
    setLevel(1);
    directionRef.current = INITIAL_DIRECTION;
    pendingDirRef.current = INITIAL_DIRECTION;
    setGameState('playing');
  };

  // Teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      const keyMap = {
        ArrowUp:    { x: 0,  y: -1 },
        ArrowDown:  { x: 0,  y: 1  },
        ArrowLeft:  { x: -1, y: 0  },
        ArrowRight: { x: 1,  y: 0  },
      };
      const newDir = keyMap[e.key];
      if (!newDir) return;
      e.preventDefault();
      const cur = directionRef.current;
      if (newDir.x === -cur.x && newDir.y === -cur.y) return;
      pendingDirRef.current = newDir;
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const speed = Math.max(80, BASE_SPEED - (level - 1) * 30);

    const interval = setInterval(() => {
      const dir = pendingDirRef.current;
      directionRef.current = dir;

      setSnake(prev => {
        const head = { x: prev[0].x + dir.x, y: prev[0].y + dir.y };

        // Colisión con paredes
        if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
          setGameState('over');
          return prev;
        }
        // Colisión consigo mismo
        if (prev.some(seg => seg.x === head.x && seg.y === head.y)) {
          setGameState('over');
          return prev;
        }

        const ateFood = head.x === food.x && head.y === food.y;

        if (ateFood) {
          const newSnake = [head, ...prev];
          const newScore = score + 10;
          setScore(newScore);
          setLevel(Math.floor(newScore / 50) + 1);
          setFood(randomFood(newSnake));
          return newSnake;
        }

        return [head, ...prev.slice(0, -1)];
      });
    }, speed);

    return () => clearInterval(interval);
  }, [gameState, food, score, level]);

  return (
    <div className="game-wrapper">
      {gameState === 'start' && <StartScreen onStart={handleStart} />}
      {gameState === 'over' && <GameOver score={score} onRestart={handleStart} />}
      {gameState === 'playing' && (
        <div className="game-container">
          <Score score={score} level={level} />
          <Board snake={snake} food={food} boardSize={BOARD_SIZE} />
          <Controls onDirection={dir => pendingDirRef.current = dir} />
        </div>
      )}
    </div>
  );
};

export default Game;