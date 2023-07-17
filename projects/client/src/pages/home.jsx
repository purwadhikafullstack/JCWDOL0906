import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { Carousel } from "../components/carousel";
import { Category } from "../components/category";
import { Prescriptions } from "../components/prescription";
import FooterUserPage from "../components/footer";

export const HomePage = () => {
    return (
        <div>
            <Navbar />
            <div className="home-container">
                <Carousel/>
                <Prescriptions/>
                <Category/>
                <Outlet />
                <FooterUserPage/>
            </div>
        </div>
    );
};
