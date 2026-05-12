import Board from "../components/Board";
import GameStatus from "../components/GameStatus";
import RestartButton from "../components/RestartButton";

import useMultiplayerLogic from "../hooks/useMultiplayerLogic";

const Multiplayer = () => {

  const {
    board,
    isXTurn,
    winner,
    isDraw,
    player,
    handleClick,
    restartGame,
  } = useMultiplayerLogic();

  return (

    <div
      className="
        min-h-screen
        bg-gray-900
        flex
        flex-col
        justify-center
        items-center
        px-4
      "
    >

      {/* Title */}
      <h1
        className="
          text-white
          text-4xl
          sm:text-5xl
          font-bold
          mb-6
          text-center
        "
      >
        Multiplayer
      </h1>



      {/* Player */}
      <h2
        className="
          text-white
          text-lg
          sm:text-xl
          mb-4
        "
      >
        You are: {player}
      </h2>



      {/* Game Status */}
      <GameStatus
        winner={winner}
        isDraw={isDraw}
        isXTurn={isXTurn}
      />



      {/* Board */}
      <Board
        board={board}
        handleClick={handleClick}
      />



      {/* Restart */}
      <RestartButton
        restartGame={restartGame}
      />

    </div>

  );
};

export default Multiplayer;