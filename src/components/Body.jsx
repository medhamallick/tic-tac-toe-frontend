import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { socket } from "../utils/socket";

import NavBar from "./Navbar";
import GameInvitePopup from "./GameInvitePopup";

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const user = useSelector((store) => store.user);

    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const res = await axios.get(BASE_URL + "/profile/view", {
                withCredentials: true,
            });

            dispatch(addUser(res.data));
        } catch (err) {
            dispatch(removeUser());
            navigate("/login", { replace: true });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (location.pathname === "/login") {
            setLoading(false);
            return;
        }

        fetchUser();
    }, []);

    useEffect(() => {
        if (!user?._id) return;

        if (!socket.connected) {
            socket.connect();
        }

        socket.emit("registerUser", user._id);
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950"></div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {user && (
                <>
                    <NavBar />
                    <GameInvitePopup />
                </>
            )}

            <Outlet />
        </div>
    );
};

export default Body;