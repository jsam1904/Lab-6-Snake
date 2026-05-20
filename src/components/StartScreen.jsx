const StartScreen = ({ onStart, bestScore }) => {
  return (
    <div className="overlay">
      <h1 className="title">Snake</h1>
      {bestScore > 0 && (
        <p className="subtitle">Récord: <strong className="best-inline">{bestScore}</strong></p>
      )}
      <p className="subtitle">Usa las flechas del teclado o los botones para moverte</p>
      <p className="subtitle">Pulsa <kbd>P</kbd> o <kbd>Esc</kbd> para pausar</p>
      <button className="btn" onClick={onStart}>Iniciar</button>
    </div>
  );
};

export default StartScreen;
