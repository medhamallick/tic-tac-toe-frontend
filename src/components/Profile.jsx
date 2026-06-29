// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/axios";

// const Profile = () => {

//     const navigate = useNavigate();

//     const [user, setUser] = useState(null);

//     useEffect(() => {

//         fetchProfile();

//     }, []);

//     const fetchProfile = async () => {

//         try {

//             const res = await api.get("/profile/view");

//             setUser(res.data);

//         }
//         catch (err) {

//             console.log(err);

//         }

//     };

//     if (!user) {

//         return (
//             <div className="min-h-screen bg-slate-950 flex justify-center items-center">
//                 <span className="loading loading-spinner loading-lg text-cyan-500"></span>
//             </div>
//         );

//     }

//     const winRate =
//         user.totalGames === 0
//             ? 0
//             : (
//                 (user.wins / user.totalGames) *
//                 100
//             ).toFixed(1);

//     return (

//         <div className="min-h-screen bg-slate-950 flex justify-center items-center p-8">

//             <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl p-8">

//                 <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

//                     <img
//                         src={user.profileUrl}
//                         alt="Profile"
//                         className="w-40 h-40 rounded-full border-4 border-cyan-500"
//                     />

//                     <div className="flex-1">

//                         <h1 className="text-4xl font-bold text-white">

//                             {user.firstName}

//                         </h1>

//                         <p className="text-gray-400 mt-2">

//                             {user.emailId}

//                         </p>

//                         <div className="flex gap-3 mt-5">

//                             <span
//                                 className={
//                                     user.status === "Online"
//                                         ? "badge badge-success badge-lg"
//                                         : "badge badge-error badge-lg"
//                                 }
//                             >
//                                 {user.status}
//                             </span>

//                             <span className="badge badge-warning badge-lg">

//                                 🏆 {user.rank}

//                             </span>

//                         </div>

//                     </div>

//                 </div>

//                 <div className="divider"></div>

//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

//                     <div className="stat bg-slate-800 rounded-xl">

//                         <div className="stat-title">

//                             Games

//                         </div>

//                         <div className="stat-value text-cyan-400">

//                             {user.totalGames}

//                         </div>

//                     </div>

//                     <div className="stat bg-slate-800 rounded-xl">

//                         <div className="stat-title">

//                             Wins

//                         </div>

//                         <div className="stat-value text-green-500">

//                             {user.wins}

//                         </div>

//                     </div>

//                     <div className="stat bg-slate-800 rounded-xl">

//                         <div className="stat-title">

//                             Losses

//                         </div>

//                         <div className="stat-value text-red-500">

//                             {user.losses}

//                         </div>

//                     </div>

//                     <div className="stat bg-slate-800 rounded-xl">

//                         <div className="stat-title">

//                             Draws

//                         </div>

//                         <div className="stat-value text-yellow-500">

//                             {user.draws}

//                         </div>

//                     </div>

//                 </div>
//                                 <div className="mt-8">

//                     <div className="flex justify-between text-white mb-2">

//                         <span>Win Rate</span>

//                         <span>{winRate}%</span>

//                     </div>

//                     <progress
//                         className="progress progress-success w-full"
//                         value={winRate}
//                         max="100"
//                     ></progress>

//                 </div>

//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">

//                     <div className="stat bg-slate-800 rounded-xl">

//                         <div className="stat-title">

//                             Current Streak

//                         </div>

//                         <div className="stat-value text-orange-500">

//                             🔥 {user.currentWinStreak}

//                         </div>

//                     </div>

//                     <div className="stat bg-slate-800 rounded-xl">

//                         <div className="stat-title">

//                             Best Streak

//                         </div>

//                         <div className="stat-value text-pink-500">

//                             ⭐ {user.bestWinStreak}

//                         </div>

//                     </div>

//                     <div className="stat bg-slate-800 rounded-xl">

//                         <div className="stat-title">

//                             Friends

//                         </div>

//                         <div className="stat-value text-cyan-500">

//                             👥 {user.friends.length}

//                         </div>

//                     </div>

//                     <div className="stat bg-slate-800 rounded-xl">

//                         <div className="stat-title">

//                             Last Played

//                         </div>

//                         <div className="stat-value text-lg text-white">

//                             {
//                                 user.lastPlayed
//                                     ? new Date(user.lastPlayed).toLocaleDateString()
//                                     : "Never"
//                             }

//                         </div>

//                     </div>

//                 </div>

//                 <div className="flex justify-between mt-10">

