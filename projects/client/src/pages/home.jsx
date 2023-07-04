import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar";
// import { Heroes } from "../components/heroes";
import { Carousel } from "../components/carousel";
import { Category } from "../components/category";
// import { Footer } from "../components/footer";
export const HomePage = () => {
    return (
        <div>
            <Navbar />
            <div className="home-container">
                <Carousel/>
                <Category/>
                <Outlet />
            </div>
            {/* <Footer/> */}
        </div>
    );
};
