import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../utils/socket";
import { checkWinner } from "../utils/checkWinner";

const GameRoom = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [board, setBoard] = useState([
        "", "", "",
        "", "", "",
        "", "", "",
    ]);

    const [isXTurn, setIsXTurn] = useState(true);
    const [winner, setWinner] = useState(null);
    const [player, setPlayer] = useState("");
    const [isDraw, setIsDraw] = useState(false);
    const [roomReady, setRoomReady] = useState(false);
    const [showTimeout, setShowTimeout] = useState(false);

    const handleClick = (index) => {
        if (!roomReady) return;
        if (winner || isDraw) return;
        if ((isXTurn && player !== "X") || (!isXTurn && player !== "O")){
            return;
        }
        if(board[index] !== "") return;
        const copyBoard = [...board];
        copyBoard[index] = isXTurn ? "X" : "O";
        const gameWinner = checkWinner(copyBoard);
        const draw = !copyBoard.includes("") && !gameWinner;
        setBoard(copyBoard);
        setWinner(gameWinner);
        setIsDraw(draw);
        setIsXTurn(!isXTurn);

        socket.emit("makeMove",
            {
                roomId,
                board : copyBoard,
                isXTurn : !isXTurn,
                winner : gameWinner,
                isDraw : draw,
            }
        );

    };

    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }
        socket.emit("joinRoom", roomId);
        socket.on("receiveMove", (data) => {
            setBoard(data.board);
            setIsXTurn(data.isXTurn);
            setWinner(data.winner);
            setIsDraw(data.isDraw);
            }
        );

        socket.on("playerAssignment",(symbol) => {
            setPlayer(symbol);
        });

        socket.on("waitingForOpponent",() => {
            setRoomReady(false);
        });

        socket.on("roomReady", () => {
            setRoomReady(true);
            setShowTimeout(false);
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
            socket.off("waitingForOpponent");
            socket.off("roomReady");
            socket.off("gameRestarted");
        };

    }, [roomId]);

    useEffect(() => {
        if(roomReady)  return;

        const timer = setTimeout(() => {
            setShowTimeout(true);
            setTimeout(() => {
                navigate("/users");
            }, 2000);

        }, 5000);
        return () => clearTimeout(timer);
    }, [roomReady]);

    const restartGame = () => {
        socket.emit("restartGame", roomId);
    };

    return (

        <div className="min-h-screen bg-[#020f2b] flex flex-col justify-center items-center gap-6 text-white">
            <h1 className="text-4xl font-bold">
                Game Room
            </h1>
            <h2 className="text-2xl">
                You are : {player}
            </h2>
            <h2 className="text-2xl">
                {
                    winner
                        ? `${winner} Wins`
                        : isDraw
                        ? "Draw"
                        : `${isXTurn ? "X" : "O"} Turn`
                }
            </h2>

            <div className="grid grid-cols-3 gap-3">
                {
                    board.map((cell, index) => (
                        <button
                            key={index}
                            onClick={() => handleClick(index)}
                            className="w-24 h-24 bg-[#0d1b3d] rounded-2xl text-4xl font-bold"
                        >
                            {cell}
                        </button>
                        )
                    )
                }
            </div>
            <button onClick={restartGame}
                className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-bold"
            >
                Restart
            </button>
            { !roomReady &&
                <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-50">
                    <div className=" bg-slate-900 p-8 rounded-2xl text-center">
                        {
                            showTimeout ? (
                                <h2 className="text-3xl font-bold text-red-500">
                                    Opponent is not ready
                                </h2>
                            ) : (
                                <h2 className="text-3xl font-bold">
                                    Waiting for opponent...
                                </h2>
                            )
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default GameRoom;