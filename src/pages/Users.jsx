import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { socket } from "../utils/socket";

const Users = () => {
    const navigate = useNavigate();

    const [friends, setFriends] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [outgoingRequests, setOutgoingRequests] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [waitingUserId, setWaitingUserId] = useState(null);
    const [showPending, setShowPending] = useState(false);
    const [showNewUsers, setShowNewUsers] = useState(false);

    const getUsers = async () => {
        try {
            const res = await api.get(
                "/users/dashboard"
            );
            setFriends(
                res.data.friends
            );
            setPendingRequests(
                res.data.pendingRequests
            );
            setOutgoingRequests(
                res.data.outgoingRequests
            );
            setAllUsers(
                res.data.allUsers
            );
        } catch (err) {
            console.log(err);

        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handlePlay = async (friendId) => {
        try {
            const res = await api.post( `/game/invite/${friendId}`);
            setWaitingUserId(friendId);
            setTimeout(() => {
                setWaitingUserId(null);
            }, 5000);
        }
        catch (err) {
            console.log(err);
        }
    };

    const sendRequest = async (userId) => {
        try {
            await api.post(`/friends/request/${userId}`);
            getUsers();
        } catch (err) {
            console.log(err);
        }
    };

    const cancelRequest = async (userId) => {
        try {
            await api.delete(`/friends/cancel/${userId}`);
            getUsers();
        } catch (err) {
            console.log(err);
        }
    };

    const acceptRequest = async (requestId) => {
        try {
            await api.post(`/friends/accept/${requestId}`);
            getUsers();
        } catch (err) {
            console.log(err);
        }
    };

    const rejectRequest = async (requestId) => {
        try {
            await api.post(`/friends/reject/${requestId}`);
            getUsers();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen bg-[#020f2b] p-6 text-white">
            <h1 className="text-4xl font-bold mb-8 text-center">
                Players
            </h1>
            <div className="max-w-xl mx-auto flex flex-col gap-4">
                <h2 className="text-2xl font-bold">
                    Friends
                </h2>
                {friends.map((user) => (
                    <div
                        key={user._id}
                        className="bg-[#0d1b3d] p-4 rounded-2xl flex justify-between items-center"
                    >
                        <h2 className="text-2xl font-semibold">
                            {user.firstName}
                        </h2>
                        {
                            waitingUserId === user._id ?

                            <button
                                disabled
                                className=" bg-yellow-500 px-5 py-2 rounded-xl font-bold animate-pulse"
                            >
                                Waiting...
                            </button>

                            :

                            <button
                                onClick={() =>
                                    handlePlay(
                                        user._id
                                    )
                                }
                                className=" bg-green-500 hover:bg-green-600 px-5 py-2 rounded-xl font-bold"
                            >
                                Play
                            </button>
                        }
                    </div>
                ))}

                <div className="flex justify-center gap-4 mt-6">
                    <button
                        onClick={() =>
                            setShowPending(true)
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 px-5 py-2 rounded-xl font-bold"
                    >
                        Pending Requests
                    </button>

                    <button
                        onClick={() =>
                            setShowNewUsers(true)
                        }
                        className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-xl font-bold"
                    >
                        New To You
                    </button>

                </div>

            </div>

            {showPending && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
                    <div className="bg-white text-black p-6 rounded-2xl w-[500px]">
                        <h2 className="text-2xl font-bold mb-6">
                            Pending Requests
                        </h2>
                        {pendingRequests.length === 0 && (
                            <p>No pending requests.</p>
                        )}
                        {pendingRequests.map((request) => (
                            <div
                                key={request._id}
                                className="flex justify-between items-center mb-4"
                            >
                                <h3 className="text-lg font-semibold">
                                    {request.fromUserId.firstName}
                                </h3>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() =>
                                            rejectRequest(
                                                request._id
                                            )
                                        }
                                        className="bg-red-500 text-white px-4 py-2 rounded-xl"
                                    >
                                        Ignore
                                    </button>
                                    <button
                                        onClick={() =>
                                            acceptRequest(
                                                request._id
                                            )
                                        }
                                        className="bg-green-500 text-white px-4 py-2 rounded-xl"
                                    >
                                        Accept
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() =>
                                setShowPending(false)
                            }
                            className="mt-4 border px-4 py-2 rounded-xl"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            {showNewUsers && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
                    <div className="bg-white text-black p-6 rounded-2xl w-[500px]">
                        <h2 className="text-2xl font-bold mb-6">
                            New To You
                        </h2>
                        {allUsers.map((user) => {
                            const alreadySent =
                                outgoingRequests.some(
                                    (r) =>
                                        r.toUserId._id === user._id
                                );
                            return (
                                <div
                                    key={user._id}
                                    className="flex justify-between items-center mb-4"
                                >
                                    <h3 className="text-lg font-semibold">
                                        {user.firstName}
                                    </h3>
                                    {alreadySent ? (
                                        <button
                                            onClick={() =>
                                                cancelRequest(
                                                    user._id
                                                )
                                            }
                                            className="bg-red-500 text-white px-4 py-2 rounded-xl"
                                        >
                                            Cancel
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                sendRequest(
                                                    user._id
                                                )
                                            }
                                            className="bg-blue-500 text-white px-4 py-2 rounded-xl"
                                        >
                                            Add Friend
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                        <button
                            onClick={() =>
                                setShowNewUsers(false)
                            }
                            className="mt-4 border px-4 py-2 rounded-xl"
                        >
                            Close
                        </button>

                    </div>
                </div>
            )}

        </div>
    );
};

export default Users;

