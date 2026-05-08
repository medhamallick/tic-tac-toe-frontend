import { useEffect, useState } from "react";
import { socket } from "../socket";
import { checkWinner } from "../utils/checkWinner";

const useGameLogic = () => {

  const [board, setBoard] = useState([
    "", "", "",
    "", "", "",
    "", "", "",
  ]);

  const [isXTurn, setIsXTurn] = useState(true);

  const [winner, setWinner] = useState(null);

  const [isDraw, setIsDraw] = useState(false);

  const [player, setPlayer] = useState("");

  const handleClick = (index) => {

    if (winner || isDraw) return;

    if (
      (isXTurn && player !== "X") ||
      (!isXTurn && player !== "O")
    ) {
      return;
    }

    if (board[index] !== "") return;

    const copyBoard = [...board];

    copyBoard[index] = isXTurn ? "X" : "O";

    setBoard(copyBoard);

    const gameWinner = checkWinner(copyBoard);

    if (gameWinner) {

      setWinner(gameWinner);

    }

    const draw =
      !copyBoard.includes("") && !gameWinner;

    if (draw) {

      setIsDraw(true);

    }

    socket.emit("makeMove", {
      board: copyBoard,
      isXTurn: !isXTurn,
      winner: gameWinner,
      isDraw: draw,
    });

    setIsXTurn(!isXTurn);
  };

  const restartGame = () => {

    socket.emit("restartGame");

  };

  useEffect(() => {

    socket.on("receiveMove", (data) => {

      setBoard(data.board);

      setIsXTurn(data.isXTurn);

      setWinner(data.winner);

      setIsDraw(data.isDraw);

    });

    socket.on("playerAssignment", (symbol) => {

      setPlayer(symbol);

    });

    socket.on("gameRestarted", () => {

      setBoard([
        "", "", "",
        "", "", "",
        "", "", "",
      ]);

      setWinner(null);

      setIsDraw(false);

      setIsXTurn(true);

    });

    return () => {

      socket.off("receiveMove");

      socket.off("playerAssignment");

      socket.off("gameRestarted");

    };

  }, []);

  return {
    board,
    isXTurn,
    winner,
    isDraw,
    player,
    handleClick,
    restartGame,
  };
};

export default useGameLogic;