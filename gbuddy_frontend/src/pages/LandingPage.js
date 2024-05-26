import bg from "../images/Home.png";
import { Link } from "react-router-dom";
import hero from "../images/pngegg.png";
import WOW from 'wowjs';
import 'wowjs/css/libs/animate.css';
import { useEffect } from "react";
import NavBar from "./components/navbar";

const LandingPage = () => {
    useEffect(() => {
        const wow = new WOW.WOW();
        wow.init();
    }, []);

    return (
        <>
        <NavBar />
        </>
    );
}

export default LandingPage;
