import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteMessage } from "../actions";
import ReactionsPicker from "./ReactionsPicker";

const Message = () => {
  const [zoomedImage, setZoomedImage] = useState(null); // State variable to track zoomed image URL
  const [context, setContext] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [isHovered, setIsHovered] = useState(false)
  const [buttonClicked, setButtonClicked] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0, right: 0 });


  // reaction picker //
  const [showReactionPicker, setShowReactionPicker] = useState(false)
  const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });
  const [selectedEmoji, setSelectedEmoji] = useState({})


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

  const handleButtonClick = () => {
    setContext(!context);
    setButtonClicked(true);

  };

  const handlerMessageDelete = () => {
    if (selectedMessageId) {
      dispatch(deleteMessage(selectedMessageId));
      setSelectedMessageId(null);
      setContext(!context)
    }
  };
  console.log(selectedMessageId)


  // Reaction picker //

  const handleReaction = (message, event) => {
    setSelectedMessageId(message);
    setShowReactionPicker(!showReactionPicker);
    const rect = event.target.getBoundingClientRect();

    setPickerPosition({
      top: rect.top + window.scrollY ,
      left: rect.left + window.scrollX - 50,
    });


  };
  console.log("selectedMessage",selectedMessageId )
  console.log("selected Emoji",selectedEmoji)


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
            <span
              className="message-text"
              onDoubleClick={(event) => handleReaction(message, event)}
              onMouseEnter={(event) => handlerContext(message, event)}
              onMouseLeave={() => {
                if (buttonClicked) {
                  setIsHovered(true)
                }
                else {
                  setIsHovered(false)
                }
                // if (selectedMessageId !== message) {
                //   setSelectedMessageId(null);
                // }

              }}            >
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
              {selectedMessageId === message && isHovered && (
                <ButtonContainer style={{ top: buttonPosition.top, left: buttonPosition.left }}
                >
                  <sapn onClick={handleButtonClick}>▼</sapn>
                </ButtonContainer>
              )}

              {/* display selected-emoji container */}
              {selectedEmoji[message.id] && (
                <SelectedEmoji style={{ top: pickerPosition.top , left: pickerPosition.left  }}>
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

      {/*  Context-Menu */}


      {context && (
        <ContextCOntainer
        >
          <div className="context-for-message" style={{
            position: "absolute", top: buttonPosition.top,
            left: buttonPosition.left + 20,
          }}>
            <div className="context-to-delete" onClick={handlerMessageDelete}>
              Delete Message
            </div>
          </div>
        </ContextCOntainer>
      )}


      {/* Reaction-picker */}

      {showReactionPicker && (
        <ReactionsPicker
          position={pickerPosition}
          onReactionSelect={(reaction) => {
            console.log(selectedEmoji)
            setSelectedEmoji(prevState => ({
              ...prevState,
              [selectedMessageId.id]: reaction
            }));
            setShowReactionPicker(false);  
          }} />
      )}


    </div>
  );
};

export default Message;


const ButtonContainer = styled.div`
position: absolute;

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


const SelectedEmoji = styled.span`
.selected-emoji{
  position: absolute;

}
`