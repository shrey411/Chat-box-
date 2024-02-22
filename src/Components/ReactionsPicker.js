import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import styled from 'styled-components';
import { FiPlusCircle } from "react-icons/fi";



const ReactionsPicker = ({ onReactionSelect }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const defaultReactions = [
    { emoji: '😀', label: 'Happy' },
    { emoji: '😍', label: 'Love' },
    { emoji: '😲', label: 'Surprised' },
    { emoji: '😂', label: 'Laughing' },
    { emoji: '😢', label: 'Sad' },
    { emoji: '😡', label: 'Angry' },
  ];

  const handleReactionSelect = (reaction) => {
    onReactionSelect(reaction);
    setShowEmojiPicker(false); // Close emoji picker after selection
  };

  return (
    <>
    <ReactionPickerStyle>
    <div className="reactions-picker">
      {showEmojiPicker && (
        <div className="emoji-picker-container">
          <Picker
            onEmojiClick={(event, emojiObject) => handleReactionSelect(emojiObject.emoji)}
            disableAutoFocus={true}
            disableSearchBar={true}
            native
          />
        </div>
      )}
      {defaultReactions.map((reaction, index) => (
        <span
          key={index}
          className="reaction"
          onClick={() => handleReactionSelect(reaction.emoji)}
        >
          {reaction.emoji}
        </span>
      ))}
      <span
        className="reaction add-reaction"
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      >
        <FiPlusCircle />
      </span>
    </div>
    </ReactionPickerStyle>
    </>
  );
};

export default ReactionsPicker;


const ReactionPickerStyle = styled.div`
.reactions-picker {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 250px;
    height: 35px;
    background-color: rgba(39 ,52, 67);
    border-radius: 23px;
  }
  
  .reactions-picker .reaction {
    font-size: 20px;
    cursor: pointer;
  }
  
  .reactions-picker .reaction:hover {
    transform: scale(1.2);
  }
  
  .reactions-picker .add-reaction {
    font-size: 20px;
    cursor: pointer;
    color: White
  }
  
  .emoji-picker-container {
    position: absolute;
    bottom: 50px;
    right: 0;
    z-index: 1000;
  }
  `