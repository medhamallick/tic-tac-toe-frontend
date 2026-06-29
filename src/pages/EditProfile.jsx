import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

const DEFAULT_PROFILE =
    "https://img.magnific.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80";

const EditProfile = () => {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");

    const [profileUrl, setProfileUrl] = useState("");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        fetchProfile();

    }, []);

    const fetchProfile = async () => {

        try {

            const res = await api.get("/profile/view");

            setFirstName(res.data.firstName);

            setProfileUrl(res.data.profileUrl);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    const handleSave = async () => {

        try {

            setError("");

            let image = profileUrl.trim();

            if (image === "") {

                image = DEFAULT_PROFILE;

            }

            const validImage = await new Promise((resolve) => {

                const img = new Image();

                img.onload = () => {

                    resolve(image);

                };

                img.onerror = () => {

                    resolve(DEFAULT_PROFILE);

                };

                img.src = image;

            });

            await api.patch("/profile/edit", {

                firstName,

                profileUrl: validImage,

            });

            setProfileUrl(validImage);

            navigate("/profile");

        }

        catch (err) {

            setError(

                err.response?.data ||

                "Something went wrong"

            );

        }

    };

    if (loading) {

        return (

            <div className="min-h-screen bg-slate-950 flex justify-center items-center">

                <span className="loading loading-spinner loading-lg text-cyan-500"></span>

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-slate-950 flex justify-center items-center p-8">

            <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-xl p-8">

                <h1 className="text-3xl font-bold text-center text-white">

                    Edit Profile

                </h1>

                <div className="flex justify-center mt-8">

                    <img
                        src={profileUrl}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-cyan-500"
                        onError={(e) => {
                            e.currentTarget.src = DEFAULT_PROFILE;
                        }}
                    />

                </div>

                <div className="mt-8">

                    <label className="label">

                        <span className="label-text text-white">

                            Name

                        </span>

                    </label>

                    <input
                        type="text"
                        className="input input-bordered w-full text-black"
                        value={firstName}
                        maxLength={7}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                </div>

                <div className="mt-5">

                    <label className="label">

                        <span className="label-text text-white">

                            Profile Image URL

                        </span>

                    </label>

                    <input
                        type="text"
                        className="input input-bordered w-full text-black"
                        value={profileUrl}
                        onChange={(e) => setProfileUrl(e.target.value)}
                    />

                </div>
                                {
                    error &&
                    <p className="text-red-500 text-center mt-4">

                        {error}

                    </p>
                }

                <div className="flex justify-between mt-8">

                    <button
                        className="btn btn-outline"
                        onClick={() => navigate("/profile")}
                    >
                        Cancel
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={handleSave}
                    >
                        Save Changes
                    </button>

                </div>

            </div>

        </div>

    );

};

export default EditProfile;