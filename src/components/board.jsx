import Intersection from './intersection';

const Board = ({ board, turn, move, lastMove, won, onPlaceStone }) => {
  return (
    <section className='board'>
      <div className='board-inner'>
        {board.slice(0, 225).map((intersection, index) => (
          <Intersection
            key={index}
            state={intersection}
            index={index}
            turn={turn}
            move={move}
            lastMove={lastMove}
            won={won}
            onPlaceStone={(index) => onPlaceStone(index)}
          />
        ))}
      </div>
    </section>
  );
};
export default Board;
