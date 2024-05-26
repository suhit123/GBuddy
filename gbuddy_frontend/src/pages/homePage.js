import React from "react";
import NavBar from "./components/navbar";
import Box from "./components/box";
import bg from "../images/background.jpg";
import image1 from "../images/hero.png";
import image2 from "../images/background.jpg";
import image3 from "../images/chatbot_bg.jpg";

const HomePage = () => {
    return (
        <>
            <div
                style={{
                    backgroundImage: `url(${bg})`,
                    height: "100vh",
                    width: "100vw",
                    opacity: 0.8,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px",
                    color: "rgb(53, 186, 126)",
                }}
            >
                <NavBar />

                <h1>Welcome to G-Buddy!</h1>
                <p>
                    G-Buddy is a platform that allows you to buy and sell items, access
                    educational resources, and explore roadmaps for various subjects.
                </p>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignContent: "center",
                        marginTop: "100px",
                        width: "100%",
                    }}
                >
                    <Box
                        title="Buy & Sell"
                        image={image1}
                        text={"Buy the things you want & Sell the things you don't."}
                        path={"products"}
                    />
                    <Box
                        title="Resources"
                        image={image2}
                        text={"Get notes on your desired subject."}
                        path="resources"
                    />
                    <Box
                        title="Roadmaps"
                        image={image3}
                        text={"Explore roadmaps for various subjects."}
                        path={"roadmaps"}
                    />
                </div>
            </div>
        </>
    );
};

export default HomePage;
