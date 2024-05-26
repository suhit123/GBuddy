import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chatbot from "./components/chatbot";
import { CartContext } from "../context/cartContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const defaultTheme = createTheme({
  palette: {
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#000000",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#333333",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            color: "#000000",
          },
          "& .MuiInputBase-input": {
            color: "#000000",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#000000",
            },
            "&:hover fieldset": {
              borderColor: "#333333",
            },
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
        },
      },
    },
  },
});

const STEP = {
  SIGN_IN: 1,
  SIGN_UP: 2,
  OTP_VERIFICATION: 3,
};

export default function SignInSide() {
  const navigate = useNavigate();
  const { User,fetchUser } = React.useContext(CartContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
        fetchUser();
        navigate("/");
    }
  }, []);

  const [currentStep, setCurrentStep] = React.useState(STEP.SIGN_IN);
  const [inputs, setInputs] = React.useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
  });
  const [warnEmail, setWarnEmail] = React.useState(false);
  const [warnUser, setWarnUser] = React.useState(false);
  const [warnPass, setWarnPass] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const [otpVerified, setOtpVerified] = React.useState(false);
  const [GenOTP, setGenOTP] = React.useState("");

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentStep === STEP.SIGN_IN) {
      if (inputs.email === "") {
        setWarnEmail(true);
        toast.error("Enter Valid Email", {
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (inputs.password === "") {
        setWarnPass(true);
        toast.error("Enter Password", {
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (inputs.password.length < 6) {
        setWarnPass(true);
        toast.error("Password is too Short (Must be 6 chars).", {
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        try {
          const res = await axios
            .post("http://localhost:8080/user/login", {
              email: inputs.email,
              password: inputs.password,
            })
            .then((res) => {
              console.log("Login Success", res.data);
              localStorage.setItem("token", res.data.token);
              window.location.href = "/";
              toast.success("Login Success", {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            });
        } catch (error) {
          console.error("Login Failed", error.message);
          toast.error("Invalid Email or Password", {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    } else if (currentStep === STEP.SIGN_UP) {
      if (inputs.email === "") {
        setWarnEmail(true);
        toast.error("Enter Valid Email", {
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (inputs.name === "") {
        setWarnUser(true);
        toast.error("Name must not be Empty", {
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (inputs.password === "") {
        setWarnPass(true);
        toast.error("Enter Password", {
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (inputs.password.length < 6) {
        setWarnPass(true);
        toast.error("Password is too Short (Must be 6 chars).", {
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (inputs.password !== inputs.confirm_password) {
        setWarnPass(true);
        toast.error("Passwords do not match", {
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        const generatedOTP = Math.floor(
          100000 + Math.random() * 900000
        ).toString();
        console.log("OTP Generated Successfully", generatedOTP);
        setGenOTP(generatedOTP);
        try {
          const res = await axios.post("http://localhost:8080/user/sendOtp", {
            email: inputs.email,
            otp: generatedOTP,
            username: inputs.name,
          });
          console.log("OTP Sent to DB", res.data);
          setCurrentStep(STEP.OTP_VERIFICATION); // Move to OTP verification step
        } catch (error) {
          console.error("Error in sending OTP", error.message);
          toast.error("Invalid Email", {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    } else if (currentStep === STEP.OTP_VERIFICATION) {
      console.log(GenOTP + " === " + otp + " ? ");
      if (GenOTP === otp) {
        console.log("OTP Verified Successfully");
        setOtpVerified(true);
        toast.success("OTP Verified", {
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        axios
          .post("http://localhost:8080/user/post", {
            email: inputs.email,
            password: inputs.password,
            username: inputs.name,
            phone: inputs.phone,
          })
          .then((res) => {
            console.log("User Created Successfully", res.data);
          })
          .catch((error) => {
            console.error("Error in creating User", error.message);
          });
        window.location.href = "/";
      } else {
        console.log("Invalid OTP");
        setOtpVerified(false);
        toast.error("Incorrect OTP", {
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const toggleSignUp = () => {
    setCurrentStep(currentStep === STEP.SIGN_IN ? STEP.SIGN_UP : STEP.SIGN_IN);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer />
      <Grid
        container
        component="main"
        className="min-vh-100 d-flex justify-content-center align-items-center"
      >
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          container
          className="shadow-lg rounded"
          style={{ height: "80vh" }}
        >
          <Grid
            style={{
              backgroundImage: `url("https://t4.ftcdn.net/jpg/05/60/58/09/360_F_560580994_5h6MXbjyBpvNIj0fhPrQsXzI0P6x493e.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "10px",
              position: "relative",
            }}
            item
            xs={12}
            sm={6}
            component={Paper}
            elevation={6}
            className="d-flex flex-column align-items-center justify-content-center p-4 rounded-left"
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.7)", 
              }}
            ></div>
            <Typography
              color="white"
              component="h1"
              variant="h2"
              className="mb-3"
              style={{zIndex:10,fontSize:"30px"}}
            >
              {currentStep === STEP.SIGN_UP
                ? "Create Account"
                : "Welcome Back!"}
            </Typography>
            <Typography style={{zIndex:10}} color="white" variant="body2" className="mb-3">
              {currentStep === STEP.SIGN_UP
                ? "Please fill in your details to create an account"
                : "To keep connected with us please login with your personal info"}
            </Typography>
            <Button
              onClick={toggleSignUp}
              variant="contained"
              style={{ marginBottom: "20px" }}
            >
              {currentStep === STEP.SIGN_UP ? "Sign In" : "Sign Up"}
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            component={Paper}
            elevation={6}
            square
            className="rounded-right"
            style={{ padding: "20px" }}
          >
            <Box className="my-2 mx-4 d-flex flex-column align-items-center">
              <Avatar className="bg-secondary">
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                {currentStep === STEP.SIGN_UP ? "Create Account" : "Sign In"}
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                className="w-100 mt-1"
              >
                {currentStep === STEP.SIGN_IN && (
                  <>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      size="small"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      onChange={handleChange}
                      value={inputs.email}
                      error={warnEmail}
                      helperText={warnEmail && "Enter Valid Email"}
                    />
                    <TextField
                      margin="normal"
                      required
                      size="small"
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={handleChange}
                      value={inputs.password}
                      error={warnPass}
                      helperText={warnPass && "Enter Valid Password"}
                    />
                  </>
                )}
                {currentStep === STEP.SIGN_UP && (
                  <>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      size="small"
                      label="Name"
                      name="name"
                      autoComplete="name"
                      autoFocus
                      onChange={handleChange}
                      value={inputs.name}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      size="small"
                      name="email"
                      autoComplete="email"
                      onChange={handleChange}
                      value={inputs.email}
                      error={warnEmail}
                      helperText={warnEmail && "Enter Valid Email"}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      size="small"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={handleChange}
                      value={inputs.password}
                      error={warnPass}
                      helperText={warnPass && "Enter Valid Password"}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size="small"
                      name="confirm_password"
                      label="Confirm Password"
                      type="password"
                      id="confirm_password"
                      autoComplete="confirm-password"
                      onChange={handleChange}
                      value={inputs.confirm_password}
                      error={warnPass}
                      helperText={warnPass && "Passwords do not match"}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size="small"
                      name="phone"
                      label="Phone Number"
                      type="phone"
                      id="phone"
                      autoComplete="phone"
                      onChange={handleChange}
                      value={inputs.phone}
                    />
                  </>
                )}
                {currentStep === STEP.OTP_VERIFICATION && (
                  <>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size="small"
                      id="otp"
                      label="Enter OTP"
                      name="otp"
                      autoComplete="off"
                      autoFocus
                      onChange={(e) => setOtp(e.target.value)}
                      value={otp}
                    />
                    {!otpVerified && (
                      <Typography
                        variant="body2"
                        color="error"
                        style={{ marginTop: 10 }}
                      >
                        OTP not verified. Please enter the correct OTP.
                      </Typography>
                    )}
                  </>
                )}
                <hr className="w-100 my-4" />
                <Button type="submit" fullWidth variant="contained">
                  {currentStep === STEP.SIGN_IN
                    ? "Sign In"
                    : currentStep === STEP.SIGN_UP
                    ? "Sign Up"
                    : "Verify OTP"}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Chatbot />
    </ThemeProvider>
  );
}
