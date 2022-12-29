import { useState } from 'react';
import Board from './components/board';
import Arrows from './components/arrows';
import PopUp from './components/pop-up';
import Menu from './components/menu';

const App = () => {
  // warning on page exit/reload
  window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    return (event.returnValue = 'Are you sure you want to close?');
  });

  // values of the pop up at the bottom of the screen
  const [popUp, setPopUp] = useState({
    color: '',
    message: '',
  });

  const [board, setBoard] = useState([]); // game board

  // render board
  for (let i = 0; i < 225; i++) {
    if (board.length < 225) {
      setBoard((board) => [...board, '']);
    }
  }

  const [history, setHistory] = useState([]); // list of all moves
  const [historyRendered, setHistoryRendered] = useState(false); // history is read from localStorage

  const [turn, setTurn] = useState('b'); // variable which player is allowed to move

  const [move, setMove] = useState(0); // current move number

  const [started, setStarted] = useState(false); // state to detect if the game was started
  const [won, setWon] = useState(false); // state to detect if one player has won the game

  const win = (winner) => {
    setWon(true);
    setPopUp({
      color: winner,
      message: `${winner.charAt(0).toUpperCase() + winner.slice(1)} wins!`,
    });
  };

  // detect win
  if (!won) {
    for (let i = 0; i < board.length; i++) {
      if (
        board[i] === 'b' &&
        board[i + 1] === 'b' &&
        board[i + 2] === 'b' &&
        board[i + 3] === 'b' &&
        board[i + 4] === 'b' &&
        i % 15 <= 10
      ) {
        win('black');
        break;
      } else if (
        board[i] === 'b' &&
        board[i + 15] === 'b' &&
        board[i + 30] === 'b' &&
        board[i + 45] === 'b' &&
        board[i + 60] === 'b'
      ) {
        win('black');
        break;
      } else if (
        board[i] === 'b' &&
        board[i + 16] === 'b' &&
        board[i + 32] === 'b' &&
        board[i + 48] === 'b' &&
        board[i + 64] === 'b' &&
        i % 15 <= 10
      ) {
        win('black');
        break;
      } else if (
        board[i] === 'b' &&
        board[i + 14] === 'b' &&
        board[i + 28] === 'b' &&
        board[i + 42] === 'b' &&
        board[i + 56] === 'b' &&
        i % 15 >= 4
      ) {
        win('black');
        break;
      }
      if (
        board[i] === 'w' &&
        board[i + 1] === 'w' &&
        board[i + 2] === 'w' &&
        board[i + 3] === 'w' &&
        board[i + 4] === 'w' &&
        i % 15 <= 10
      ) {
        win('white');
        break;
      } else if (
        board[i] === 'w' &&
        board[i + 15] === 'w' &&
        board[i + 30] === 'w' &&
        board[i + 45] === 'w' &&
        board[i + 60] === 'w'
      ) {
        win('white');
        break;
      } else if (
        board[i] === 'w' &&
        board[i + 16] === 'w' &&
        board[i + 32] === 'w' &&
        board[i + 48] === 'w' &&
        board[i + 64] === 'w' &&
        i % 15 <= 10
      ) {
        win('white');
        break;
      } else if (
        board[i] === 'w' &&
        board[i + 14] === 'w' &&
        board[i + 28] === 'w' &&
        board[i + 42] === 'w' &&
        board[i + 56] === 'w' &&
        i % 15 >= 4
      ) {
        win('white');
        break;
      }
    }
  }

  // load progress from localStorage
  if (localStorage.getItem('history') && !historyRendered) {
    setHistory(JSON.parse(localStorage.getItem('history')));
    setHistoryRendered(true);

    // set board and turn
    setBoard(
      JSON.parse(localStorage.getItem('history'))[
        JSON.parse(localStorage.getItem('history')).length - 1
      ].board
    );
    setTurn(
      JSON.parse(localStorage.getItem('history'))[
        JSON.parse(localStorage.getItem('history')).length - 1
      ].turn
    );

    // set move number
    setMove(JSON.parse(localStorage.getItem('history')).length);
  }

  // function when a move is made
  const placeStone = (setIndex) => {
    if (!won) {
      // place stone
      setBoard(board.map((intersection, index) => (index === setIndex ? turn : intersection)));

      // swap turn
      if (turn === 'b') {
        setTurn('w');
      } else {
        setTurn('b');
      }

      setMove(move + 1); // increase move number

      // set history
      setHistory((history) => [
        ...history,
        {
          board: board.map((intersection, index) => (index === setIndex ? turn : intersection)),
          turn: turn === 'b' ? 'w' : 'b',
        },
      ]);
    }
  };

  // function to go to the first move
  const first = () => {
    setBoard([]);
    setMove(0);
    setTurn('b');
  };

  // function to show previous position
  const previous = () => {
    if (move > 1) {
      setBoard(history[move - 2].board);
      setMove(move - 1);

      // swap turn
      if (turn === 'b') {
        setTurn('w');
      } else {
        setTurn('b');
      }
    } else if (move === 1) {
      first();
    }
  };

  // function to undo the last move
  const undo = () => {
    if (!won) {
      if (history.length > 0) {
        // remove stone
        if (history.length === 1) {
          setBoard([]);
          setHistory([]);
          setMove(0);
        } else {
          setBoard(history[history.length - 2].board);

          // remove last move from history
          history.splice(-1);
        }

        // swap turn
        if (turn === 'b') {
          setTurn('w');
        } else {
          setTurn('b');
        }

        // reduce move count
        setMove(move - 1);
      }
    }
  };

  // function to show previous position
  const next = () => {
    if (move < history.length - 1) {
      setBoard(history[move].board);
      setMove(move + 1);

      // swap turn
      if (turn === 'b') {
        setTurn('w');
      } else {
        setTurn('b');
      }
    } else if (move === history.length - 1) {
      last();
    }
  };

  // function to go to the last move
  const last = () => {
    setBoard(history[history.length - 1].board);
    setMove(history.length);
    setTurn(history[history.length - 1].turn);
  };

  // save progress to local storage
  const save = () => {
    if (history.length > 0) {
      localStorage.setItem('history', JSON.stringify(history));
    } else {
      localStorage.removeItem('history');
    }

    // visual feedback
    setPopUp({
      color: 'green',
      message: "Your progress was saved to your browser's local storage.",
    });
  };

  // state changes when the menu is opened
  const openMenu = () => {
    setStarted(false);
    setPopUp({
      color: '',
      message: '',
    });
  };

  // continue saved game
  const resume = () => {
    if (history.length > 0 || localStorage.getItem('history')) {
      setHistoryRendered(false);
      setStarted(true);
    }
  };

  // reset game
  const startNewGame = () => {
    setBoard([]);
    setHistory([]);
    setMove(0);
    setTurn('b');
    setPopUp({
      color: '',
      message: '',
    });
    setStarted(true);
    setWon(false);
  };

  return (
    <main>
      {started ? (
        <>
          <Board
            board={board}
            turn={turn}
            move={move}
            lastMove={history.length}
            won={won}
            onPlaceStone={(index) => placeStone(index)}
          />
          <Arrows
            move={move}
            lastMove={history.length}
            won={won}
            onMenu={() => openMenu()}
            onFirst={() => first()}
            onPrevious={() => previous()}
            onUndo={() => undo()}
            onNext={() => next()}
            onLast={() => last()}
            onSave={() => save()}
          />
          <PopUp
            color={popUp.color}
            message={popUp.message}
            onClose={() => setPopUp({ color: '', message: '' })}
          />
        </>
      ) : (
        <Menu history={history} onResume={() => resume()} onNewGame={() => startNewGame()} />
      )}
    </main>
  );
};
export default App;
