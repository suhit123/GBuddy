import bg from "../images/background1.jpg";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/pngegg.png";
import WOW from 'wowjs';
import 'wowjs/css/libs/animate.css';
import { useContext, useEffect } from "react";
import hero from "../images/hero.png";
import Nav from "../components/Nav";
import { CartContext } from "../context/cartContext";

const LandingPage = () => {
    const {User,fetchUser} = useContext(CartContext);
    const navigator=useNavigate();  
    useEffect(() => {
        const wow = new WOW.WOW();
        wow.init();
        fetchUser();
    }, []);
    return (
        <>
        <Nav/>
        <div className="wow fadeUp" style={{ display: 'flex', height: '100vh', justifyContent: 'space-evenly', alignItems: 'center', width:"90vw",marginLeft:"auto",marginRight:"auto"}}>
            <div style={{ width: '50%', position: 'relative' }}>
                <img src={"https://cdni.iconscout.com/illustration/premium/thumb/boy-doing-homework-8372257-6676300.png?f=webp"} alt="Hero Image" style={{ width: '100%' }} />
            </div>
            <div style={{ width: '40%', zIndex: '0' }}>
                <div style={{ padding: '20px', borderRadius: '10px', zIndex: '10' }}>
                    <h1 style={{ fontSize: '40px', marginBottom: '10px' }}>Welcome to GITAM BUDDY</h1>
                    <p style={{ fontSize: '20px', marginBottom: '20px' }}>Your one stop solution for all your Struggles</p>
                    <p style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Let's Get started</p>
                    {User?
                    <div style={{ display: 'flex'}}>
                        <Link to="/resourceOptions" style={{ textDecoration: 'none', color: 'black', padding: '10px 50px', borderRadius: '5px', backgroundColor: 'black',color:'white', marginRight: '10px' }}>Resources</Link>
                        <Link to="/products" style={{ textDecoration: 'none', color: 'black', padding: '10px 20px', borderRadius: '5px', backgroundColor: 'white',border:"1px solid grey" }}>BUY</Link>
                    </div>
                    :<div style={{ display: 'flex'}}>
                        <Link to="/login" style={{ textDecoration: 'none', color: 'black', padding: '10px 50px', borderRadius: '5px', backgroundColor: 'black',color:'white', marginRight: '10px' }}>Login</Link>
                        <Link to="/signup" style={{ textDecoration: 'none', color: 'black', padding: '10px 20px', borderRadius: '5px', backgroundColor: 'white',border:"1px solid grey" }}>Sign Up</Link>
                    </div>
                    }
                </div>
            </div>
        </div>
        </>
    );
}

export default LandingPage;
