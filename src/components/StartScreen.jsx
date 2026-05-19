const StartScreen = ({ onStart }) => {
  return (
    <div className="overlay">
      <h1 className="title">🐍 SNAKE</h1>
      <p className="subtitle">Usa las flechas para moverte</p>
      <button className="btn" onClick={onStart}>
        Iniciar Juego
      </button>
    </div>
  );
};

export default StartScreen;