const Snake = ({ body, cellSize }) => {
  return (
    <>
      {body.map((segment, index) => (
        <div
          key={index}
          className={`snake-segment ${index === 0 ? 'snake-head' : ''}`}
          style={{
            position: 'absolute',
            left: segment.x * cellSize,
            top: segment.y * cellSize,
            width: cellSize,
            height: cellSize,
          }}
        />
      ))}
    </>
  );
};

export default Snake;