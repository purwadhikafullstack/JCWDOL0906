import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { Carousel } from "../components/carousel";
import { Category } from "../components/category";
export const HomePage = () => {
    return (
        <div>
            <Navbar />
            <div className="home-container">
                <Carousel/>
                <Category/>
                <Outlet />
            </div>
        </div>
    );
};
