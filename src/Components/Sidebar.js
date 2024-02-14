
import React, { useState } from 'react';
import styled from 'styled-components';
import { SlNote } from "react-icons/sl";
import { IoReorderFourOutline } from "react-icons/io5";
// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGroup, setActiveGroup, setActiveUser } from '../actions/index';



const Sidebar = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [groupName, setGroupName] = useState('');

    const [selectedUsers, setSelectedUsers] = useState([]);


    const users = useSelector(state => state.users);
    const groups = useSelector(state => state.groups);

    const dispatch = useDispatch();

    const handleUserClick = (users) => {
        dispatch(setActiveUser(users));
        console.log("selected user", users)
        dispatch(setActiveGroup(null));
    };
    const handleGroupClick = (groupId) => {
        dispatch(setActiveGroup(groupId)); // Dispatch action to set active group
        console.log("active group: ",groupId)
        dispatch(setActiveUser(null));
    };


    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredUsersDropdown = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const handleCreateGroup = () => {
        const groupData = {
            groupName,
            selectedUsers
        };
        dispatch(createGroup(groupData));
        setGroupName('');
        setSelectedUsers([]);
    };
    // const getLastMessage = (user) => {
    //     if (user.messages.length > 0) {
    //         const lastMessage = user.messages[user.messages.length - 1];
    //         return `${lastMessage.content}`;
    //     }
    // };

    const getLastMessage = (messages) => {
        if (messages && messages.length > 0) {
            return messages[messages.length - 1].content;
        }
        return '';
    };


    const handleUserSelect = (userId) => {
        setSelectedUsers((prevSelectedUsers) =>
            prevSelectedUsers.includes(userId)
                ? prevSelectedUsers.filter((id) => id !== userId)
                : [...prevSelectedUsers, userId]
        );
        console.log("SELECTED USERS IS:", selectedUsers)
    };



    return (
        // <SidebarContainer>
        //     <ul>
        //         {users.map((user) => (
        //             <li key={user.id}>
        //                 <img src={user.profileImg} alt="Profile" className="profile-img" />
        //                  <span>{user.name}</span> 
        //                 <div>
        //                     <span>{user.name}</span>
        //                     <p>{getLastMessage(user.id)}</p>
        //                 </div>
        //             </li>
        //         ))}
        //     </ul>
        // </SidebarContainer>
        <SidebarContainer>
            <div className='sidbar-header'>
                <div className='header-1 mt-3'>
                    <div className='subPart-1 ml-3'>
                        <h3>Chats</h3>
                    </div>
                    <div className='chat-icons mr-2'>
                        <span onClick={toggleDropdown}><SlNote /></span>
                        <span><IoReorderFourOutline /></span>
                    </div>
                </div>
                {dropdownOpen && (
                    <div className='dropdown'>
                        <div className='header-container'>
                            <h5>Create Group</h5>
                        </div>
                        <div className='search-container ml-3 mt-4'>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Enter Group Name"
                                aria-label="text"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                        </div>
                        <div className='user-list mt-5' >
                            <ul>
                                {filteredUsersDropdown.map((user) => (
                                    <li
                                        key={user.id}
                                        className={selectedUsers.includes(user.id) ? "selected" : ""}
                                    // onClick={() => handleUserClick(user.id)}
                                    >
                                        <img src={user.profileImg} alt="Profile" className="profile-img" />
                                        <div>
                                            <span>{user.name}</span>
                                            <input
                                                type="checkbox"
                                                checked={selectedUsers.includes(user)}
                                                onChange={() => handleUserSelect(user)}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='create-group ml-3'>
                            <button onClick={handleCreateGroup}>Create New Group</button>
                        </div>
                    </div>)}
                <div className='header-2 mt-3'>
                    <div className='search-container ml-3'>
                        <input className="form-control " type="search" placeholder="Search" aria-label="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                </div>
                <div className='mt-5 user-list' >
                    <ul>
                        {filteredUsers.map((user) => (
                            <li key={user.id} onClick={() => handleUserClick(user.id)}>
                                <img src={user.profileImg} alt="Profile" className="profile-img" />
                                <div className='user-details'>
                                    <p>{user.name}</p>
                                    <span>{getLastMessage(user.messages)}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <ul className='group-list mt-5'>
                        {groups.map((group) => (
                            <li key={group.id} onClick={() => handleGroupClick(group.id)}>
                                <img src={group.profileImg} alt="Profile" className="profile-img" />
                                <div className='group-details'>
                                    <p>{group.name}</p>
                                    <span>{getLastMessage(group.messages)}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </SidebarContainer>
    );
};

const SidebarContainer = styled.section`
    ul {
        list-style-type: none;
        padding: 0;
        max-height: 200px;
    }

    li {
        display: flex;
        align-items: center;
        padding: 10px;
        transition: background-color 0.3s ease;
        border-bottom: 2px solid;
    }
    .user-list ul li:first-child{
        border-top: 2px solid;
    }
    .user-list ul li:last-child{
        border-top: none;   
    }
    

    li:hover {
        background-color: rgba(255, 255, 255, 0.1);
        cursor: pointer;
    }

    .profile-img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
    }

    p {
        color: white;
        font-size: 16px;
        margin: 0px;
    }
    span{
        color: white;
        font-size:12px
    }
    
    .header-1{
        display: flex;
        justify-content: space-between;
        margin-top: 4px;
    }
    .subPart-1 h3{
        color: white;
    }
    .user-details{
        display: flex;
        flex-direction: column;
    }
    .user-details span,
    .group-details span{
        color: rgba(255,255,255,0.3)
    }
    .chat-icons{
        display: flex;
        justify-content: space-between;
        gap: 40px;

    }
    .chat-icons span{
        color: white;
        font-size: 16px;
        width:30px;
        text-align: center;
        height: 30px;
    }
    .chat-icons span:hover{
        background-color: rgba(255, 255, 255, 0.1);
        cursor: pointer;
    }
    .search-container input{
        background-color: rgb(127 128 127 / 44%);
        width:90%;
        color:#fff;
    }
    .sidbar-header{
        display:flex;
        flex-direction: column;
        position:relative;
    }
    .user-list ul li.active {
        background-color: rgba(255, 255, 255, 0.1);
        cursor: pointer;
      }

      .header-container{
        color: #fff;
      }
      .dropdown {
        position: absolute;
        top: 50px; /* Adjust this value to position the dropdown below the header */
        left: 200px;
        width: 200px;
        height: 500px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        background-color: rgba(39 ,52, 67);
        z-index: 1000; /* Ensure the dropdown appears above other content */
        display: flex;
        flex-direction: column;
    }

    .dropdown button {
        background-color: blue;
        color: #fff;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
    }
    .create-group {
        margin-top: auto; /* Push the button to the bottom */
    }
    
    

`;

// // export default Sidebar;
// const mapStateToProps = (state) => ({
//     users: state.users,
//     activeUser: state.activeUser
// });

// const mapDispatchToProps = {
//     setActiveUser
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

export default Sidebar;
