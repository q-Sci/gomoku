import menu from '../assets/menu.svg';
import first from '../assets/first.svg';
import previous from '../assets/previous.svg';
import undo from '../assets/undo.svg';
import next from '../assets/next.svg';
import last from '../assets/last.svg';
import save from '../assets/save.svg';

const Arrows = ({
  move,
  onMenu,
  lastMove,
  won,
  onFirst,
  onPrevious,
  onUndo,
  onNext,
  onLast,
  onSave,
}) => {
  return (
    <nav className='arrows'>
      <button className='arrow'>
        <img src={menu} alt='' title='Menu' draggable='false' onClick={() => onMenu()} />
      </button>
      <button className='arrow' style={move === 0 ? { cursor: 'default' } : {}}>
        <img
          src={first}
          alt=''
          title='First move'
          draggable='false'
          style={move === 0 ? { opacity: '0.5' } : {}}
          onClick={() => onFirst()}
        />
      </button>
      <button className='arrow' style={move === 0 ? { cursor: 'default' } : {}}>
        <img
          src={previous}
          alt=''
          title='Previous move'
          draggable='false'
          style={move === 0 ? { opacity: '0.5' } : {}}
          onClick={() => onPrevious()}
        />
      </button>
      <button className='arrow' style={lastMove === 0 || won ? { cursor: 'default' } : {}}>
        {won}
        <img
          src={undo}
          alt=''
          title='Undo'
          draggable='false'
          style={lastMove === 0 || won ? { opacity: '0.5' } : {}}
          onClick={() => onUndo()}
        />
      </button>
      <button className='arrow' style={move === lastMove ? { cursor: 'default' } : {}}>
        <img
          src={next}
          alt=''
          title='Next move'
          draggable='false'
          style={move === lastMove ? { opacity: '0.5' } : {}}
          onClick={() => onNext()}
        />
      </button>
      <button className='arrow' style={move === lastMove ? { cursor: 'default' } : {}}>
        <img
          src={last}
          alt=''
          title='Last move'
          draggable='false'
          style={move === lastMove ? { opacity: '0.5' } : {}}
          onClick={() => onLast()}
        />
      </button>
      <button className='arrow'>
        <img src={save} alt='' title='Save' draggable='false' onClick={() => onSave()} />
      </button>
    </nav>
  );
};
export default Arrows;
