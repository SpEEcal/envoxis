import useGetFriends from "../../hooks/useGetFriends"
import Friend from "./Friend"
import './message.css';

const Friends = () => {
    const {friends} = useGetFriends()
    const friendList = friends.friends

    return (
        <div className="friends-container">
                {friendList != undefined && friendList.map((friend) =>(
                    <div>
                        {<Friend key={friend._id} friend={friend}/>}
                    </div>
                ))}
        </div>
    )
}

export default Friends