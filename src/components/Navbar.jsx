import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const DEFAULT_PROFILE =
    "https://img.magnific.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80";

const Navbar = () => {

    const user = useSelector((store) => store.user);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {

        const timer = setTimeout(() => {

            searchUsers();

        }, 300);

        return () => clearTimeout(timer);

    }, [search]);

    const searchUsers = async () => {

        if (search.trim() === "") {

            setSearchResult([]);

            return;

        }

        try {

            const res = await axios.get(

                BASE_URL + `/users/search?search=${search}`,

                {

                    withCredentials: true,

                }

            );

            setSearchResult(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

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

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="navbar bg-slate-950 px-2 md:px-8 py-3">

            {/* Left */}

            <div className="flex-1">

                <button
                    onClick={() => navigate("/home")}
                    className="btn btn-ghost hover:bg-transparent p-0"
                >

                    <h1 className="text-3xl sm:text-2xl md:text-3xl font-bold text-white whitespace-nowrap">

                        Tic Tac Toe

                    </h1>

                </button>

            </div>

            {/* Right */}

            <div className="flex items-center gap-2 md:gap-8">

                {/* Search */}

                <div className="relative">

                    <input

                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="input input-bordered w-28 sm:w-40 md:w-72 lg:w-80 h-9 md:h-11 text-xs md:text-base bg-slate-800 text-white placeholder:text-gray-400 border-slate-600"
                    />

                    {
                        searchResult.length > 0 &&
                        <div className="absolute top-12 md:top-14 right-0 w-72 bg-slate-900 rounded-xl shadow-2xl max-h-80 overflow-y-auto z-50">
                            {
                                searchResult.map((player) => (
                                    <div
                                        key={player._id}
                                        onClick={() => {
                                            navigate(`/user/${player._id}`);
                                            setSearch("");
                                            setSearchResult([]);
                                        }}
                                        className="flex items-center gap-3 p-3 hover:bg-slate-800 cursor-pointer"
                                    >

                                        <img

                                            src={player.profileUrl || DEFAULT_PROFILE}

                                            className="w-10 h-10 rounded-full"

                                            alt={player.firstName}

                                        />

                                        <h2 className="text-white font-semibold">

                                            {player.firstName}

                                        </h2>

                                    </div>

                                ))

                            }

                        </div>

                    }

                </div>
                                {/* Avatar */}

                <div className="dropdown dropdown-end">

                    <div
                        tabIndex={0}
                        role="button"
                        className="flex items-center gap-1 md:gap-3 cursor-pointer"
                    >

                        <img
                            src={user?.profileUrl || DEFAULT_PROFILE}
                            alt="Profile"
                            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full"
                        />

                        <span className="text-white font-semibold text-[10px] sm:text-xs md:text-lg whitespace-nowrap">

                            Hi {user?.firstName}

                        </span>

                    </div>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content rounded-box z-50 mt-3 w-52 p-2 bg-slate-900 shadow-2xl"
                    >

                        <li>

                            <button
                                onClick={() => navigate("/profile")}
                            >

                                Profile

                            </button>

                        </li>

                        <li>

                            <button
                                onClick={handleLogout}
                            >

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







// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { removeUser } from "../utils/userSlice";
// import { BASE_URL } from "../utils/constants";


// const Navbar = () => {
//     const user = useSelector((store) => store.user);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleLogout = async () => {
//     try {
//         await axios.post(
//         BASE_URL + "/logout",
//         {},
//         {
//             withCredentials: true,
//         }
//         );

//         dispatch(removeUser());

//         navigate("/login");
//     } catch (err) {
//         console.log(err);
//     }
//     };
//     return (
//         <div className="navbar bg-slate-950  border-0 shadow-none">
//             <div className="flex-1">
//                 <a className="btn btn-ghost text-3xl pl-11">Tic Tac Toe</a>
//             </div>
//             <div className="flex gap-10 mr-10">
//                 <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
//                 <div className="dropdown dropdown-end">
//                 <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//                     <div className="w-10 rounded-full">
//                     <img
//                         alt="Tailwind CSS Navbar component"
//                         src="https://img.magnific.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80" />
//                     </div>
                    
//                 </div>
//                 <h3 className="font-semibold text-white">
//                     Hii {user?.firstName}!
//                 </h3>
//                 <ul
//                     tabIndex="-1"
//                     className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 bg-slate-900 shadow-2xl">
//                     <li>
//                         <button
//                             onClick={() => navigate("/profile")}
//                             className="justify-between"
//                         >
//                             Profile
//                         </button>
//                     </li>
//                     <li><a>Settings</a></li>
//                     <li>
//                         <button onClick={handleLogout}>
//                             Logout
//                         </button>
//                     </li>
//                 </ul>
//                 </div>
//             </div>
//         </div>
//     );


// };

// export default Navbar;