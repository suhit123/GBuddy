import "../css/profilePage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";    
import axios from "axios";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import NavBar from "./components/navbar";
import "../css/wallet.css";
import background from "../images/background1.jpg";

const ProfilePage = () => {
    const token = localStorage.getItem('token');
    const changePass = () => {
        window.location.href = "/";
    };
    const deleteAccount = () => {
        window.location.href = "/";
    };
    const editDetails = () => {
        window.location.href = "/additionaldetails";
    };
    const [data, setData] = useState({});
    useEffect(() => {
        if (!token) {
            window.location.href = "/";
        }
        axios.get(`http://localhost:4001/user/get?token=${token}`)
        .then((response) => {
            setData(response.data);
        })
        .catch((err) => {
            console.log(err?.message);
        });
    }, [token]);

    const additionalDetails = data;

    // Mock leaderboard data
    const leaderboardData = [
        { name: "John Doe", score: 500, rank: 1 },
        { name: "Jane Smith", score: 450, rank: 2 },
        { name: "Alice Johnson", score: 400, rank: 3 },
        { name : "Gowtham" , score : 300 , rank : 4},
        { name : "Sai" , score : 200 , rank : 5},
        { name : "Vishnu" , score : 100 , rank : 6},
        { name : "Ravi" , score : 50 , rank : 7},
        { name : "Sai" , score : 30 , rank : 8},
        { name : "Sai" , score : 20 , rank : 9},
        { name : "Sai" , score : 10 , rank : 10},
    ];

    // Mock assignments data
    const assignmentsData = [
        { name: "Assignment 1", dueDate: "2024-05-01" },
        { name: "Assignment 2", dueDate: "2024-05-10" },
        { name: "Assignment 3", dueDate: "2024-05-15"},
        { name: "Assignment 4", dueDate: "2024-05-20"},
        { name: "Assignment 5", dueDate: "2024-05-25"},
        { name: "Assignment 6", dueDate: "2024-05-30"},
        { name: "Assignment 7", dueDate: "2024-06-01"},
        { name: "Assignment 8", dueDate: "2024-06-10"},
        { name: "Assignment 9", dueDate: "2024-06-15"},
        { name: "Assignment 10", dueDate: "2024-06-20"},
    ];

    const savedItemsData = [
        { name: "Mid-paper 1 COA", dueDate: "2024-05-01" },
        { name: "Mid-Paper 2 CNN", dueDate: "2024-05-10" },
    ];

    return (
        <>
        <NavBar />
        <div style={{height:"50px"}}></div>
        <Box mt={4} px={3} sx={{backgroundImage:`url(${background})`}}>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={3}>
                    <Box className="profile-section" sx={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px', backgroundColor: '#f9f9f9' }}>
                        <Box textAlign="center">
                            <Typography variant="h5" gutterBottom>Profile</Typography>
                            <Box display="flex" justifyContent="center" mb={2}>
                                <img src="https://picsum.photos/150/150" alt="Profile Image" className="profile-image" style={{borderRadius:"50%", marginBottom:"10px"}}/>
                            </Box>
                            <Typography variant="h6" gutterBottom>{additionalDetails.displayname || "Display Name Not Added"}</Typography>
                            <Typography variant="body1" gutterBottom>{additionalDetails.email}</Typography>
                            <Typography variant="body1" gutterBottom>{additionalDetails.phone || "Phone Number Not Added"}</Typography>
                            <Box mt={2}>
                                <Button variant="outlined" color="primary" onClick={editDetails} style={{margin: "5px"}}>Edit Details</Button>
                                <Button variant="outlined" color="secondary" onClick={changePass} style={{margin: "5px"}}>Change Password</Button>
                                <Button variant="outlined" color="error" onClick={deleteAccount} style={{margin: "5px"}}>Delete Account</Button>
                            </Box>
                        </Box>
                    </Box>

                    <Box className="assignments-section" sx={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px', backgroundColor: '#f9f9f9', marginTop: '20px', maxHeight: '300px', overflowY: 'auto' }}>
                        <Typography variant="h5" gutterBottom className="green-text">Files Uploaded</Typography>
                        <Box mt={2} className="assignment-elements">
                            {assignmentsData.map((item, index) => (
                                <Box key={index} display="flex" justifyContent="space-between" alignItems="center" my={1}>
                                    <Typography variant="subtitle1">{item.name}</Typography>
                                    <Typography variant="subtitle1">{item.dueDate}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box className="wallet-section" sx={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px', backgroundColor: '#f9f9f9', margin: '10px' }}>
                        <Typography variant="h5" gutterBottom className="green-text">Wallet</Typography>
                        <hr/>
                        <Box mt={2} className="wallet-options">
                            <Button variant="contained" color="primary" className="wallet-button">Withdraw</Button>
                            <Button variant="contained" color="secondary" className="wallet-button">Add Money</Button>
                        </Box>
                        <Typography variant="h5" gutterBottom className="wallet-amount">Wallet Amount: ${data.walletAmount || 0}</Typography>
                    </Box>

                    <Box className="leaderboard-section" sx={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px', backgroundColor: '#f9f9f9', marginTop: '20px', maxHeight: '300px', overflowY: 'auto' }}>
                        <Typography variant="h5" gutterBottom className="green-text">Leaderboard</Typography>
                        <Box display="flex" justifyContent="space-between" mt={2}>
                            <Typography variant="subtitle1" gutterBottom>Your Rank: N/A</Typography>
                            <Typography variant="subtitle1" gutterBottom>Total Users: {leaderboardData.length}</Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Box className="leaderboard-elements">
                            {leaderboardData.map((item, index) => (
                                <Box key={index} display="flex" justifyContent="space-between" alignItems="center" my={1}>
                                    <Typography variant="subtitle1">{item.rank}</Typography>
                                    <Typography variant="subtitle1">{item.name}</Typography>
                                    <Typography variant="subtitle1">{item.score}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    
                    <Box className="saved-items-section" sx={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px', backgroundColor: '#f9f9f9', marginTop: '20px', maxHeight: '300px', overflowY: 'auto' }}>
                        <Typography variant="h5" gutterBottom className="green-text">Saved Items</Typography>
                        <Box mt={2} className="saved-items-elements">
                            {savedItemsData.map((item, index) => (
                                <Box key={index} display="flex" justifyContent="space-between" alignItems="center" my={1}>
                                    <Typography variant="subtitle1">{item.name}</Typography>
                                    <Typography variant="subtitle1">{item.dueDate}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        </>
    );
};

export default ProfilePage;
