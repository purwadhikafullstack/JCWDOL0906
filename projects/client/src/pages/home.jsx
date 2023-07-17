import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { Carousel } from "../components/carousel";
import { Category } from "../components/category";
import { Prescriptions } from "../components/prescription";
export const HomePage = () => {
    return (
        <div>
            <Navbar />
            <div className="home-container">
                <Carousel/>
                <Prescriptions/>
                <Category/>
                <Outlet />
            </div>
        </div>
    );
};
