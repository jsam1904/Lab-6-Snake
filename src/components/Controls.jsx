const Arrow = ({ d }) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d={d} fill="currentColor" />
  </svg>
);

const Controls = ({ onDirection }) => {
  const press = (dir) => (e) => {
    e.preventDefault();
    onDirection(dir);
  };

  return (
    <div className="controls">
      <button className="ctrl-btn ctrl-up"    onPointerDown={press({ x: 0, y: -1 })} aria-label="Arriba">
        <Arrow d="M12 5L20 17H4L12 5Z" />
      </button>
      <button className="ctrl-btn ctrl-left"  onPointerDown={press({ x: -1, y: 0 })} aria-label="Izquierda">
        <Arrow d="M5 12L17 4V20L5 12Z" />
      </button>
      <button className="ctrl-btn ctrl-down"  onPointerDown={press({ x: 0, y: 1  })} aria-label="Abajo">
        <Arrow d="M12 19L4 7H20L12 19Z" />
      </button>
      <button className="ctrl-btn ctrl-right" onPointerDown={press({ x: 1, y: 0  })} aria-label="Derecha">
        <Arrow d="M19 12L7 4V20L19 12Z" />
      </button>
    </div>
  );
};

export default Controls;
