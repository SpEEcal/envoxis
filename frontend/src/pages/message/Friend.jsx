import { useState } from "react";
import useCreateGroupChat from "../../zustand/useCreateGroupChat"
import './message.css';

const Friend = ({friend}) => {
    //stores selected users
    const {selectedUsers, isSelectedUser, setIsSelectedUser} = useCreateGroupChat()

    // changing style of selected users
    const [Friend, setStyleOne] = useState('friend-container');

    // checks if user has been selected
    const [isSelected, setIsSelected] = useState(false)

    const SelectedUser = (e) => {
        e.preventDefault()

        if(isSelected == false) {
            selectedUsers.push(friend)
            setIsSelected(true)
            setStyleOne('selected-container')
            setIsSelectedUser(isSelectedUser + 1)
        }
        else {
            selectedUsers.pop(friend)
            setIsSelected(false)
            setStyleOne('friend-container')
            setIsSelectedUser(isSelectedUser + 1)
        }
        console.log(selectedUsers)
    }

  return (
    <div>
        <div className={Friend} onClick={SelectedUser}>
            <div className="friend-image avatar">
                <div className="w-10 rounded-full">
                <img
                    alt="Tailwind CSS chat bubble component"
                    src={friend.profilePic} />
                </div>
            </div>
            <div className="friend-header">
                {friend.username}
            </div>
        </div>
    </div>
  )
}

export default Friend