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
        if (isSelected == false){
            selectedUsers.push(friend)
            console.log(selectedUsers)
            setIsSelected(true)
            setIsSelectedUser(isSelectedUser+1)
            setStyleOne('selected-container')
        }
        else {
            selectedUsers.pop(friend)
            setIsSelected(false)
            setIsSelectedUser(isSelectedUser+1)
            setStyleOne('friend-container')
        }
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