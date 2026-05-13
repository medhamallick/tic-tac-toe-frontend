import Board from "../components/Board";
import GameStatus from "../components/GameStatus";
import RestartButton from "../components/RestartButton";

import useSinglePlayerLogic from "../hooks/useSinglePlayerLogic";

const SinglePlayer = () => {

  const {
    board,
    isXTurn,
    winner,
    isDraw,
    handleClick,
    restartGame,
  } = useSinglePlayerLogic();

  return (

    <div
      className="min-h-screen bg-gray-900 flex flex-col justify-center items-center px-4"
    >

      <h1 className=" text-white text-4xl sm:text-5xl font-bold mb-6">
        Computer
      </h1>

      <GameStatus
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

export default SinglePlayer;