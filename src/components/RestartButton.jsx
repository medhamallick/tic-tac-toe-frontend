const RestartButton = ({ restartGame }) => {

  return (

    <button
      onClick={restartGame}
      className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg"
    >
      Restart Game
    </button>

  );
};

export default RestartButton;