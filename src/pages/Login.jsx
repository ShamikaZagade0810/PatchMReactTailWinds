
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, Lock, Loader2 } from "lucide-react";
import bdBackgroundImage from "../assets/bdBackgroundImage.jpg";

const ROLE_DEFAULT_ROUTE = {
  admin: "/projectspage",
  developer: "/projects",
  tester: "/instances",
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/projectspage";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    console.log("user before passing to login: ", username, password);
    const user = await auth.login(username, password);
    console.log("user here :", user);

    


    if (user) {
      navigate("/dashboard/mainDashboard", { replace: true });
    } else {
      setError("Invalid username or password");
    }

    // clear form
    setUsername("");
    setPassword("");

    setIsLoading(false);
    setIsLoading(false);
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bdBackgroundImage})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 " />

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-md backdrop-blur-xs bg-white border border-white/20  rounded-xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">PanetGuard Pro DMS


          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white  border border-slate-300  text-slate-900  placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white  border border-slate-300  text-slate-900  placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="text-sm text-red-700 text-center animate-pulse">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-cyan-400 hover:bg-cyan-700 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
