import { useState } from "react";
import { checkWinner } from "../utils/checkWinner";

const useSinglePlayerLogic = () => {

  // board state
  const [board, setBoard] = useState([
    "", "", "",
    "", "", "",
    "", "", "",
  ]);

  const [isXTurn, setIsXTurn] = useState(true);

  const [winner, setWinner] = useState(null);

  const [isDraw, setIsDraw] = useState(false);



  // computer move
  const computerMove = (updatedBoard) => {

    // get empty cells
    const emptyCells = updatedBoard
      .map((cell, index) => cell === "" ? index : null)
      .filter((cell) => cell !== null);

    // stop if no empty cell
    if (emptyCells.length === 0) return;
    // random index
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    // copy board
    const newBoard = [...updatedBoard];
    // computer places O
    newBoard[randomIndex] = "O";
    // update board
    setBoard(newBoard);

    // check winner
    const gameWinner = checkWinner(newBoard);

    if (gameWinner) {
      setWinner(gameWinner);
      return;
    }

    // check draw
    const draw =
      !newBoard.includes("") && !gameWinner;

    if (draw) {
      setIsDraw(true);
      return;
    }

    // back to player turn
    setIsXTurn(true);
  };



  // player click
  const handleClick = (index) => {
    // stop game if winner/draw
    if (winner || isDraw) return;
    // allow only X turn
    if (!isXTurn) return;
    // prevent overwrite
    if (board[index] !== "") return;
    // copy board
    const copyBoard = [...board];
    // player move
    copyBoard[index] = "X";
    // update board
    setBoard(copyBoard);
    // check winner
    const gameWinner = checkWinner(copyBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      return;
    }

    // check draw
    const draw =
      !copyBoard.includes("") && !gameWinner;
    if (draw) {
      setIsDraw(true);
      return;
    }
    // computer turn
    setIsXTurn(false);
    // delay computer move
    setTimeout(() => {
      computerMove(copyBoard);
    }, 500);
  };

  // restart game
  const restartGame = () => {
    setBoard([
      "", "", "",
      "", "", "",
      "", "", "",
    ]);
    setWinner(null);
    setIsDraw(false);
    setIsXTurn(true);
  };

  return {
    board,
    isXTurn,
    winner,
    isDraw,
    handleClick,
    restartGame,
  };

};

export default useSinglePlayerLogic;