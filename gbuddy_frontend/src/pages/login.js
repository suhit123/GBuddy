import React from "react";
import "../../css/login.css";
import logo from "../../images/giphy.gif";
import  axios  from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { GoogleLogin } from "@react-oauth/google";


const Loginpage = () => {
  const loginWithGoogle = () => {
    return (
      <GoogleLogin
        clientId="536934149483-dsjknitqmhp7bbsdmb8lhtc2j2kam8fg.apps.googleusercontent.com"
        onSuccess={responseMessage}
        onFailure={errorMessage}
        responseType="code"
        accessType="offline"
      />
    );
  };

  const waveBackground = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{ display: 'none' }}>
  <defs>
    <clipPath id="waveClip" clipPathUnits="objectBoundingBox">
      <path fill="none" d="M0,288L17.1,277.3C34.3,267,69,245,103,224C137.1,203,171,181,206,165.3C240,149,274,139,309,144C342.9,149,377,171,411,197.3C445.7,224,480,256,514,229.3C548.6,203,583,117,617,80C651.4,43,686,53,720,74.7C754.3,96,789,128,823,122.7C857.1,117,891,75,926,90.7C960,107,994,181,1029,181.3C1062.9,181,1097,107,1131,74.7C1165.7,43,1200,53,1234,90.7C1268.6,128,1303,192,1337,224C1371.4,256,1406,256,1423,256L1440,256L1440,0L1422.9,0C1405.7,0,1371,0,1337,0C1302.9,0,1269,0,1234,0C1200,0,1166,0,1131,0C1097.1,0,1063,0,1029,0C994.3,0,960,0,926,0C891.4,0,857,0,823,0C788.6,0,754,0,720,0C685.7,0,651,0,617,0C582.9,0,549,0,514,0C480,0,446,0,411,0C377.1,0,343,0,309,0C274.3,0,240,0,206,0C171.4,0,137,0,103,0C68.6,0,34,0,17,0L0,0Z"/>
    </clipPath>
  </defs>
</svg>


    )
  };

  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  const { useState } = React;

  const [inputs, setinputs] = useState({
    email: "",
    password: "",
  });

  const [warnemail, setwarnemail] = useState(false);
  const [warnpass, setwarnpass] = useState(false);
  const [danger, setdanger] = useState(true);
  const [dangerp, setdangerp] = useState(true);

  const [eye, seteye] = useState(true);
  const [pass, setpass] = useState("password");

  const inputEvent = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name == "email") {
      if (value.length > 0) {
        setdanger(true);
      }
    }

    if (name == "password") {
      if (value.length > 0) {
        setdangerp(true);
      }
    }

    setinputs((lastValue) => {
      return {
        ...lastValue,
        [name]: value,
      };
    });
  };


  const displayEye = () => {
    if (eye) {
      return <VisibilityOffIcon />;
    } else {
      return <VisibilityIcon />;
    }
  }


  const submitForm = (e) => {
    e.preventDefault();
    setwarnemail(false);
    setwarnpass(false);
    if (inputs.email.length < 1) {
      setdanger(false);
    }
    if (inputs.password.length < 1) {
      setdangerp(false);
    }

    if (inputs.email == "") {
      setwarnemail(true);
    } else if (inputs.password == "") {
      setwarnpass(true);
    } 
    else {
      axios.post("http://localhost:4001/user/login" , {"email": inputs.email , "password": inputs.password})
      .then((res)=>{
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        toast.success("Login Sucessfull", {
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          setTimeout(() => {
        window.location.href = "/dashboard";
        } , 1000);
      })
      .catch((err)=>{
        console.log("Error" , err?.message);
        toast.error("Invalid Credentials", {
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      })
    }
  };

  const Eye = () => {
    if (pass == "password") {
      setpass("text");
      seteye(false);
    } else {
      setpass("password");
      seteye(true);
    }
  };

  return (
    <>
      <div className="container1">
      <ToastContainer />
      <div className="landingPageBackgroundBlock">
            <div className="landingPageBackground"></div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="rgb(53, 186, 126)"
                fill-opacity="1"
                d="M0,288L17.1,277.3C34.3,267,69,245,103,224C137.1,203,171,181,206,165.3C240,149,274,139,309,144C342.9,149,377,171,411,197.3C445.7,224,480,256,514,229.3C548.6,203,583,117,617,80C651.4,43,686,53,720,74.7C754.3,96,789,128,823,122.7C857.1,117,891,75,926,90.7C960,107,994,181,1029,181.3C1062.9,181,1097,107,1131,74.7C1165.7,43,1200,53,1234,90.7C1268.6,128,1303,192,1337,224C1371.4,256,1406,256,1423,256L1440,256L1440,0L1422.9,0C1405.7,0,1371,0,1337,0C1302.9,0,1269,0,1234,0C1200,0,1166,0,1131,0C1097.1,0,1063,0,1029,0C994.3,0,960,0,926,0C891.4,0,857,0,823,0C788.6,0,754,0,720,0C685.7,0,651,0,617,0C582.9,0,549,0,514,0C480,0,446,0,411,0C377.1,0,343,0,309,0C274.3,0,240,0,206,0C171.4,0,137,0,103,0C68.6,0,34,0,17,0L0,0Z"
              ></path>
            </svg>
        </div>

        <div className="card1">
          <div className="form1">
            <div className="left-side1">
              <img src={logo} />
            </div>

            <div className="right-side1">
              <div className="register1">
                <p>
                  Not a member? <a href="/signup"> Register Now</a>
                </p>
              </div>

              <div className="hello1">
                <span style={{ color: "rgb(53, 186, 126)" }}>
                  <h1>GHELPER</h1>
                </span>
                <h4>Welcome back Gitamite</h4>
              </div>

              <form onSubmit={submitForm}>
                <div className="input_text1">
                  <input
                    className={` ${warnemail ? "warning1" : ""}`}
                    type="text"
                    placeholder="Enter Email"
                    name="email"
                    value={inputs.email}
                    onChange={inputEvent}
                  />
                  <p className={` ${danger ? "danger1" : ""}`}>
                    <i className="fa fa-warning1"></i>Please enter a valid email
                    address.
                  </p>
                </div>
                <div className="input_text1">
                  <input
                    className={` ${warnpass ? "warning1" : ""}`}
                    type={pass}
                    placeholder="Enter Password"
                    name="password"
                    value={inputs.password}
                    onChange={inputEvent}
                  />
                  <p className={` ${dangerp ? "danger1p" : ""}`}>
                    <i className="fa fa-warning1"></i>Password Required.
                  </p>
                  <i
                    onClick={Eye}
                    className={`fa ${eye ? "fa-eye-slash1" : "fa-eye1"}`}
                  >{displayEye()}</i>
                </div>

                
                <div className="recoverPassword recovery1">

                <a href="/recoverPassword">
                
                  <p>Forgot Password</p>
                
                </a>
                </div>
                <div className="btn1">
                  <button type="submit">Sign in</button>
                </div>
              </form>

              <hr />
              <div className="or1">
                <p>or signin with</p>
              </div>
              <div className="boxes1">
                <button>{loginWithGoogle()}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginpage;