//                     <button
//                         onClick={() => navigate(-1)}
//                         className="btn btn-outline"
//                     >
//                         ← Back
//                     </button>

//                     <button
//                         className="btn btn-primary"
//                     >
//                         Edit Profile
//                     </button>

//                 </div>

//             </div>

//         </div>

//     );

// };

// export default Profile;






import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

const Profile = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {

        fetchProfile();

    }, []);

    const fetchProfile = async () => {

        try {

            const res = await api.get("/profile/view");

            setUser(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    if (!user) {

        return (

            <div className="min-h-screen bg-slate-950 flex justify-center items-center">

                <span className="loading loading-spinner loading-lg text-cyan-500"></span>

            </div>

        );

    }

    const winRate =
        user.totalGames === 0
            ? 0
            : (
                (user.wins / user.totalGames) * 100
            ).toFixed(1);

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

                    <p className="text-gray-400">

                        {user.emailId}

                    </p>

                    <div className="flex gap-3 mt-3">

                        <span
                            className={
                                user.status === "Online"
                                    ? "badge badge-success"
                                    : "badge badge-error"
                            }
                        >
                            {user.status}
                        </span>

                        <span className="badge badge-warning">

                            🏆 {user.rank}

                        </span>

                    </div>

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

                        Win Rate: {winRate}%

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
                                user.lastPlayed
                                    ? new Date(user.lastPlayed).toLocaleDateString()
                                    : "Never"
                            }

                        </div>

                    </div>

                </div>

                <div className="flex justify-between mt-8">

                    <button
                        className="btn btn-outline"
                        onClick={() => navigate(-1)}
                    >
                        ← Back
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/edit-profile")}
                    >
                        Edit Profile
                    </button>
                    {/* <button className="btn btn-primary">
                        Edit Profile
                    </button> */}

                </div>

            </div>

        </div>

    );

};

export default Profile;






// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//     // Get logged-in user from Redux
//     const user = useSelector((store) => store.user);

//     const navigate = useNavigate();

//     // Temporary stats (replace these with backend data later)
//     const totalGames = 20;
//     const wins = 12;
//     const draws = 3;
//     const losses = 5;

//     const winRate =
//         totalGames === 0
//             ? 0
//             : ((wins / totalGames) * 100).toFixed(1);

//     return (
//         <div className="min-h-screen bg-slate-950 flex justify-center items-center p-8">

//             {/* Profile Card */}
//             <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-xl p-8">

//                 {/* Profile Image */}
//                 <div className="flex flex-col items-center">

//                     <img
//                         className="w-32 h-32 rounded-full border-4 border-cyan-500"
//                         src="https://img.magnific.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80"
//                         alt="Profile"
//                     />

//                     <h1 className="text-3xl font-bold text-white mt-4">
//                         {user?.firstName} {user?.lastName}
//                     </h1>

//                     <p className="text-gray-400">
//                         {user?.emailId}
//                     </p>

//                     <span className="badge badge-success mt-3">
//                         Online
//                     </span>

//                 </div>

//                 {/* Statistics */}
//                 <div className="grid grid-cols-2 gap-4 mt-8">

//                     <div className="stat bg-slate-800 rounded-xl">
//                         <div className="stat-title">Games</div>
//                         <div className="stat-value">{totalGames}</div>
//                     </div>

//                     <div className="stat bg-slate-800 rounded-xl">
//                         <div className="stat-title">Wins</div>
//                         <div className="stat-value text-green-500">{wins}</div>
//                     </div>

//                     <div className="stat bg-slate-800 rounded-xl">
//                         <div className="stat-title">Draws</div>
//                         <div className="stat-value text-yellow-500">{draws}</div>
//                     </div>

//                     <div className="stat bg-slate-800 rounded-xl">
//                         <div className="stat-title">Losses</div>
//                         <div className="stat-value text-red-500">{losses}</div>
//                     </div>

//                 </div>

//                 {/* Win Rate */}
//                 <div className="mt-6">

//                     <p className="text-white mb-2">
//                         Win Rate: {winRate}%
//                     </p>

//                     <progress
//                         className="progress progress-success w-full"
//                         value={winRate}
//                         max="100"
//                     ></progress>

//                 </div>

//                 {/* Buttons */}
//                 <div className="flex justify-between mt-8">

//                     <button
//                         className="btn btn-outline"
//                         onClick={() => navigate(-1)}
//                     >
//                         ← Back
//                     </button>

//                     <button className="btn btn-primary">
//                         Edit Profile
//                     </button>

//                 </div>

//             </div>

//         </div>
//     );
// };

// export default Profile;