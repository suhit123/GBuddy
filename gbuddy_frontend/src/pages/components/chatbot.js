import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../../css/chatbot.css";
import chatbotimg from "../../images/chatbotimg.png";
import { GoogleGenerativeAI } from "@google/generative-ai";
import chatbotbg from "../../images/chatbotbg.avif";

const Chatbot = () => {
  const API_KEY = "AIzaSyBKanRkd-TIyY7CLZ9X2c_ZJMoMabLmOjg";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" , });

  const [userMessage, setUserMessage] = useState("");
  const chatboxRef = useRef(null);
  const [messages, setMessages] = useState([
    { content: "Hey Gitamite! How can I assist you today?", type: "incoming" }
  ]);
  const [curr, setCurr] = useState(1);

  const handleChat = async () => {
    const trimmedMessage = userMessage.trim();
    if (trimmedMessage === "") return;

    // Display user's message
    appendMessage({ content: trimmedMessage, type: "outgoing" });
    setUserMessage("");

    try {
      // Call Google Gemini API
      appendMessage({ content: "Typing...", type: "incoming" });
      const result = await model.generateContent(trimmedMessage);
      popMessage(); 
      const text = result?.response?.text(); 

      if (text) {

        appendMessage({ content: formatText(text), type: "incoming" });
      } else {
        throw new Error("No response from the AI model.");
      }

    } catch (error) {
      // Display error message
      appendMessage({
        content: "Oops! Something went wrong. Please try again!",
        type: "error"
      });
    }

    // Clear the input field
    
  };

  const appendMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const popMessage = () => {
    setMessages((prevMessages) => prevMessages.slice(0, -1));
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTo({
        top: chatboxRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  // Function to format the incoming message text
  const formatText = (text) => {
    // Replace **bold** with <strong>bold</strong>
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Replace *italic* with <em>italic</em>
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Replace newline characters with <br>
    text = text.replace(/\n/g, '<br>');
    // Return the JSX
    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

return (
    curr === 1 ? (
        <button onClick={() => setCurr(2)} className="chatbot-button">
            <img src={chatbotimg} alt="Chatbot" className="" />
        </button>
    ) : (
        curr === 2 && (
            <div className="chatBotContainer" >
                <div className="chatBot" style={{backgroundColor:'white'}}>
                    <header className="header1">
                        <div className="h2header">
                            <h2>G-Assist</h2>
                            <span style={{fontSize:"20px"}} alt="Close" id="cross" onClick={() => setCurr(1)}>
                                X
                            </span>
                        </div>
                    </header>
                    <ul className="chatbox" ref={chatboxRef}>
                        {messages.map((message, index) => (
                            <li key={index} className={`chat-${message.type} chat`}>
                                <p style={{fontSize:14}}>{message.content}</p>
                            </li>
                        ))}
                    </ul>
                    <div className="chat-input">
                        <textarea
                            rows={2}
                            placeholder="Ask Your Doubts...(GEMINI Integrated)"
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            color="white"
                        />
                        <button id="sendBTN" onClick={handleChat}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        )
    )
);
};

export default Chatbot;