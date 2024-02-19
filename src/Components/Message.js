import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { deleteMessage } from '../actions';



const Message = () => {
  const [zoomedImage, setZoomedImage] = useState(null); // State variable to track zoomed image URL
  const[context,setContext] = useState(false)
  const [selectedMessageId,setSelectedMessageId] = useState(null)
  const [contextPosition, setContextPosition] = useState({ x: 0, y: 0 }); 


const dispatch = useDispatch();

  const activeUser = useSelector(state => state.activeUser);
  const activeGroup = useSelector(state => state.activeGroup);
  const user = useSelector(state => state.users.find(user => user.id === activeUser));
  const group = useSelector(state => state.groups.find(group => group.id === activeGroup));
  const messages = useSelector(state => state.users.find(user => user.messages));


  console.log("group id in Message file:", group)
  console.log("user msg",messages.messages)

  if ((!user || !user.messages) && (!group || !group.messages)) {
    return null;
  }

  const handleImageClick = (imageUrl) => {
    setZoomedImage(imageUrl); // Set the URL of the clicked image for zooming
  };

  const handlerContext= (messageId,event)=>{
    setContext(!context)
    setSelectedMessageId(messageId);
    setContextPosition({ x: event.clientX , y: event.clientY });
  }

  const handlerMessageDelete= () =>{
    if (selectedMessageId) {
      dispatch(deleteMessage(selectedMessageId)); // Dispatch the deleteMessage action
      setSelectedMessageId(null);
      setContext(false) 
  }
}
   
  return (

    <div className='message-container'>
      {activeUser && user.messages.map((message, index) => (
        <div
          key={index}
          className={`msg-container ${message.author === 'user' ? 'user-message' : 'bot-message'}` }
        >
          {message.author === 'bot' && <img src={user.profileImg} alt={user.name} className='profile-img' />}
          <span className='message-text' onClick={(event)=>handlerContext(message,event)}>
            {message.type === "Photo" && <img src={message.content} alt='uploded-imag'
              className='uploaded-image'
              onClick={() => handleImageClick(message.content)} // Zoom in on image click
            />}
            {message.type === "text" && message.content}
            {message.type === "Video" && <video
              // className='uploded-image'
              width="240px"
              height="140px"
              src={message.content}
              controls />
            }
            {message.type === "Doc" && <iframe
              title="Document Viewer"
             src={`https://docs.google.com/gview?url=${message.content}&embedded=true`}            
             style={{ width: '240px', height: '140px' }}
            ></iframe>}
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
          {message.type === "Photo" && <img src={message.content} alt='uploded-imag'
              className='uploaded-image'
              onClick={() => handleImageClick(message.content)} // Zoom in on image click
            />}
            {message.type === "text" && message.content}
            {message.type === "Video" && <video
              // className='uploded-image'
              width="240px"
              height="140px"
              src={message.content}
              controls />
            }          </span>
        </div>
      ))}
      {zoomedImage && (
        <div className="zoom-overlay" onClick={() => setZoomedImage(null)}> {/* Click overlay to zoom out */}
          <img src={zoomedImage} alt='zoomed-imag' className='zoomed-image' />
        </div>
      )}
      {context && (
        <ContextCOntainer>
        <div className='context-for-message' style={{ position:"absolute",top: contextPosition.y -20 , left: contextPosition.x -400}}>
          <div className='context-to-delete' onClick={handlerMessageDelete}>Delet Message</div>
        </div>
        </ContextCOntainer>
      )}
    </div>
  );
}

export default Message;


const ContextCOntainer = styled.div`
.context-for-message{
  background-color: rgba(255,255,255,40%);
  width:140px;
  height: 40px;
  cursor:pointer;
  
}
.context-to-delete:hover{
  background-color: rgba(255,255,255,40%);
}
`