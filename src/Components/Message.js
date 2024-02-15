import React, { useState } from 'react'
import { useSelector } from 'react-redux';



const Message = () => {
  const [zoomedImage, setZoomedImage] = useState(null); // State variable to track zoomed image URL


  const activeUser = useSelector(state => state.activeUser);
  const activeGroup = useSelector(state => state.activeGroup);
  const user = useSelector(state => state.users.find(user => user.id === activeUser));
  const group = useSelector(state => state.groups.find(group => group.id === activeGroup));
  console.log("group id in Message file:", group)

  if ((!user || !user.messages) && (!group || !group.messages)) {
    return null;
  }

  const handleImageClick = (imageUrl) => {
    setZoomedImage(imageUrl); // Set the URL of the clicked image for zooming
  };
  

  return (

    <div className='message-container'>
      {activeUser && user.messages.map((message, index) => (
        <div
          key={index}
          className={`msg-container ${message.author === 'user' ? 'user-message' : 'bot-message'}`}
        >
          {message.author === 'bot' && <img src={user.profileImg} alt={user.name} className='profile-img' />}
          <span className='message-text'>
            {message.type === "Photo" && <img src={message.content} alt='uploded-imag' 
            className='uploaded-image'
            onClick={() => handleImageClick(message.content)} // Zoom in on image click
          />}
            {message.type === "text" && message.content}
            {message.type === "Video" && <video
              // className='uploded-image'
              width="240px"
              height = "140px"
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
      {zoomedImage && (
        <div className="zoom-overlay" onClick={() => setZoomedImage(null)}> {/* Click overlay to zoom out */}
          <img src={zoomedImage} alt='zoomed-imag' className='zoomed-image' />
        </div>
      )}
    </div>
  );
};

export default Message;


