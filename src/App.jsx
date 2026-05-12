import { useState } from "react";

import Home from "./pages/Home";
import SinglePlayer from "./pages/SinglePlayer";
import Multiplayer from "./pages/Multiplayer";

const App = () => {

  // selected game mode
  const [gameMode, setGameMode] = useState(null);
  // single player page
  if (gameMode === "single") {
    return (
      <SinglePlayer />
    );
  }

  // multiplayer page
  if (gameMode === "multi") {
    return (
      <Multiplayer />
    );
  }
  // home page
  return (
    <Home setGameMode={setGameMode} />
  );

};

export default App;








// import Board from "./components/Board";
// import GameStatus from "./components/GameStatus";
// import RestartButton from "./components/RestartButton";

// import useGameLogic from "./hooks/useMultiplayerLogic";

// const App = () => {

//   const {
//     board,
//     isXTurn,
//     winner,
//     isDraw,
//     player,
//     handleClick,
//     restartGame,
//   } = useGameLogic();

//   return (

//     <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center">

//       <h1 className="text-white text-4xl font-bold mb-7">
//         Tic Tac Toe
//       </h1>

//       <GameStatus
//         player={player}
//         winner={winner}
//         isDraw={isDraw}
//         isXTurn={isXTurn}
//       />

//       <Board
//         board={board}
//         handleClick={handleClick}
//       />

//       <RestartButton
//         restartGame={restartGame}
//       />

//     </div>

//   );
// };

// export default App;