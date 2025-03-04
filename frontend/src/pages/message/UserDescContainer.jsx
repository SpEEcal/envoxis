import { useEffect } from "react"
import useConversation from "../../zustand/useConversation"
import $ from "jquery"
import useRemoveFriend from "../../hooks/useRemoveFriend"

const UserDescContainer = () => {
    const {selectedConversation, setSelectedConversation} = useConversation()

    useEffect(() => {

        //cleanup func
        return () => setSelectedConversation(null)
    },[setSelectedConversation])

    const RemoveFriend = (friendid) => {
        useRemoveFriend(friendid) // calls hook to remove the friend from array
    }

    const BackToMessaging = () => {
        $('style').append("<style type='text/css'>@media screen and (max-width: 1316px) {.chat-container {width: 90vw;} .contact-container {width: 0%;} .user-desc{ width: 0%;} .message-container {width: 90vw; gap: 0px;} }</style>");
    }

    if (selectedConversation && selectedConversation.typeofchat == "group"){
        return (
            <div className="user-alignment">
                <div className="User-description">
                    <img src={selectedConversation.groupchatpfp} className="user-pfp" alt="" />
                    <div className="user-name">{selectedConversation.groupchatname}</div>
                </div>
                {/* <form id="remove-friend" className="remove-friend">
                    <button form="remove-friend" className="remove-friend-button" onClick={e => RemoveFriend(selectedConversation._id)}>Remove Friend</button>
                </form> */}
            </div>
        )
    }
    else if (selectedConversation && selectedConversation.username == selectedConversation.username){
        return (
            <div className="user-alignment">
            <button type="button" className="back-to-messaging-button" onClick={(e) => BackToMessaging()}><i className="bx bx-left-arrow-alt" /></button>
            <div className="User-description"> {/* shows username and profile picture of the user that is being texted to */}
                <img src={selectedConversation.profilePic} className="user-pfp" alt="" />
                <div className="user-name">{selectedConversation.username}</div>
            </div>
            <div className="User-bio-desc">
                {/* Shows the bio of the user that is being texted to */}
                <div className="bio-title">Bio</div>
                <div className="user-bio">Hey! I'm {selectedConversation.username} nice to meet you!</div>
            </div>
            {/* Button to delete the user as a friend */}
            <form id="remove-friend" className="remove-friend">
                <button form="remove-friend" className="remove-friend-button" onClick={e => RemoveFriend(selectedConversation._id)}>Remove Friend</button>
            </form>
        </div>
        )
    }
    else {
        return(
            <NoChatSelected />
        )
    }
}

export default UserDescContainer

const NoChatSelected = () => {
    return(
        <div className="Starter1">
            <p>Click a chat to see the users description</p>
        </div>
    )
}