import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#020f2b] flex justify-center items-center px-4">
            <div className="flex flex-col items-center gap-8 w-full max-w-md">
                <h1 className="text-white text-5xl font-bold">
                    Tic Tac Toe
                </h1>
                <button
                    onClick={() =>
                        navigate("/computer")
                    }
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-2xl font-bold"
                >
                    👤 VS 💻
                </button>

                <button
                    onClick={() =>
                        navigate("/users")
                    }
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl text-2xl font-bold"
                >
                    👤 VS 👤
                </button>
            </div>
        </div>
    );
};

export default Home;