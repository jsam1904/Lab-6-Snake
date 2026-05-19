import Snake from './Snake';
import Food from './Food';

const CELL_SIZE = 20;

const Board = ({ snake, food, boardSize }) => {
  const boardStyle = {
    position: 'relative',
    width: boardSize * CELL_SIZE,
    height: boardSize * CELL_SIZE,
  };

  return (
    <div className="board" style={boardStyle}>
      <Snake body={snake} cellSize={CELL_SIZE} />
      <Food position={food} cellSize={CELL_SIZE} />
    </div>
  );
};

export default Board;