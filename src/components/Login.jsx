import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/home");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/home");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#07152f] to-[#0f172a] flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl p-8">
        <h2 className="text-white text-5xl font-bold text-center mb-8">
            {isLoginForm ? "Login" : "Sign Up"}
        </h2>
        {!isLoginForm && (
            <div className="mb-5">
                <label className="block text-gray-300 mb-2">
                    First Name
                </label>

                <input
                    type="text"
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={(e) =>
                        setFirstName(e.target.value)
                    }
                    className="w-full bg-[#1e293b] text-white placeholder-gray-400 border border-gray-700 rounded-xl px-4 py-3 
                    outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition"
                />

            </div>
        )}
        <div className="mb-5">
            <label className="block text-gray-300 mb-2">
                Email
            </label>
            <input
                type="email"
                placeholder="Enter your email"
                value={emailId}
                onChange={(e) =>
                    setEmailId(e.target.value)
                }
                className=" w-full bg-[#1e293b] text-white placeholder-gray-400 border border-gray-700 rounded-xl
                px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition"
            />
        </div>

        <div className="mb-3">
            <label className="block text-gray-300 mb-2">
                Password
            </label>

            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
                className=" w-full bg-[#1e293b] text-white placeholder-gray-400 border border-gray-700 rounded-xl px-4 py-3 
                    outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition"
            />
        </div>

        {error && (
            <p className="text-red-400 text-sm mb-4">
                {error}
            </p>
        )}
        <button
            onClick={ isLoginForm ? handleLogin : handleSignUp }
            className=" w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg
            font-bold mt-5 transition duration-300 shadow-lg hover:scale-[1.02]"
        >
            {isLoginForm
                ? "Login"
                : "Signup"
            }
        </button>

        <p 
            onClick={() => setIsLoginForm(!isLoginForm)}
            className=" text-gray-300 text-center mt-6 cursor-pointer"
        >
        {isLoginForm ? (
            <>
                New User?{" "}
                <span className="text-blue-400 font-semibold hover:underline">
                    Signup Here
                </span>
            </>
        ) : (
            <>
                Already have an account?{" "}
                <span className="text-blue-400 font-semibold hover:underline">
                    Login
                </span>
            </>
        )}
        </p>
      </div>
    </div>
  );
};
export default Login;