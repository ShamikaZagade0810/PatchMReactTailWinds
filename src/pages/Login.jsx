import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const ROLE_DEFAULT_ROUTE = {
  admin: "/projectspage",
  developer: "/projects",
  tester: "/instances",
};

import "./Login.css";


import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";


import bgSvg from "../assets/loginbg.svg";
import footerSvg from "../assets/LoginFooter.svg";
import UnifiedSecureITsvg from "../assets/UnifiedSecureITLogo.svg";
//  import LoginNetwork from "../assets/Login_SVG_new.svg";
import LoginNetwork from "../assets/Login_SVG_new.svg?react";

import PacketLayer from "./PacketLayer";



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
   const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

    const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();


  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  // };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    console.log("user before passing to login: ", formData.username, formData.password);
    const user = await auth.login(formData.username, formData.password);
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
  

  console.log("backSvg:", bgSvg);
  return (
    // <div
    //   className="
    //     h-screen w-full flex items-center justify-center
    //     bg-cover bg-no-repeat bg-center
    //     px-4 py-4 overflow-hidden
    //   "
    //   style={{ backgroundImage: `url(${bgSvg})`,  backgroundSize: "cover",}} >
        <div className=" min-h-screen w-full flex items-center justify-center bg-cover bg-center  px-4 py-4 overflow-hidden " 
       style={{ background: "radial-gradient(circle at center, #0D3C7A 0%, #00061A 85%)", }} >

      
      <div className="relative rounded-[24px] p-[1px] overflow-hidden">

        {/* Animated Border */}
        {/* <div className="absolute inset-0 rounded-[24px] overflow-hidden">
          <div
            className="absolute inset-[-70%] animate-[spin_8s_linear_infinite]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, #22d3ee, #0e6fa7, #22d3ee, transparent)",
            }}
          />
        </div> */}

        {/* MAIN CARD */}

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}

          className="
         w-[1055px]
         h-[596px]
        rounded-[22px]
        overflow-hidden
        bg-[#000927]/90
        shadow-[0_0_35px_rgba(0,119,255,0.12)]
        backdrop-blur-xl
        flex flex-col
      ">


        
        <div className="relative flex flex-col lg:flex-row flex-1">

          {/* ================= LEFT PANEL ================= */}
          <div className=" w-full lg:w-[35%] flex justify-center items-center px-8">
            <div className="w-[320px]">

            {/* LOGO */}
            <div className="mb-10 flex justify-start ">
              <img
                src={UnifiedSecureITsvg}
                alt="logo"
                className="w-[240px]"
              />
            </div>

            {/* TITLE */}
            <div className="mb-4 text-left">
              <h2 className="text-white text-[29px] font-semibold">
                Login
              </h2>
              {/* <p className="text-white/50 text-xs mt-1">
                Secure access to your dashboard
              </p> */}
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4 w-[320px]" autoComplete="off" >

              {/* EMAIL */}
              <div>
                <label className="text-white/70 text-sm font-medium mb-3 block" autoComplete="off">  Username </label>

                <div className="h-[44px] rounded-xl bg-[#020d2d] flex items-center px-3 transition-all duration-300
                  shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]
                  hover:shadow-[inset_0_0_0_1px_rgba(0,191,255,0.15)]
                   focus-within:border-cyan-400
                  focus-within:shadow-[0_0_0_1px_rgba(34,211,238,0.6),0_0_40px_rgba(34,211,238,0.25),0_0_24px_rgba(34,211,238,0.15)]"
                >
                  <FaUserAlt className="text-cyan-300 text-[12px]" />

                  <input type="text" name="username" value={formData.username} onChange={handleChange}
                    placeholder="username" className="flex-1 bg-transparent outline-none text-white text-sm pl-2" autoComplete="off" />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-white/70 text-sm font-medium mb-3 block"> Password </label>

                <div className="h-[44px] rounded-xl bg-[#020d2d] flex items-center px-3 transition-all duration-300
                  shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]
                  hover:shadow-[inset_0_0_0_1px_rgba(0,191,255,0.15)]
                   focus-within:border-cyan-400
                  focus-within:shadow-[0_0_0_1px_rgba(34,211,238,0.6),0_0_40px_rgba(34,211,238,0.25),0_0_24px_rgba(34,211,238,0.15)]" >
                  <FaLock className="text-cyan-300 text-[12px]" />

                  <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} 
                  placeholder="Password" className="flex-1 bg-transparent outline-none text-white text-sm pl-2" />

                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-cyan-300" >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* FORGOT PASSWORD */}
              <div className="text-right">
                <span className="text-xs text-cyan-300 hover:text-white cursor-pointer">
                  Forgot Password?
                </span>
              </div>

              {/* SUBMIT BUTTON */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="
                  relative w-full h-[44px]
                  rounded-xl bg-[#003465]
                  text-white font-semibold overflow-hidden
                "
              >
                <motion.span
                  className="absolute inset-0"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                    transform: "skewX(-20deg)",
                  }}
                />

                  <span className="relative z-10 text-[17px] font-semibold">
                    Sign In
                  </span>
              </motion.button>
            </form>
            </div>
          </div>



              {/* NEON DIVIDER LINE */}
          <div className="hidden lg:block absolute left-[35%] top-10 bottom-10 w-0.5 bg-white/3">
  
            {/* glow core */}
         <div className="w-full h-full bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-pulse" />

          {/* moving light sweep */}
          {/* <div className="absolute inset-0 overflow-hidden">
          <div className="w-full h-[80px] bg-gradient-to-b from-transparent via-cyan-300/80 to-transparent animate-[slide_2s_linear_infinite]" />
          </div> */}
        </div>

          {/* ================= RIGHT PANEL ================= */}
          <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden">

            <LoginNetwork
              className="absolute inset-0 w-full h-full network-component"
            />
            {/* <img src={LoginNetwork} alt="Login Network" /> */}

            <PacketLayer />

          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="h-[58px] w-full flex items-center justify-center bg-[#000b1f] border-t border-cyan-500/10">
        <img
        src={footerSvg}
        alt="footer"
        className="w-full h-full object-cover"
            />
        </div>
        

      </motion.div>
      </div>
    </div>
  );
};

export default Login;