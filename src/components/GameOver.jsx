const GameOver = ({ score, bestScore, isNewBest, onRestart }) => {
  return (
    <div className="overlay">
      <h2 className="gameover-title">GAME OVER</h2>
      {isNewBest && <p className="new-best">¡Nuevo récord!</p>}
      <p className="final-score">Puntaje final: <strong>{score}</strong></p>
      <p className="final-score">Récord: <strong className="best-inline">{bestScore}</strong></p>
      <button className="btn" onClick={onRestart}>Jugar de nuevo</button>
    </div>
  );
};

export default GameOver;