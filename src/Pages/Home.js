import React from "react";
import Navbar from "../Components/Navbar";
import styled from "styled-components";
import AddMessage from "../Components/AddMessage";
import MessageList from "../Components/MessageList";
import Sidebar from "../Components/Sidebar";
// import { useState } from "react";

const Home = () => {


  return (
    <>
      <Navbar />
      <HomePage>
        <section className="container-fluid main-section W-100">
          <section className="sub-1">
            <Sidebar />
          </section>
          <section className="sub-2">
            <MessageList />
            <AddMessage />
          </section>
        </section>
      </HomePage>
    </>
  );
};

export default Home;

const HomePage = styled.section`

    .container-fluid {
        display: flex;
        height: 100vh;

      }
    
      .main-section {
        flex: 1;
        display: flex;
        padding:0px;
        overflow-x: none;
      }
    
      .sub-1 {
        width: 250px; /* Set the width for the sidebar */
        border-right: 2px solid black;
        background-color: rgba(39 ,52, 67);
        position: relative;
        margin-top: 50px;

    }
    
    .sub-2 {
        flex: 1;
        display: flex;
        flex-direction: column;
        position: relative;
        margin-top: 50px;
        background-color: rgba(39 ,52, 67,.8);
    }
      #new-message{
        position: fixed;
        bottom: 0;
        width: 100%;
        padding: 5px;
        margin-left: 0px;
        border-top: 1px solid #3f3f3f;
        display: flex;
        align-items: center;
        justify-content: spce-between; 
        background-color: #273443 ;

      }
      .profile-img {
             width: 30px; 
             height: 30px; 
             border-radius: 50%;
             float: right; 
             margin-right: 20px; 
           }
           .msg-container {
            display: flex;
            align-items: center;
            justify-content: flex-end; 
          }
        
          .message-text {
            background-color: #dcf8c6; 
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 5px; 
            margin-top: 10px; 
            max-width: 70%;
            margin-right: 20px; 
          }
         #messages-list {
             padding: 5px 0 0 5px;
         }
    
         .emoji-container {
            display: flex;
            align-items: center;
            padding: 10px; 
            margin: 1px;
        }
        .emoji-container:hover,
        .attachment-icon:hover{
          background-color: rgb(127 128 127 / 44%);        
      }
      
        .icon-box{
           padding: 10px; 
        }
        .picker-container{
            position: absolute;
            bottom: 100%;
        }
        .input-container{
            margin-left: 20px;
        }
        .input-container input {
            flex: 1; 
            padding: 10px; 
            margin-right: 10px; 
            border: none;
            color: #fff;
            border-radius: 10px; 
            width:68vw;
            background-color: rgb(127 128 127 / 44%);
        }
    
        .send-btn button {
            background-color: #128C7E; 
            margin-left:10px 
            color: white;
            border: none;
            border-radius: 10%; 
            padding: 10px;
            cursor: pointer;
            transition: background-color 0.3s ease; 
        }
    
        .send-btn button:hover {
            background-color: #0D6E5A; 
        }
    
        .emoji-icon {
            font-size: 24px; 
            color: #fff;
        }
    // message.js //

.msg-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .message-text {
    background-color: #DCF8C6; /* Default background color */
    padding: 8px 15px;
    border-radius: 5px;
    max-width: 100%;
    display:flex;
    flex-direction: column;
  }
  
  .profile-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 10px;
  }
  .uploaded-image{
    width: 140px;
    height: 140px;
    allowfullscreen: ;
    loading: lazy;
  }
  .zoom-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8); /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; 
    cursor: pointer; 
  }
  
  .zoomed-image {
    max-width: 90%; /* Adjust as needed */
    max-height: 90%; /* Adjust as needed */
  }
  .user-message {
    justify-content: flex-end;
  }
  
  .bot-message {
    justify-content: flex-start;
  }
  
  .user-message .message-text {
    background-color: #DCF8C6; /* Adjust to your sent message color */
    margin-left: auto; /* Push message to the right */
  }
  
  .bot-message .message-text {
    background-color: #E5E5EA; /* Adjust to your received message color */
    margin-right: auto; /* Push message to the left */
  }
  .arrow-right {
    position: absolute;
    top: 50%;
    right: -10px; /* Adjust the distance of the arrow from the message */
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 10px solid #DCF8C6; /* Match the message background color */
    transform: translateY(-50%);
  }

// attachment option in addMessage //

  .attachment-options-container {
    position: absolute;
    bottom: 60px; 
    left: 50px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 15px 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 10; 
}

.attachment-option {
  cursor: pointer;
  padding: 5px;
}

.attachment-option:hover {
  background-color: rgba(0,0,0,.2); 
}

  
`;
