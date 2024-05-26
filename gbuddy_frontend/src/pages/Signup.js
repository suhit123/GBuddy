import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultTheme = createTheme();

const STEP = {
    SIGN_IN: 1,
    SIGN_UP: 2,
    OTP_VERIFICATION: 3,
};

export default function SignInSide() {
    const [currentStep, setCurrentStep] = React.useState(STEP.SIGN_IN);
    const [inputs, setInputs] = React.useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
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
                    const res = await axios.post('http://localhost:8080/user/login', { email: inputs.email, password: inputs.password })
                        .then((res) => {
                            console.log("Login Success", res.data);
                            localStorage.setItem('token', res.data.token);
                            window.location.href = "/home";
                            toast.success("Login Success", {
                                position: "top-right",
                                autoClose: 3500,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        })

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
                const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
                console.log("OTP Generated Successfully", generatedOTP);
                setGenOTP(generatedOTP);
                try {
                    const res = await axios.post('http://localhost:8080/user/sendOtp', { email: inputs.email, otp: generatedOTP, username: inputs.name });
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
                axios.post('http://localhost:8080/user/post', { email: inputs.email, password: inputs.password, username: inputs.name })
                    .then((res) => {
                        console.log("User Created Successfully", res.data);
                    })
                    .catch((error) => {
                        console.error("Error in creating User", error.message);
                    });
                window.location.href = "/home";
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
            <Grid container component="main" className="min-vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#90EE90" }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={8} container className="shadow-lg rounded" style={{ height: '80vh', width: '70vw', backgroundColor: '#fff' }}>
                    <Grid item xs={12} sm={4} md={6} className="d-flex flex-column align-items-center justify-content-center text-white p-4 rounded-left" style={{ backgroundColor: '#38A3A5' }}>
                        <Avatar className="bg-secondary mb-3" sx={{ height: "200px", width: "300px" }}>

                        </Avatar>
                        <Typography component="h1" variant="h3" className="fw-bold mb-3">
                            GITAM - BUDDY
                        </Typography>
                        <Avatar className="bg-secondary mb-3">
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography variant="h5" className="mb-3">
                            {currentStep === STEP.SIGN_UP ? "Create Account" : "Welcome Back!"}
                        </Typography>
                        <Typography variant="body1" className="mb-3">
                            {currentStep === STEP.SIGN_UP ? "Please fill in your details to create an account" : "To keep connected with us please login with your personal info"}
                        </Typography>
                        <Button onClick={toggleSignUp}>
                            <a
                                className="btn btn-outline-light  border-2 py-3 px-5 animated slideInRight"
                            >
                                {currentStep === STEP.SIGN_UP ? "Sign In" : "Sign Up"}
                            </a>

                        </Button>

                    </Grid>
                    <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square className="rounded-right" sx={{ justifyContent: "center" }}>
                        <Box className="my-5 mx-4 d-flex flex-column align-items-center">
                            <Avatar className="bg-secondary mb-4">
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="strong" sx={{ color: "#90EE90" }}>
                                {currentStep === STEP.SIGN_UP ? "Create Account" : "Sign In"}
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} className="w-100 mt-3">
                                {currentStep === STEP.SIGN_IN && (
                                    <>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
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
                                    </>
                                )}
                                {currentStep === STEP.OTP_VERIFICATION && (
                                    <>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="otp"
                                            label="Enter OTP"
                                            name="otp"
                                            autoComplete="off"
                                            autoFocus
                                            onChange={(e) => setOtp(e.target.value)}
                                            value={otp}
                                        />
                                        {!otpVerified && (
                                            <Typography variant="body2" color="error" style={{ marginTop: 10 }}>
                                                OTP not verified. Please enter the correct OTP.
                                            </Typography>
                                        )}
                                    </>
                                )}
                                <hr className="w-100 my-4" />
                                <Button
                                    type='submit'
                                >
                                    <a
                                        className="btn btn-outline-light border-1 py-3 px-5 animated slideInRight" style={{ backgroundColor: "#38A3A5" }}
                                    >
                                        {currentStep === STEP.SIGN_IN ? "Sign In" : currentStep === STEP.SIGN_UP ? "Sign Up" : "Verify OTP"}
                                    </a>

                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}