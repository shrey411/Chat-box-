import React from 'react'
import Message from './Message'
import { useSelector } from 'react-redux';
import profilePic from '../images/profileImgChatbox.png'
import styled from 'styled-components';
import { FiSearch } from "react-icons/fi";
import { FaPhone } from "react-icons/fa6";
import { SlCamrecorder } from "react-icons/sl";



const MessageList = () => {
  const activeUser = useSelector(state => state.activeUser);
  const activeGroup = useSelector(state => state.activeGroup);
  console.log("active in messageList:", activeUser)
  console.log("active group in messageList:", activeGroup)
  const users = useSelector(state => state.users);
  const groups = useSelector(state => state.groups);

  let activeItem = null;

  if (activeUser) {
    activeItem = users.find(user => user.id === activeUser);
  } 
  else if(activeGroup){
    activeItem = groups.find(group => group.id === activeGroup);  
  }


  console.log("selected user in messageList:", activeItem)
  if (!activeItem) {
    return <div>No active user or group selected</div>;
  }
  return (
    <MessageListContainer>
      <section id='message-list'>
        <MessageListHeader>
          <div className='messageList-header'>
            <div className='header-1 p-3'>
              <img src={activeItem.profileImg || profilePic} alt='error' />
              <span className="ml-3">{activeItem.name || 'Default Name'}</span><br></br>
              <div className='group-member-name ml-5'>
              {activeGroup && activeItem.members.map((member)=>(
                <span >{member.name},</span>
              )) }
              </div>
            </div>
            <div className='header-2 p-3 mr-3'>
              <span><FiSearch /></span>
              <span><FaPhone /></span>
              <span><SlCamrecorder /></span>
            </div>
          </div>
          <ul className='message-list-scroll'>
            <Message activeUser={users} activeGroup={groups}/> {/* Pass activeUser as prop to Message component */}
          </ul>
        </MessageListHeader>
      </section>
    </MessageListContainer>

  )
}

export default MessageList;

const MessageListContainer = styled.section`
  height: calc(100vh - 100px); /* Adjust the height as per your layout */
  overflow-y: auto;
`;

const MessageListHeader = styled.section`
.messageList-header{
  background-color: rgba(39 ,52, 67);
  color: #fff;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1
}
.header-1 img{
  width: 30px; 
  height: 30px; 
  border-radius: 50%;
}
.header-1{
}
ul {
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}
.header-2 {
  gap:50px;
}
.header-2 span{
  padding:10px;
  margin: 0px 15px;
  text-align: center;
}
.header-2 span:hover{
  background-color: rgba(255, 255, 255, 0.1);

}
.group-member-name span{
  color: rgb(255 255 255 / 40%);
  font-size: 13px;

`