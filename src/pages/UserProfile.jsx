import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/axios";

const UserProfile = () => {

    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [relationship, setRelationship] = useState("");
    const [requestId, setRequestId] = useState(null);

    useEffect(() => {
        fetchUser();
    }, [userId]);

    const fetchUser = async () => {
        try {
            const res = await api.get(`/users/${userId}`);
            setUser(res.data.user);
            setRelationship(res.data.relationship);
            setRequestId(res.data.requestId);
        }
        catch (err) {
            console.log(err);
        }
    };

    const sendRequest = async () => {
        try {
            await api.post(`/friends/request/${user._id}`);
            setRelationship("outgoing");
        }
        catch (err) {
            console.log(err);
        }
    };

    const cancelRequest = async () => {
        try {
            await api.delete(`/friends/cancel/${user._id}`);
            setRelationship("none");
        }
        catch (err) {
            console.log(err);
        }
    };

    const acceptRequest = async () => {
        try {
            await api.post(`/friends/accept/${requestId}`);
            setRelationship("friends");
        }
        catch (err) {
            console.log(err);
        }
    };

    const rejectRequest = async () => {
        try {
            await api.post(`/friends/reject/${requestId}`);
            setRelationship("none");
        }
        catch (err) {
            console.log(err);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-slate-950 flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    const winRate = user.totalGames === 0 ? 0 : ((user.wins / user.totalGames) * 100).toFixed(1);

    return (
        <div className="min-h-screen bg-slate-950 flex justify-center items-center p-8">
            <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-xl p-8">
                <div className="flex flex-col items-center">
                    <img
                        className="w-32 h-32 rounded-full border-4 border-cyan-500"
                        src={user.profileUrl}
                        alt="Profile"
                    />

                    <h1 className="text-3xl font-bold text-white mt-4">
                        {user.firstName}
                    </h1>

                    <span className="badge badge-warning mt-3">
                        {user.rank}
                    </span>

                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="stat bg-slate-800 rounded-xl">
                        <div className="stat-title text-white">
                            Games
                        </div>
                        <div className="stat-value">
                            {user.totalGames}
                        </div>
                    </div>

                    <div className="stat bg-slate-800 rounded-xl">
                        <div className="stat-title text-white">
                            Wins
                        </div>
                        <div className="stat-value text-green-500">
                            {user.wins}
                        </div>
                    </div>
                    <div className="stat bg-slate-800 rounded-xl">
                        <div className="stat-title text-white">
                            Draws
                        </div>
                        <div className="stat-value text-yellow-500">
                            {user.draws}
                        </div>
                    </div>
                    <div className="stat bg-slate-800 rounded-xl">
                        <div className="stat-title text-white">
                            Losses
                        </div>
                        <div className="stat-value text-red-500">
                            {user.losses}
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <p className="text-white mb-2">
                        Win Rate : {winRate}%
                    </p>
                    <progress
                        className="progress progress-success w-full"
                        value={winRate}
                        max="100"
                    ></progress>
                </div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="stat bg-slate-800 rounded-xl">
                        <div className="stat-title text-white">
                            Current Streak
                        </div>
                        <div className="stat-value text-orange-500">
                            🔥 {user.currentWinStreak}
                        </div>
                    </div>
                    <div className="stat bg-slate-800 rounded-xl">
                        <div className="stat-title text-white">
                            Best Streak
                        </div>
                        <div className="stat-value text-pink-500">
                            ⭐ {user.bestWinStreak}
                        </div>
                    </div>
                    <div className="stat bg-slate-800 rounded-xl">
                        <div className="stat-title text-white">
                            Friends
                        </div>
                        <div className="stat-value text-cyan-500">
                            👥 {user.friends.length}
                        </div>
                    </div>
                    <div className="stat bg-slate-800 rounded-xl">
                        <div className="stat-title text-white">
                            Last Played
                        </div>
                        <div className="stat-value text-lg">
                            {
                                user.lastPlayed ? new Date(user.lastPlayed).toLocaleDateString() : "Never"
                            }
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-8">
                    {
                        relationship === "none" &&
                        <button
                            className="btn btn-primary"
                            onClick={sendRequest}
                        >
                            Add Friend
                        </button>
                    }

                    {
                        relationship === "outgoing" &&
                        <button
                            className="btn btn-warning"
                            onClick={cancelRequest}
                        >
                            Cancel Request
                        </button>
                    }

                    {
                        relationship === "friends" &&
                        <button
                            className="btn btn-success"
                            disabled
                        >
                            Friends ✓
                        </button>
                    }

                    {
                        relationship === "incoming" &&
                        <div className="flex gap-4">
                            <button
                                className="btn btn-success"
                                onClick={acceptRequest}
                            >
                                Accept
                            </button>

                            <button
                                className="btn btn-error"
                                onClick={rejectRequest}
                            >
                                Reject
                            </button>
                        </div>
                    }
                </div>
                <div className="flex justify-center mt-6">
                    <button
                        className="btn btn-outline"
                        onClick={() => navigate(-1)}
                    >
                        ← Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;