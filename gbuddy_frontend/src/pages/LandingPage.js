import bg from "../images/Home.png";
import { Link } from "react-router-dom";
import hero from "../images/pngegg.png";
import WOW from 'wowjs';
import 'wowjs/css/libs/animate.css';
import { useEffect } from "react";

const LandingPage = () => {
    useEffect(() => {
        const wow = new WOW.WOW();
        wow.init();
    }, []);
    return (
        <div className= "wow fadeUp"  style={{display: 'flex', height: '100vh' , backgroundImage: `url(${bg})`, backgroundSize: 'cover', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{ width: '40%' }}>

            </div>
            <div style={{ width: '40%' }}>
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
                    <h1>Welcome to G-Buddy</h1>
                    <p>Your one stop solution for all your competitive programming needs</p>
                    <p>Get started by clicking on the Roadmaps tab</p>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Link to="/login" style={{ marginRight: '10px' }}>
                            <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>Login</button>
                        </Link>
                        <Link to="/signup">
                            <button style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px' }}>Sign Up</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
