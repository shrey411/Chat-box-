export const SET_ACTIVE_USER = 'SET_ACTIVE_USER';
export const SET_ACTIVE_GROUP = 'SET_ACTIVE_GROUP';

export const ADD_USER_MESSAGE = 'ADD_USER_MESSAGE';
export const ADD_BOT_REPLY = 'ADD_BOT_REPLY';
export const CREATE_GROUP = 'CREATE_GROUP';
export const ADD_GROUP_MESSAGE = 'ADD_GROUP_MESSAGE'; // New action type for adding group messages

export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const REPLY_TO_MESSAGE = 'REPLY_TO_MESSAGE';


export const setActiveUser = (user) => ({
  type: SET_ACTIVE_USER,
  payload: user,
});

export const addMessage = (userId, message , messageType ) => ({
  type: ADD_USER_MESSAGE,
  payload: { userId, message,messageType },
});

export const addBotReply = (userId, message , messageType) => ({
  type: ADD_BOT_REPLY,
  payload: {
    userId,
    message,
    messageType
  },
});

export const addGroupMessage = (author, message , messageType) => ({
  type: ADD_GROUP_MESSAGE,
  payload: { author, message,messageType },
});


export const createGroup = (groupData) => ({
  type: CREATE_GROUP,
  payload: groupData
});

export const setActiveGroup = (group) => ({
  type: SET_ACTIVE_GROUP,
  payload: group,
});

export const deleteMessage = (messageId) => ({
  type: DELETE_MESSAGE,
  payload: { messageId }
});

export const replyToMessage = (author, message) =>({
  type: REPLY_TO_MESSAGE,
  payload: {author , message}
})