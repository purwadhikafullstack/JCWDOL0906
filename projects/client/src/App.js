import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./pages/error";
import { HomePage } from "./pages/home";
import { LoginForm } from "../src/components/loginForm";
import { RegistrationForm } from "../src/components/registerForm";
import Verification from "./pages/verification";

import "./App.css";
import UserHome from "./pages/userHome";
import AdminDashboard from "./pages/admindashboard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />,
    },
    { path: "/login", element: <LoginForm /> },
    { path: "/register", element: <RegistrationForm /> },
    { path: "/verification/:token", element: <Verification /> },
    { path: "/userhome", element: <UserHome /> },
    { path: "/admindashboard", element: <AdminDashboard /> },

]);

function App() {
    return (
        <main>
            <RouterProvider router={router} />
        </main>
    );
}

export default App;
