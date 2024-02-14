import React from 'react'
// import profileImg from '../images/profileImgChatbox.png';
import { useSelector } from 'react-redux';

// import styled from 'styled-components';
// import ProfileImgBot from '../images/download.jpg'



// const Message = ({ message,author,selectedUser }) => {
//   const isUserMessage = author === 'Shrey';
//   return (

//     // <MessageListContainer>
//     <div className={`msg-container ${isUserMessage ? 'user-message' : 'bot-message'}`}>

//       {!isUserMessage  && <img src={selectedUser?.profileImg  } alt="Profile" className="profile-img" /> }
//       <span className='message-text'>
//         <i>{author}</i>: &nbsp;{message}
//       </span>
//       {isUserMessage && <img src={profileImg} alt="Profile" className="profile-img" />}
//     </div>
//     //  </MessageListContainer> */
//   )
// }

const Message = () => {

  const activeUser = useSelector(state => state.activeUser);
  const activeGroup = useSelector(state => state.activeGroup);
  const user = useSelector(state => state.users.find(user => user.id === activeUser));
  const group = useSelector(state => state.groups.find(group => group.id === activeGroup));
  console.log("group id in Message file:", group)

  if ((!user || !user.messages) && (!group || !group.messages)) {
    return null;
  }


  return (

    <div className='message-container'>
      {activeUser && user.messages.map((message, index) => (
        <div
          key={index}
          className={`msg-container ${message.author === 'user' ? 'user-message' : 'bot-message'}`}
        >
          {message.author === 'bot' && <img src={user.profileImg} alt={user.name} className='profile-img' />}
          <span className='message-text'>
            {message.type === "Photo" && <img src={message.content} alt='uploded-image' className='uploded-image' />}
            {message.type === "text" && message.content}
            {message.type === "Video" && <video
              className='uploded-image'
              width="140px"
              src={message.content}
              controls/>
            }
          </span>
        </div>
      ))}

      {activeGroup && group.messages.map((message, index) => (
        <div
          key={index}
          className={`msg-container ${message.author === 'user' ? 'user-message' : 'bot-message'}`}
        >
          {message.author === 'bot' && <img src={user.profileImg} alt={user.name} className='profile-img' />}
          <span className='message-text'>
            {message.content}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Message;

// const mapStateToProps = (state) => {
//   // Assuming you have an activeUser in your state
//   const { activeUser } = state;
//   // Extracting messages of the active user
//   const messages = activeUser ? activeUser.messages : [];
//   return { messages };
// };

// export default connect(mapStateToProps)(Message);



// const MessageListContainer = styled.div`

// .msg-container {
//   display: flex;
//   align-items: center;
//   margin-bottom: 10px;
// }

// .message-text {
//   background-color: #DCF8C6; /* Default background color */
//   padding: 8px 12px;
//   border-radius: 10px;
//   max-width: 70%;
// }

// .profile-img {
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   margin-left: 10px;
// }

// .user-message {
//   justify-content: flex-end;
// }

// .bot-message {
//   justify-content: flex-start;
// }

// .user-message .message-text {
//   background-color: #DCF8C6; /* Adjust to your sent message color */
//   margin-left: auto; /* Push message to the right */
// }

// .bot-message .message-text {
//   background-color: #E5E5EA; /* Adjust to your received message color */
//   margin-right: auto; /* Push message to the left */
// }

// `