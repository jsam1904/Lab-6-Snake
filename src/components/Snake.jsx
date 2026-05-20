const CORNER_R = 7;

// Compute per-corner border-radius so adjacent segments connect flush
// and only exposed corners (tail end, head front, turn outers) are rounded.
const getRadius = (seg, index, body) => {
  const prev = index > 0 ? body[index - 1] : null;
  const next = body[index + 1] ?? null;

  const hasLeft   = (prev && prev.x < seg.x) || (next && next.x < seg.x);
  const hasRight  = (prev && prev.x > seg.x) || (next && next.x > seg.x);
  const hasTop    = (prev && prev.y < seg.y) || (next && next.y < seg.y);
  const hasBottom = (prev && prev.y > seg.y) || (next && next.y > seg.y);

  const tl = (!hasTop    && !hasLeft)  ? CORNER_R : 0;
  const tr = (!hasTop    && !hasRight) ? CORNER_R : 0;
  const br = (!hasBottom && !hasRight) ? CORNER_R : 0;
  const bl = (!hasBottom && !hasLeft)  ? CORNER_R : 0;

  return `${tl}px ${tr}px ${br}px ${bl}px`;
};

const Snake = ({ body, cellSize, direction }) => {
  const len = body.length;

  // Use body positions when possible; fall back to direction prop for 1-segment snake
  const dir = len >= 2
    ? { x: body[0].x - body[1].x, y: body[0].y - body[1].y }
    : (direction ?? { x: 1, y: 0 });

  const eyeSize   = Math.max(3, Math.round(cellSize * 0.22));
  const eyeMargin = Math.max(2, Math.round(cellSize * 0.17));

  const eyeStyles = (() => {
    const b = { width: eyeSize, height: eyeSize };
    if (dir.x ===  1) return [{ ...b, top: eyeMargin,    right: eyeMargin  }, { ...b, bottom: eyeMargin, right: eyeMargin  }];
    if (dir.x === -1) return [{ ...b, top: eyeMargin,    left: eyeMargin   }, { ...b, bottom: eyeMargin, left: eyeMargin   }];
    if (dir.y === -1) return [{ ...b, top: eyeMargin,    left: eyeMargin   }, { ...b, top: eyeMargin,    right: eyeMargin  }];
    return                   [{ ...b, bottom: eyeMargin, left: eyeMargin   }, { ...b, bottom: eyeMargin, right: eyeMargin  }];
  })();

  return (
    <>
      {body.map((segment, index) => {
        const isHead = index === 0;
        const brightness = isHead ? 1 : 1 - (index / len) * 0.55;

        return (
          <div
            key={index}
            className={`snake-segment${isHead ? ' snake-head' : ''}`}
            style={{
              position: 'absolute',
              left: segment.x * cellSize,
              top: segment.y * cellSize,
              width: cellSize,
              height: cellSize,
              borderRadius: getRadius(segment, index, body),
              filter: isHead ? undefined : `brightness(${brightness.toFixed(2)})`,
            }}
          >
            {isHead && eyeStyles.map((s, i) => (
              <div key={i} className="snake-eye" style={s} />
            ))}
          </div>
        );
      })}
    </>
  );
};

export default Snake;
