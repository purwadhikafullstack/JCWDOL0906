import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { Carousel } from "../components/carousel";
import { Category } from "../components/category";
import { Prescriptions } from "../components/prescription";
import FooterUserPage from "../components/footer";
import UserProductList from "./user/product/list";
export const HomePage = () => {

    return (
        <div>
            <Navbar />
            <div className="home-container">
                <Carousel />
                <Category />
                <Prescriptions />
                <Outlet />
                <UserProductList />
                <FooterUserPage />
            </div>
        </div>
    );
};
