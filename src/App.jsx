import Board from "./components/Board";
import GameStatus from "./components/GameStatus";
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

      <button
        onClick={restartGame}
        className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg"
      >
        Restart Game
      </button>

    </div>

  );
};

export default App;












// import { useEffect, useState } from "react";
// import { socket } from "./socket";

// const App = () => {
//   const [board, setBoard] = useState([
//     "","","",
//     "","","",
//     "","","",
//   ]);
//   const [isXTurn, setIsXTurn] = useState(true);
//   const [winner, setWinner] = useState(null);
//   const [isDraw, setIsDraw] = useState(false);
//   const [player, setPlayer] = useState("");

//   const winningPatterns = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];

//   const handleClick = (index) => {

//     if (winner || isDraw) return;
//     if ((isXTurn && player !== "X") ||(!isXTurn && player !== "O")) {
//       return;
//     }
//     if (board[index] !== "") return;

//     const copyBoard = [...board];
//     copyBoard[index] = isXTurn ? "X" : "O";
//     setBoard(copyBoard);

//     let gameWon = false;
//     let gameWinner = null;

//     for (let pattern of winningPatterns) {
//       const [a, b, c] = pattern;
//       if (copyBoard[a] && copyBoard[a] === copyBoard[b] && copyBoard[a] === copyBoard[c]) {
//         gameWon = true;
//         gameWinner = copyBoard[a];
//         setWinner(copyBoard[a]);
//       }
//     }

//     const draw = !copyBoard.includes("") && !gameWon;

//     if (draw) {
//       setIsDraw(true);
//     }

//     socket.emit("makeMove", {
//       board: copyBoard,
//       isXTurn: !isXTurn,
//       winner: gameWinner,
//       isDraw: draw,
//     });

//     setIsXTurn(!isXTurn);
//   };



//   // const restartGame = () => {

//   //   setBoard([
//   //     "", "", "",
//   //     "", "", "",
//   //     "", "", "",
//   //   ]);

//   //   setWinner(null);
//   //   setIsDraw(false);
//   //   setIsXTurn(true);
//   // };
  
//   const restartGame = () => {
//     socket.emit("restartGame");
//   };


//   useEffect(() => {
//     socket.emit("message", "Hello from frontend");
//     socket.on("receiveMove", (data) => {
//       setBoard(data.board);
//       setIsXTurn(data.isXTurn);
//       setWinner(data.winner);
//       setIsDraw(data.isDraw);
//     });
//     socket.on("playerAssignment", (symbol) => {
//       setPlayer(symbol);
//     });
//     socket.on("gameRestarted", () => {
//       setBoard([
//         "", "", "",
//         "", "", "",
//         "", "", "",
//       ]);
//       setWinner(null);
//       setIsDraw(false);
//       setIsXTurn(true);
//     });
//     return () => {
//       socket.off("receiveMove");
//       socket.off("playerAssignment");
//     };
//   }, []);
  

//   return (

//     <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center">
//       <h1 className="text-white text-4xl font-bold mb-7">Tic Tac Toe</h1>
//       <h2 className="text-white text-xl mb-4">You are: {player}</h2>

//       <h1 className="text-white text-3xl font-bold mb-6">
//         {/* {winner ? `Winner: ${winner}` : `Turn: ${isXTurn ? "X" : "O"}`} */}
//         {winner
//           ? `Winner: ${winner}`
//           : isDraw
//           ? "Match Draw"
//           : `Turn: ${isXTurn ? "X" : "O"}`
//         }
//       </h1>
      
//       <div className="grid grid-cols-3 gap-3">
//         {board.map((cell, index) =>(
//           <div
//           key={index}
//           onClick={() => handleClick(index)}
//           className="w-24 h-24 bg-gray-800 border border-gray-600 flex justify-center items-center text-4xl font-bold cursor-pointer text-white"
//           >
//             {cell}
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={restartGame}
//         className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg"
//       >
//         Restart Game
//       </button>


//     </div>
//   );
// };

// export default App;