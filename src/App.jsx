import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import "primereact/resources/themes/lara-dark-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function App() {
  return (
    <AuthProvider>
      
      <AppRoutes />
         <ToastContainer position="top-right" />


    </AuthProvider>
  );
}
