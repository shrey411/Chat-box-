
import { SET_ACTIVE_USER, ADD_USER_MESSAGE, ADD_BOT_REPLY,SET_ACTIVE_GROUP,CREATE_GROUP,ADD_GROUP_MESSAGE } from '../actions/index.js';
import { avatar1, avatar2, profileImg,GroupImg } from '../image/image';
import { v4 as uuidv4 } from 'uuid';


const initialState = {
  users: [
    { id: 1, name: "Harsh", profileImg: avatar1, messages: [] },
    { id: 2, name: "Jaydeep", profileImg: avatar2, messages: [] },
    { id: 3, name: "Dhyan", profileImg: profileImg, messages: [] },
    { id: 4, name: "Raj", profileImg: profileImg, messages: [] },
  ],
  activeUser: null,
  groups: [] ,
  activeGroup: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_USER:
      // const { message, author, userId } = action.payload;
      return {
        ...state,
        activeUser: action.payload,
      };
      case SET_ACTIVE_GROUP:
      return {
        ...state,
        activeGroup: action.payload,
      };
    case ADD_USER_MESSAGE:
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.userId
            ? { ...user, messages: [...user.messages, { author: 'user', content: action.payload.message }] }
            : user
        ),
      };
    case ADD_BOT_REPLY:
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.userId
            ? { ...user, messages: [...user.messages, { author: 'bot', content: action.payload.message }] }
            : user
        ),
      };
      case CREATE_GROUP:
        const { groupName, selectedUsers } = action.payload;
        console.log("Action:",action)
        console.log("Action:",selectedUsers)
        const newGroup = {
          id: uuidv4(),
          name: groupName,
          profileImg:GroupImg,
          members: selectedUsers.map(userId => {
            const user = state.users.find(user => user.id === userId.id);
            return user ? { id: user.id, name: user.name, profileImg: user.profileImg } : null;
          }).filter(user => user !== null) ,
          messages: [] 
        };

        console.log(`Group "${groupName}" created with members:`, newGroup);

        return {
          ...state,
          groups: [...state.groups, newGroup],
        };

        case ADD_GROUP_MESSAGE: // Handle adding group messages
        console.log("action:",action)

        const updatedGroups = state.groups.map((group) =>
        group.id === state.activeGroup
            ? {
                ...group,
                messages: [
                    ...group.messages,
                    { author: action.payload.author, content: action.payload.message },
                ],
            }
            : group
    );

    console.log('Updated Groups:', updatedGroups); // Log the updated groups to console
    return {
        ...state,
        groups: updatedGroups,
    };

    default:
      return state;
  }
};


export default reducer;
