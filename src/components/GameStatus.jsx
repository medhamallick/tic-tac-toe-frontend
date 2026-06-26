const GameStatus = ({
  // player,
  winner,
  isDraw,
  isXTurn,
}) => {

  return (
      <h1 className="text-white text-3xl font-bold mb-6">
        {winner
          ? `Winner: ${winner}`
          : isDraw
          ? "Match Draw"
          : `Turn: ${isXTurn ? "X" : "O"}`}

      </h1>

  );
};

export default GameStatus;