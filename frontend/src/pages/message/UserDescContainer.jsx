import { useEffect } from "react"
import useConversation from "../../zustand/useConversation"
import { useAuthContext } from "../../context/AuthContext"
import useRemoveFriend from "../../hooks/useRemoveFriend"

const UserDescContainer = () => {
    const {selectedConversation, setSelectedConversation} = useConversation()

    useEffect(() => {

        //cleanup func
        return () => setSelectedConversation(null)
    },[setSelectedConversation])

    const RemoveFriend = (friendid) => {
        {console.log("DELETEEDDD")}
        useRemoveFriend(friendid)
    }

  return (
    <div>
    {!selectedConversation ? <NoChatSelected /> : (
        <div className="user-alignment">
            <div className="User-description">
                <img src={selectedConversation.profilePic} className="user-pfp" alt="" />
                <div className="user-name">{selectedConversation.username}</div>
            </div>
            <div className="User-bio-desc">
                <div className="bio-title">Bio</div>
                <div className="user-bio">Hey! I'm {selectedConversation.username} nice to meet you!</div>
            </div>
            <form id="remove-friend" className="remove-friend">
                <button form="remove-friend" className="remove-friend-button" onClick={e => RemoveFriend(selectedConversation._id)}>Remove Friend</button>
            </form>
        </div>
    )}

    
    </div>
  )
}

export default UserDescContainer

const NoChatSelected = () => {
    return(
        <div className="Starter1">
            <p>Click a chat to see the users description</p>
        </div>
    )
}