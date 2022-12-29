import stoneBlack from '../assets/stone-black.png';
import stoneWhite from '../assets/stone-white.png';

const Intersection = ({ state, index, turn, move, lastMove, won, onPlaceStone }) => {
  return (
    <>
      {state === 'b' ? (
        <img className='intersection' src={stoneBlack} alt='' draggable='false' />
      ) : state === 'w' ? (
        <img className='intersection' src={stoneWhite} alt='' draggable='false' />
      ) : (
        <img
          className={
            move === lastMove && !won
              ? 'intersection intersection-empty-hover'
              : 'intersection intersection-empty'
          }
          src={turn === 'b' ? stoneBlack : stoneWhite}
          alt=''
          draggable='false'
          onClick={() => {
            move === lastMove && onPlaceStone(index);
          }}
        />
      )}
    </>
  );
};
export default Intersection;
