import Board from "./components/Board";
import GameStatus from "./components/GameStatus";
import RestartButton from "./components/RestartButton";

import useGameLogic from "./hooks/useGameLogic";

const App = () => {

  const {
    board,
    isXTurn,
    winner,
    isDraw,
    player,
    handleClick,
    restartGame,
  } = useGameLogic();

  return (

    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center">

      <h1 className="text-white text-4xl font-bold mb-7">
        Tic Tac Toe
      </h1>

      <GameStatus
        player={player}
        winner={winner}
        isDraw={isDraw}
        isXTurn={isXTurn}
      />

      <Board
        board={board}
        handleClick={handleClick}
      />

      <RestartButton
        restartGame={restartGame}
      />

    </div>

  );
};

export default App;