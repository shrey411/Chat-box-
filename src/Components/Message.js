import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteMessage } from "../actions";
import ReactionsPicker from "./ReactionsPicker";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Container, Menu, MenuItem } from "@mui/material";


const Message = () => {
  const [zoomedImage, setZoomedImage] = useState(null); // State variable to track zoomed image URL
  const [context, setContext] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [selectedMessageIdForReaction, setSelectedMessageIdForReaction] = useState(null);
  const [isHovered, setIsHovered] = useState(false)
  const [buttonClicked, setButtonClicked] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0, right: 0 });


  // reaction picker //
  const [showReactionPicker, setShowReactionPicker] = useState(false)
  const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });
  const [selectedEmoji, setSelectedEmoji] = useState({})


  // MUI //

  const [anchorEl, setAnchorEl] = useState(null);
  const [hover, setHover] = useState(false);

  const dispatch = useDispatch();

  const activeUser = useSelector((state) => state.activeUser);
  const activeGroup = useSelector((state) => state.activeGroup);
  const user = useSelector((state) =>
    state.users.find((user) => user.id === activeUser)
  );
  const group = useSelector((state) =>
    state.groups.find((group) => group.id === activeGroup)
  );
  const messages = useSelector((state) =>
    state.users.find((user) => user.messages)
  );

  console.log("group id in Message file:", group);
  console.log("user msg", messages.messages);



  if ((!user || !user.messages) && (!group || !group.messages)) {
    return null;
  }

  const handleImageClick = (imageUrl) => {
    setZoomedImage(imageUrl);
  };

  const handlerContext = (message, event) => {
    setIsHovered(true)
    setSelectedMessageId(message);
    const rect = event.target.getBoundingClientRect();
    const buttonLeft =
      message.author === "user" ? rect.left - 245 : rect.right - 265;

    setButtonPosition({
      top: rect.top + window.scrollY + event.target.offsetHeight - 95,
      left: buttonLeft + window.scrollX,
    });

  };

  console.log("before delete", selectedMessageId)


  const handleButtonClick = () => {
    setContext(!context);
    setButtonClicked(true);

  };

  const handlerMessageDelete = () => {
    if (selectedMessageId) {
      setAnchorEl(null);
      dispatch(deleteMessage(selectedMessageId));
      setSelectedMessageId(null);
      setContext(!context)
    }
  };
  console.log(selectedMessageId)


  // Reaction picker //

  const handleReaction = (message, event) => {
    setSelectedMessageIdForReaction(message);
    setShowReactionPicker(!showReactionPicker);
    const rect = event.target.getBoundingClientRect();

    setPickerPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX - 50,
    });


  };
  console.log("selected Emoji", selectedEmoji)

  // MUI //

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <div className="message-container">
      {activeUser &&
        user.messages.map((message, index) => (
          <div
            key={index}
            className={`msg-container ${message.author === "user" ? "user-message" : "bot-message"
              }`}
          >
            {message.author === "bot" && (
              <img
                src={user.profileImg}
                alt={user.name}
                className="profile-img"
              />
            )}
            <div style={{ position: "relative" }}>

              <span
                className="message-text"
                onDoubleClick={(event) => handleReaction(message, event)}
                onMouseEnter={(event) => handlerContext(message, event)}
            
              >
                {isHovered && selectedMessageId === message &&
                  <ArrowDown>
                    <span className={message.author === "user" ? "ArrowDown-user" : "ArrowDown-bot"}
                      onClick={handleClick}
                    >
                      <ArrowDropDownIcon />
                    </span>
                  </ArrowDown>
                }

                {message.type === "Photo" && (
                  <img
                    src={message.content}
                    alt="uploded-imag"
                    className="uploaded-image"
                    onClick={() => handleImageClick(message.content)} // Zoom in on image click
                  />
                )}
                {message.type === "text" && message.content}
                {message.type === "Video" && (
                  <video
                    // className='uploded-image'
                    width="240px"
                    height="140px"
                    src={message.content}
                    controls
                  />

                )}

                {/* display selected-emoji container */}
                {selectedEmoji[message.id] && (
                  <SelectedEmoji author={message.author}>
                    <span className="selected-emoji">{selectedEmoji[message.id]}</span>
                  </SelectedEmoji>
                )}
                {message.type === "Doc" && (
                  <iframe
                    title="Document Viewer"
                    src={`https://docs.google.com/gview?url=${message.content}&embedded=true`}
                    style={{ width: "240px", height: "140px" }}
                  ></iframe>
                )}
              </span>
              {showReactionPicker && selectedMessageIdForReaction.id === message.id && (
                <ReactionsPickerContainer className="reactions-picker" author={message.author}>
                  <ReactionsPicker
                    onReactionSelect={(reaction) => {
                      setSelectedEmoji(prevState => ({
                        ...prevState,
                        [selectedMessageIdForReaction.id]: reaction
                      }));
                      setShowReactionPicker(false);
                    }}
                  />
                </ReactionsPickerContainer>
              )}

              <Menu
                style={{
                  top: 10,
                  left: -30
                }}
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handlerMessageDelete}>Delete</MenuItem>
                <MenuItem onClick={handleClose}>Reply</MenuItem>
                <MenuItem onClick={handleClose}>Forward</MenuItem>
              </Menu>
            </div>
          </div>
        ))}

      {activeGroup &&
        group.messages.map((message, index) => (
          <div
            key={index}
            className={`msg-container ${message.author === "user" ? "user-message" : "bot-message"
              }`}
          >
            {message.author === "bot" && (
              <img
                src={user.profileImg}
                alt={user.name}
                className="profile-img"
              />
            )}
            <span className="message-text">
              {message.type === "Photo" && (
                <img
                  src={message.content}
                  alt="uploded-imag"
                  className="uploaded-image"
                  onClick={() => handleImageClick(message.content)} // Zoom in on image click
                />
              )}
              {message.type === "text" && message.content}
              {message.type === "Video" && (
                <video
                  // className='uploded-image'
                  width="240px"
                  height="140px"
                  src={message.content}
                  controls
                />
              )}

            </span>
          </div>
        ))}

      {/*  Zoom image  */}

      {zoomedImage && (
        <div className="zoom-overlay" onClick={() => setZoomedImage(null)}>
          {" "}
          {/* Click overlay to zoom out */}
          <img src={zoomedImage} alt="zoomed-imag" className="zoomed-image" />
        </div>
      )}
    </div>
  );
};

export default Message;


const ArrowDown = styled.div`
.ArrowDown-user{
  display:block;
width: 20px;
height: 15px;
position: sticky;
margin-top: -16px;
/* text-align: center; */
margin-left: -20px;
}

.ArrowDown-bot{
  display:block;
  width: 20px;
height: 15px;
position: sticky;
margin-top: -16px; 
margin-left: 105px;
}
`;

const ReactionsPickerContainer = styled.div`
  position: absolute;
  top: calc(100% + 4px); 
  ${(props) => props.author === "user" ? "right: 0%;" : "left: 2%;"} 
  transform: translateX(-5%); 

`;

const ContextCOntainer = styled.div`

  .context-for-message {
    background-color: rgba(255, 255, 255, 40%);
    width: 140px;
    height: 60px;
    cursor: pointer;
  }
  .context-to-delete:hover,
  .context-to-reply:hover {
    background-color: rgba(255, 255, 255, 40%);
  }
`;


const SelectedEmoji = styled.div`
  position: absolute;
  top: calc(70% ); 
  ${(props) => props.author === "user" ? "right: 45%;" : "left: 2%;"} 


.selected-emoji{
  position: absolute;
}
`
