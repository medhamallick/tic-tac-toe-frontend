import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../utils/axios";
import { socket } from "../utils/socket";

const GameInvitePopup = () => {
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const [invite, setInvite] = useState(null);
    const [readyInvite, setReadyInvite] = useState(null);
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        socket.on("gameInvite",(inviteData) => {
            setInvite(inviteData);
        });

        socket.on("matchReady",(inviteData) => {
            setInvite(null);
            setReadyInvite(inviteData);
        });

        socket.on("inviteRejected", () => {
            alert("Invite Rejected");
        });
        return () => {
            socket.off("gameInvite");
            socket.off("matchReady");
            socket.off("inviteRejected");
        };
    }, []);

    useEffect(() => {
        if(!invite)    return;
        const timer = setTimeout(() => {
            setInvite(null);
        }, 5000);
        return () => clearTimeout(timer);
    }, [invite]);

    useEffect(() => {
        if(!readyInvite)    return;
        setCountdown(5);
        let seconds = 5;
        const timer = setInterval(() => {
            seconds--;
            setCountdown(seconds);
            if(seconds <= 0){
                clearInterval(timer);
                setReadyInvite(null);
            }
        }, 1000);
        return () =>clearInterval(timer);
    }, [readyInvite]);

    const acceptInvite = async (inviteObj) => {
        try{
            await api.post(`/game/accept/${inviteObj._id}`);
            socket.emit("acceptInviteSocket",inviteObj);
            setInvite(null);
        }
        catch (err) {
            console.log(err);
        }
    };
    const rejectInvite = async (inviteObj) => {
        try {
            await api.post(`/game/decline/${inviteObj._id}`);
            socket.emit("rejectInvite",inviteObj);
            setInvite(null);
        }
        catch (err) {
            console.log(err);
        }
    };

    const enterGame = () => {
        socket.emit("enterGame",{
            roomId : readyInvite.roomId,
            userId : user._id,
            }
        );
        setReadyInvite(
            null
        );
        navigate(`/game/${readyInvite.roomId}`);
    };

    if (readyInvite) {
        return (
            <div className="fixed top-5 left-4 right-4 sm:left-auto sm:right-5 sm:w-[420px] bg-green-500 text-white px-4 py-4 rounded-xl shadow-xl z-50">

                <div className="flex items-center justify-between gap-3">

                    <p className="flex-1 text-sm sm:text-lg font-semibold">
                        Expires in {countdown}s
                    </p>

                    <button
                        onClick={enterGame}
                        className="shrink-0 bg-white text-green-600 px-3 sm:px-4 py-2 rounded-lg font-bold text-sm sm:text-base"
                    >
                        Enter Game
                    </button>

                </div>

            </div>
        );
    }


    if (!invite)    return null;

    return (

        <div className="fixed top-5 left-4 right-4 sm:left-auto sm:right-5 sm:w-[480px] bg-green-500 text-white px-4 py-4 rounded-xl shadow-xl z-50">

            <div className="flex items-center justify-between gap-3">

                <p className="flex-1 text-sm sm:text-lg font-semibold leading-tight">
                    <span className="font-bold">
                        {invite?.fromUserId?.firstName}
                    </span>{" "}
                    invited you to play.
                </p>

                <div className="flex gap-2 shrink-0">
                    <button
                        onClick={() => rejectInvite(invite)}
                        className="bg-red-500 px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base"
                    >
                        Reject
                    </button>

                    <button
                        onClick={() => acceptInvite(invite)}
                        className="bg-white text-green-600 px-3 sm:px-4 py-2 rounded-lg font-bold text-sm sm:text-base"
                    >
                        Accept
                    </button>
                </div>

            </div>

        </div>
    );

};

export default GameInvitePopup;
