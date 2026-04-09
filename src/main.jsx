import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
//  import { ToastContainer } from "react-hot-toast";
ReactDOM.createRoot(document.getElementById("root")).render(

    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            
            <App />
            {/* <ToastContainer/> */}
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  
);

