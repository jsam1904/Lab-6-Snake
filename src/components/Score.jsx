const Score = ({ score, level }) => {
  return (
    <div className="score-container">
      <span>Puntaje: <strong>{score}</strong></span>
      <span>Nivel: <strong>{level}</strong></span>
    </div>
  );
};

export default Score;