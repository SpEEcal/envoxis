import React from 'react'
import useCreateGroupChat from '../../zustand/useCreateGroupChat'

const SelectedFriend = (friend) => {
    const {selectedUsers} = useCreateGroupChat()

    const RemoveFriend = () => {
        selectedUsers.pop(friend)
    }

    return (
    <div className="selected-friend-container">
        <div className="selected-friend-PFP">
            <img className="selected-friend-PFP" src={friend.profilePic} alt="Profile picture of a user" />
        </div>
        <div className="selected-friend-username">
            {friend.username}
        </div>
        <form id="remove-selected-friend">
            <div className="remove-selected-friend-button">
                <button form="remove-selected-friend" onClick={RemoveFriend}><i className="bx bx-x"/></button>
            </div>
        </form>
    </div>
    )
}

export default SelectedFriend