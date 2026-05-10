import { useEffect, useState } from "react";
import { socket } from "../socket";
import { checkWinner } from "../utils/checkWinner";

const useGameLogic = () => {

  // board state
  const [board, setBoard] = useState([
    "", "", "",
    "", "", "",
    "", "", "",
  ]);

  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [player, setPlayer] = useState("");

  // handle square click
  const handleClick = (index) => {

    // stop game if winner or draw exists
    if (winner || isDraw) return;

    // allow only correct player's turn
    if (
      (isXTurn && player !== "X") ||
      (!isXTurn && player !== "O")
    ) {
      return;
    }

    // prevent overwriting existing cell
    if (board[index] !== "") return;

    // copy board
    const copyBoard = [...board];

    // place X or O
    copyBoard[index] = isXTurn ? "X" : "O";

    // update local board
    setBoard(copyBoard);

    // check winner
    const gameWinner = checkWinner(copyBoard);

    if (gameWinner) {
      setWinner(gameWinner);
    }

    // check draw
    const draw = !copyBoard.includes("") && !gameWinner;

    if (draw) {
      setIsDraw(true);
    }

    // send move to server
    socket.emit("makeMove", {
      board: copyBoard,
      isXTurn: !isXTurn,
      winner: gameWinner,
      isDraw: draw,
    });

    // change turn
    setIsXTurn(!isXTurn);
  };

  // restart game
  const restartGame = () => {
    console.log("Restart button clicked");
    socket.emit("restartGame");
  };

  // socket listeners
  useEffect(() => {
    // socket.emit("message", "Hello from frontend");
    
    // receive updated board from server
    socket.on("receiveMove", (data) => {
      setBoard(data.board);
      setIsXTurn(data.isXTurn);
      setWinner(data.winner);
      setIsDraw(data.isDraw);
    });

    // assign X or O to player
    socket.on("playerAssignment", (symbol) => {
      setPlayer(symbol);
    });

    socket.on("gameRestarted", () => {
    console.log("Restart event received in frontend");
    setBoard([
      "", "", "",
      "", "", "",
      "", "", "",
    ]);
    setWinner(null);
    setIsDraw(false);
    setIsXTurn(true);
  });


    // cleanup listeners
    return () => {
      socket.off("receiveMove");
      socket.off("playerAssignment");
      socket.off("gameRestarted");
    };

  }, []);
  // export everything
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