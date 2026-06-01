import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  FaUserAlt,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";


const ROLE_DEFAULT_ROUTE = {
  admin: "/projectspage",
  developer: "/projects",
  tester: "/instances",
};

import { motion } from "framer-motion";

import backSvg from "../assets/loginbg.svg";
import footerSvg from "../assets/LoginFooter.svg";
// import monitorpng from "../assets/monitorFrame.svg";
// import server2png from "../assets/twoserver.png";
// import server1png from "../assets/singleser.png";
// import serverpng from "../assets/server.png";
// import networkpng from "../assets/networkFrame.png";
// import basepng from "../assets/base.png";
// import shieldFramepng from "../assets/shieldFrame.png";
import computerServerFramepng from "../assets/computerServerFrame.svg";
// import SecureITLogo from "../assets/SecureITLogo.svg";
import SecureITLogo from "../assets/UnifiedSecureITLogo.svg";


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


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

  // console.log("backSvg:", backSvg);
  return (
    <div
      className="
        min-h-screen
        w-full
        flex
        items-center
        justify-center
        bg-cover
        bg-center
        px-4
        py-4
        overflow-hidden
      " 
       style={{
    background:
      "radial-gradient(circle at center, #0D3C7A 0%, #00061A 85%)",
  }}
    >
      
      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          w-full
          max-w-[980px]
          rounded-[22px]
          overflow-hidden
          bg-[#000927]/90
          shadow-[0_0_35px_rgba(0,119,255,0.12)]
          backdrop-blur-xl
        "
      >
        <div className="flex flex-col lg:flex-row">

          {/* LEFT PANEL */}
          <div className="w-full lg:w-[40%] px-6 md:px-8 py-10 flex flex-col justify-center">

            {/* LOGO */}
            <div className="mb-8 text-center">
              {/* <h1 className="text-[42px] font-bold text-[#ff3131]">
                SecureIT <span className="text-white text-sm">®</span>
              </h1>
              <p className="text-white text-xs tracking-[2px] mt-2">
                Patch Management
              </p> */}

              <img src={SecureITLogo} alt="Logo" className="w-[250px] h-auto  mx-auto object-contain"/>
            </div>

            {/* TITLE */}
            <h2 className="text-white text-[30px] font-semibold mb-6"> Login </h2>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* EMAIL */}
              <div>
                <label className="text-white/75 text-sm mb-1 block">
                  username
                </label>

                <div className="h-[46px] rounded-2xl bg-white/[0.02] flex items-center px-4">
                  <FaUserAlt className="text-cyan-300 text-[13px]" />

                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="username"
                    className="flex-1 bg-transparent outline-none text-white text-sm pl-3"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-white/75 text-sm mb-1 block">
                  Password
                </label>

                <div className="h-[46px] rounded-2xl bg-white/[0.02] flex items-center px-4">
                  <FaLock className="text-cyan-300 text-[13px]" />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="flex-1 bg-transparent outline-none text-white text-sm pl-3"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-cyan-300"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* FORGOT */}
              <div className="text-white/60 text-sm hover:text-white cursor-pointer">
                Forgot Password?
              </div>

              {/* BUTTON */}
              <motion.button
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full h-[44px] rounded-2xl bg-[#003465] text-white font-semibold"
              >
                Sign In
              </motion.button>

            </form>
          </div>

          {/* RIGHT PANEL */}
          <div className="
            hidden lg:flex
            w-[60%]
            items-center
            justify-center
            relative
            overflow-hidden
            px-10
          ">

            {/* BASE IMAGE */}
            <img
              src={computerServerFramepng}
              alt="server ecosystem"
              className="w-[700px] max-w-full object-contain"
            />

            {/* OVERLAY COMPONENTS */}
            <div className="absolute inset-0">


              {/* <img src={shieldFramepng} className="absolute bottom-[30%] right-[10%] w-[130px]" alt="" />
              <img src={serverpng} className="absolute top-[45%] left-[42%] w-[110px]" alt="" /> */}
              {/* <img src={networkpng} className="absolute top-[55%] left-[10%] w-[120px]" alt="" /> */}
              {/* <img src={serverpng} className="absolute bottom-[12%] right-[18%] w-[110px]" alt="" />
              <img src={monitorpng} className="absolute bottom-[30%] left-[13%] w-[150px]" alt="" />
               <img src={shieldFramepng} className="absolute bottom-[35%] left-[28%] w-[120px]" alt="" /> */}

            </div>

          </div>
        </div>

        {/* FOOTER */}
        <div className="h-[58px] w-full flex items-center justify-center bg-[#000927]">
          <img
            src={footerSvg}
            alt="footer"
            className="w-full h-full object-contain"
          />
        </div>

      </motion.div>
    </div>
  )
}

export default Login
