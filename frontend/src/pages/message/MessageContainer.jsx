import { useEffect, useState } from "react"
import useConversation from "../../zustand/useConversation"
import Messages from "./Messages"
import MessageInput from "./MessageInput"
import { useAuthContext } from "../../context/AuthContext"
import useAddFriends from "../../zustand/useAddFriends"
import useRequestSent from "../../hooks/useRequestSent"
import Request from "./Request"
import useGetRequests from "../../hooks/useGetRequests"

const MessageContainer = () => {
    const {selectedConversation, setSelectedConversation} = useConversation()
    const {selectedAddFriends, setSelectedAddFriends} = useAddFriends()

    useEffect(() => {

        //cleanup func
        return () => {
            setSelectedConversation(null)
            setSelectedAddFriends(null)
        }
    },[setSelectedConversation, setSelectedAddFriends])

    if (selectedConversation != null){
        return (
            <>
                <div className="chat-top">
                    <button type="button" className="chat-back"><i className="bx bx-left-arrow-alt" /></button>
                    <div className="chat-user">
                        <img src={selectedConversation.profilePic} className="chat-user-pfp" alt="" />
                        <div className="detail-three">
                            <div className="chat-username">{selectedConversation.username}</div>
                        </div>
                        <div className="chat-voice-call">
                        <img src="./Messageimg/voicecall.png" alt="" />
                        </div>
                        <div className="chat-video-call">
                        <img src="./Messageimg/videocall.png" alt="" />
                        </div>
                    </div>
                </div>

                <Messages />
                <MessageInput />
            </>
        )
    }
    else if (selectedAddFriends != null){
        return(
            <AddFriends />
        )
    }
    else{
        return(
            <NoChatSelected />
        )
    }
}

export default MessageContainer


const NoChatSelected = () => {
    const {authUser} = useAuthContext()

    return(
        <div className="s-container">
            <div className="Starter">
                <p className="sentenceOne">Welcome {authUser.username} !</p>
            </div>
            <div className="Starter2">
                <div className="moving-icon"><i className="bx bx-left-arrow-alt"></i></div>
                <p>Click a chat to start your conversation</p>
            </div>
        </div>
    )
}

const AddFriends = () => {
    // to set the username to send the request to
    const [friend, setFriend] = useState("")
    // grabs array list of requests
    const { requests } = useGetRequests()
    // checks if there are any requests to the current user
    const isRequest = requests !== undefined
    // function to be used from hook
    const { RequestSent } = useRequestSent()

    const handleRequest = (e) => {
        // prevents website from refreshing when user sends request
        e.preventDefault()
        // if nothing is sent, nothing is returned
        if (!friend) return
        // usernames cannot be less than 3 characters long
        if(friend.length < 3){
            return toast.error('Usernames are at least 3 characters long')
        }
        else{
            // sends request to the user
            RequestSent(friend)
        }
    }

    return (
        <div className="add-friend-container">
            {/* displays input box to sent users requests */}
            <h1 className="friend-title">Add and Accept Users to Chat with</h1>
            <form onSubmit={handleRequest} className="friend-form">
                {/* Grabs username inputted by the user */}
                <input type="search" className="friend-input" placeholder="Search user..." value={friend} onChange={(e) => setFriend(e.target.value)}/>
                <button className="friend-submit"><i className="bx bx-search-alt-2" /></button>
            </form>
            {/* displays requests sent TO user */}
            {isRequest ? <h1 className="requests-incoming">Incoming requests</h1> : <h1 className="requests-incoming">No incoming requests</h1>}
            {isRequest && requests.map((request) => ( <Request key={request._id} request={request} /> ))}
        </div>
    )
}