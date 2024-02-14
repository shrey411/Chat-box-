// import { GrEmoji } from "react-icons/gr";
// import React, { useRef, useState } from 'react';
// import { connect } from 'react-redux';
// import { addMessage } from '../actions';
// import Picker from 'emoji-picker-react';


// const AddMessage = ({ dispatch }) => {
//     const [inputMessage, setInputMessage] = useState('');
//     const [showPicker, setShowPicker] = useState(false);
//     const inputRef = useRef(null);

//     const sendMessage = () => {
//         if (inputMessage.trim() !== '') {
//             dispatch(inputMessage, 'Shrey');
//             setInputMessage('');
//         }
//     };

//     const onEmojiClick = (event) => {
//         const sym = event.unified.split("-");
//         const codeArray = sym.map(ele => parseInt(ele, 16));
//         let emoji = String.fromCodePoint(...codeArray);
//         setInputMessage(prevInputMessage => prevInputMessage + emoji); 
//     };


//     const handleInputFocus = () => {
//         setShowPicker(false);
//     };


//     return (
//         <section id="new-message">
//             <div className="emoji-container">
//                 {showPicker &&
//                     <div className="picker-container">
//                         <Picker onEmojiClick={onEmojiClick} height={400} width={300} />
//                     </div>}
//                 <span onClick={() => setShowPicker(prevState => !prevState)}><GrEmoji className="emoji-icon" /></span>
//             </div>
//             <div className="input-container">
//                 <input
//                     type="text"
//                     onChange={e => setInputMessage(e.target.value)}
//                     value={inputMessage} // Append selected emoji to input value
//                     ref={inputRef}
//                     onFocus={handleInputFocus}
//                     placeholder="Type a message..."
//                 />
//             </div>
//             <div className="send-btn">
//                 <button onClick={sendMessage}>Send</button>
//             </div>
//         </section>
//     );
// };


// const mapDispatchToProps = dispatch => ({
//     dispatch: (message, author) => {
//         dispatch(addMessage(message, author));
//     },
// });

// export default connect(() => ({}), mapDispatchToProps)(AddMessage);


import { GrEmoji, GrAttachment } from "react-icons/gr";
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Picker from 'emoji-picker-react';
import { addMessage, addBotReply, addGroupMessage } from "../actions";
import { render } from "@testing-library/react";

const AddMessage = () => {
    const [inputMessage, setInputMessage] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const inputRef = useRef(null);
    const [showAttachmentOptions, setShowAttachmentOptions] = useState(false); // State to toggle attachment options

    const activeUser = useSelector(state => state.activeUser);
    const activeGroup = useSelector(state => state.activeGroup);
    // const users = useSelector(state=> state.users)
    const dispatch = useDispatch();

    const sendMessage = () => {
        if (inputMessage.trim() !== '') {
            console.log('Sending Message:', inputMessage);
            if (activeUser) {

                dispatch(addMessage(activeUser, inputMessage,"text"));
                const botReply = generateBotReply();
                dispatch(addBotReply(activeUser, botReply,"text"));

            } else if (activeGroup) {

                console.log("active group name:", activeGroup)
                dispatch(addGroupMessage('user', inputMessage));
            }
            setInputMessage('');
        }
    };


    const onEmojiClick = (event) => {
        const sym = event.unified.split("-");
        const codeArray = sym.map(ele => parseInt(ele, 16));
        let emoji = String.fromCodePoint(...codeArray);
        setInputMessage(prevInputMessage => prevInputMessage + emoji);
    };

    const handleInputFocus = () => {
        setShowPicker(false);
    };

    const generateBotReply = () => {
        const replies = [
            "Hello!",
            "How are you?",
            "Nice to meet you!",
            "What's up?",
            "I'm a bot!",
            "How can I assist you?"
            // Add more replies as needed
        ];
        const randomIndex = Math.floor(Math.random() * replies.length);
        return replies[randomIndex];
    };

    const handleAttachmentClick = () => {
        // Implement logic to handle attachment click (e.g., open file picker)
        setShowAttachmentOptions(prevState => !prevState); // Toggle attachment options
    };
    const handleOptionClick = (option) => {
        if (option === 'Add Photo' || option === 'Add Video' || option === 'Add Document') {
            // Trigger file input click
            document.getElementById('fileInput').click();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const dataURL = e.target.result;
                if (activeUser) {
                    dispatch(addMessage(activeUser, dataURL, 'Photo')); // You can pass 'photo', 'video', or 'document' based on the file type
                } else if (activeGroup) {
                    dispatch(addGroupMessage(activeGroup, dataURL, 'photo')); // You can pass 'photo', 'video', or 'document' based on the file type
                }
            };
            reader.readAsDataURL(file); 
        }
        };

    return (
        <section id="new-message">
            <div className="emoji-container">
                {showPicker &&
                    <div className="picker-container">
                        <Picker onEmojiClick={onEmojiClick} height={400} width={300} />
                    </div>}
                <span onClick={() => setShowPicker(prevState => !prevState)}><GrEmoji className="emoji-icon" /></span>
            </div>
            <div className="attachment-icon" onClick={handleAttachmentClick}>
                <div className="icon-box">
                    <span><GrAttachment className="emoji-icon" /></span>
                </div>
            </div>
            {showAttachmentOptions && (
                <div className="attachment-options-container">
                    <div className="attachment-option" onClick={() =>handleOptionClick("Add Photo")}>Add Photo</div>
                    <div className="attachment-option" onClick={() =>handleOptionClick("Add Video")}>Add Video</div>
                    <div className="attachment-option" onClick={() =>handleOptionClick("Add Document")}>Add Document</div>
                </div>
            )}
            <input id="fileInput" type="file" style={{ display: 'none' }} onChange={handleFileChange} />
            <div className="input-container">
                <input
                    type="text"
                    onChange={e => setInputMessage(e.target.value)}
                    value={inputMessage} // Append selected emoji to input value
                    ref={inputRef}
                    onFocus={handleInputFocus}
                    placeholder="Type a message..."
                />
            </div>
            <div className="send-btn">
                <button onClick={sendMessage}>Send</button>
            </div>
        </section>
    );
};


export default AddMessage;



