import bg from "../images/background1.jpg";
import { Link } from "react-router-dom";
import logo from "../images/pngegg.png";
import WOW from 'wowjs';
import 'wowjs/css/libs/animate.css';
import { useEffect } from "react";
import NavBar from "./components/navbar";
import hero from "../images/hero.png";


const LandingPage = () => {
    useEffect(() => {
        const wow = new WOW.WOW();
        wow.init();
    }, []);

    return (
        <>
        <NavBar />
        <div className="wow fadeUp" style={{ display: 'flex', height: '100vh', backgroundImage: `url(${bg})`, backgroundSize: 'cover', justifyContent: 'space-evenly', alignItems: 'center'}}>
            <div style={{ width: '40%', position: 'relative' }}>
                <img src={hero} alt="Hero Image" style={{ width: '100%' }} />
            </div>
            <div style={{ width: '40%', textAlign: 'center', zIndex: '0' }}>
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px', zIndex: '10' }}>
                    <img src={logo} alt="Hero Image" style={{ width: '50%' }} />
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Welcome to G-Buddy</h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Your one stop solution for all your Struggles</p>
                    <p style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Let's Get started</p>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to="/signup" style={{ marginRight: '10px' }}>
                            <button className="btn btn-outline-light border-2 py-3 px-5 animated slideInRight" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>Login</button>
                        </Link>
                        <Link to="/signup">
                            <button className="btn btn-outline-light border-2 py-3 px-5 animated slideInRight" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px' }}>Sign Up</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default LandingPage;
