import menu from '../assets/menu.png';

const Menu = ({ history, onResume, onNewGame }) => {
  return (
    <section>
      <img className='board' src={menu} alt='' draggable='false' />
      <div className='menu-buttons'>
        <button
          className='menu-button'
          onClick={() => onResume()}
          style={
            history.length === 0 && !localStorage.getItem('history')
              ? { cursor: 'default', color: '#aaaaaa80' }
              : {}
          }
        >
          Resume
        </button>
        <button className='menu-button' onClick={() => onNewGame()}>
          New Game
        </button>
      </div>
    </section>
  );
};
export default Menu;
