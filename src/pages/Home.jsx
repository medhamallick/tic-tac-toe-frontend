import { useNavigate } from "react-router-dom";

const Home = ({ setGameMode }) => {
  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-gray-900 flex justify-center items-center px-4">

      <div className=" flex flex-col items-center gap-6 w-full max-w-md">

        {/* Title */}
        <h1 className=" text-white text-4xl sm:text-5xl font-bold text-center">
          Tic Tac Toe
        </h1>

        {/* VS Computer */}
        <button
          onClick={() => navigate("/computer")}
          className=" w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-bl text-lg font-semibold rounded-xl transition-all duration-200"
        >
          👤 VS 💻
        </button>

        {/* Multiplayer */}
        <button
          onClick={() => navigate("/multiplayer")}
          className="w-full py-3 bg-green-600 hover:bg-green-700 active:bg-green-80 text-white text-lg font-semibold rounded-xl transition-all duration-200"
        >
          👤 VS 👤
        </button>

      </div>

    </div>

  );
};

export default Home;