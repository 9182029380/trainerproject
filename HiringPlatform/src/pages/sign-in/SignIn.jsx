import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      const { role, token, } = response.data; // Destructure to get the role and token

      // Store the token for later use in requests
      localStorage.setItem("token", token);
      alert(token)
      alert(email)

      // Redirect user based on role
      if (role === "trainer") {
        navigate(`/trainer-dashboard/${email}`);
      } else if (role === "company") {
        navigate(`/business-dashboard/${email}`);
      } else if (role === "admin") {
        navigate("/admin-dashboard");
      }
    } catch (error) {
      setErrorMsg("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // Your existing JSX code remains unchanged

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-5">
          <h2 className="text-3xl font-bold text-white text-center">Sign In</h2>
        </div>
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 block"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 block"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white ${
              loading
                ? "bg-purple-400"
                : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {errorMsg && (
            <div className="text-center text-red-500 bg-red-100 rounded-lg p-2">
              {errorMsg}
            </div>
          )}

          {/* <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p> */}
        </form>
      </div>
    </div>
    </>
  );
};

export default SignIn;
