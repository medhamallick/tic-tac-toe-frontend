const GameStatus = ({
  player,
  winner,
  isDraw,
  isXTurn,
}) => {

  return (

    <>
      <h2 className="text-white text-xl mb-4">
        You are: {player}
      </h2>

      <h1 className="text-white text-3xl font-bold mb-6">

        {winner
          ? `Winner: ${winner}`
          : isDraw
          ? "Match Draw"
          : `Turn: ${isXTurn ? "X" : "O"}`}

      </h1>
    </>

  );
};

export default GameStatus;