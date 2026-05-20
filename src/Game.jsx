import { useState, useEffect, useRef } from 'react';
import Board from './components/Board';
import Score from './components/Score';
import StartScreen from './components/StartScreen';
import GameOver from './components/GameOver';
import Controls from './components/Controls';

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIR = { x: 1, y: 0 };
const BASE_SPEED = 200;
const BEST_KEY = 'snake_best_score';

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
  const [snake,      setSnake]      = useState(INITIAL_SNAKE);
  const [food,       setFood]       = useState(() => randomFood(INITIAL_SNAKE));
  const [score,      setScore]      = useState(0);
  const [level,      setLevel]      = useState(1);
  const [direction,  setDirection]  = useState(INITIAL_DIR);
  const [gameState,  setGameState]  = useState('start');
  const [bestScore,  setBestScore]  = useState(() => parseInt(localStorage.getItem(BEST_KEY) || '0', 10));
  const [isNewBest,  setIsNewBest]  = useState(false);

  const snakeRef      = useRef(INITIAL_SNAKE);
  const foodRef       = useRef(food);
  const scoreRef      = useRef(0);
  const dirRef        = useRef(INITIAL_DIR);
  const pendingDirRef = useRef(INITIAL_DIR);

  const endGame = () => {
    const final = scoreRef.current;
    const stored = parseInt(localStorage.getItem(BEST_KEY) || '0', 10);
    if (final > stored) {
      localStorage.setItem(BEST_KEY, String(final));
      setBestScore(final);
      setIsNewBest(true);
    } else {
      setIsNewBest(false);
    }
    setGameState('over');
  };

  const handleStart = () => {
    const initSnake = INITIAL_SNAKE;
    const initFood  = randomFood(initSnake);
    snakeRef.current      = initSnake;
    foodRef.current       = initFood;
    scoreRef.current      = 0;
    dirRef.current        = INITIAL_DIR;
    pendingDirRef.current = INITIAL_DIR;
    setSnake(initSnake);
    setFood(initFood);
    setScore(0);
    setLevel(1);
    setDirection(INITIAL_DIR);
    setIsNewBest(false);
    setGameState('playing');
  };

  const togglePause = () => {
    setGameState(s => s === 'playing' ? 'paused' : s === 'paused' ? 'playing' : s);
  };

  // Keyboard input
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
        setGameState(s => {
          if (s === 'playing') return 'paused';
          if (s === 'paused')  return 'playing';
          return s;
        });
        return;
      }
      const map = {
        ArrowUp:    { x: 0,  y: -1 },
        ArrowDown:  { x: 0,  y:  1 },
        ArrowLeft:  { x: -1, y:  0 },
        ArrowRight: { x:  1, y:  0 },
      };
      const d = map[e.key];
      if (!d) return;
      e.preventDefault();
      const cur = dirRef.current;
      if (d.x === -cur.x && d.y === -cur.y) return;
      pendingDirRef.current = d;
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Game loop — only recreates on gameState/level change.
  useEffect(() => {
    if (gameState !== 'playing') return;

    const speed = Math.max(80, BASE_SPEED - (level - 1) * 30);

    const id = setInterval(() => {
      const dir  = pendingDirRef.current;
      dirRef.current = dir;

      const prev = snakeRef.current;
      const head = { x: prev[0].x + dir.x, y: prev[0].y + dir.y };

      if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
        endGame();
        return;
      }
      if (prev.some(s => s.x === head.x && s.y === head.y)) {
        endGame();
        return;
      }

      const ate = head.x === foodRef.current.x && head.y === foodRef.current.y;

      let next;
      if (ate) {
        next = [head, ...prev];
        const newScore = scoreRef.current + 10;
        const newFood  = randomFood(next);
        scoreRef.current = newScore;
        foodRef.current  = newFood;
        setScore(newScore);
        setLevel(Math.floor(newScore / 50) + 1);
        setFood(newFood);
      } else {
        next = [head, ...prev.slice(0, -1)];
      }

      snakeRef.current = next;
      setSnake(next);
      setDirection(dir);
    }, speed);

    return () => clearInterval(id);
  }, [gameState, level]);

  const isActive = gameState === 'playing' || gameState === 'paused';

  return (
    <div className="game-wrapper">
      {gameState === 'start' && <StartScreen onStart={handleStart} bestScore={bestScore} />}
      {gameState === 'over'  && <GameOver score={score} bestScore={bestScore} isNewBest={isNewBest} onRestart={handleStart} />}
      {isActive && (
        <div className="game-container">
          <div className="board-area">
            <div className="board-wrapper">
              <button
                className={`pause-btn${gameState === 'paused' ? ' pause-btn--active' : ''}`}
                onPointerDown={(e) => { e.preventDefault(); togglePause(); }}
                aria-label={gameState === 'paused' ? 'Reanudar' : 'Pausar'}
              >
                {gameState === 'paused' ? '▶' : '⏸'}
              </button>
              <Board
                snake={snake}
                food={food}
                boardSize={BOARD_SIZE}
                direction={direction}
              />
              {gameState === 'paused' && (
                <div className="pause-overlay">
                  <p className="pause-title">PAUSA</p>
                  <button className="btn" onClick={togglePause}>Reanudar</button>
                </div>
              )}
            </div>
            <Controls onDirection={d => { pendingDirRef.current = d; }} />
          </div>
          <Score score={score} level={level} bestScore={bestScore} />
        </div>
      )}
    </div>
  );
};

export default Game;
