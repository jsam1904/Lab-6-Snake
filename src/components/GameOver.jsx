const GameOver = ({ score, onRestart }) => {
  return (
    <div className="overlay">
      <h2 className="gameover-title">GAME OVER</h2>
      <p className="final-score">Puntaje final: <strong>{score}</strong></p>
      <button className="btn" onClick={onRestart}>
        Jugar de nuevo
      </button>
    </div>
  );
};

export default GameOver;