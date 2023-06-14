import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { Heroes } from "../components/heroes";
// import SimpleSlider  from "../components/carousel";

export const HomePage = () => {
    return (
        <div>
            <Navbar />
            <div className="home-container">
                {/* <SimpleSlider/> */}
                <Heroes />
                <Outlet />
            </div>
        </div>
    );
};
