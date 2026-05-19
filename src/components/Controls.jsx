const Controls = ({ onDirection }) => {
  const handleBtn = (dir) => (e) => {
    e.preventDefault();
    onDirection(dir);
  };

  return (
    <div className="controls">
      <div className="controls-row">
        <button className="ctrl-btn" onPointerDown={handleBtn({ x: 0, y: -1 })}>▲</button>
      </div>
      <div className="controls-row">
        <button className="ctrl-btn" onPointerDown={handleBtn({ x: -1, y: 0 })}>◀</button>
        <button className="ctrl-btn" onPointerDown={handleBtn({ x: 0, y: 1 })}>▼</button>
        <button className="ctrl-btn" onPointerDown={handleBtn({ x: 1, y: 0 })}>▶</button>
      </div>
    </div>
  );
};

export default Controls;