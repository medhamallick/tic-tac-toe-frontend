import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
    try {
        await axios.post(
        BASE_URL + "/logout",
        {},
        {
            withCredentials: true,
        }
        );

        dispatch(removeUser());

        navigate("/login");
    } catch (err) {
        console.log(err);
    }
    };
    return (
        <div className="navbar bg-slate-950  border-0 shadow-none">
            <div className="flex-1">
                <a className="btn btn-ghost text-3xl pl-11">Tic Tac Toe</a>
            </div>
            <div className="flex gap-10 mr-10">
                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <ul
                    tabIndex="-1"
                    className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 bg-slate-900 shadow-2xl">
                    <li>
                    <a className="justify-between">
                        Profile
                    </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li>
                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                </ul>
                </div>
            </div>
        </div>

  );
};

export default Navbar;