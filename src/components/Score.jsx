const Score = ({ score, level, bestScore }) => {
  return (
    <div className="score-panel">
      <div className="score-card">
        <div className="score-label">Puntos</div>
        <div className="score-value">{score}</div>
      </div>
      <div className="score-card">
        <div className="score-label">Récord</div>
        <div className="score-value best-value">{bestScore}</div>
      </div>
      <div className="score-card">
        <div className="score-label">Nivel</div>
        <div className="score-value level-value">{level}</div>
      </div>
    </div>
  );
};

export default Score;
