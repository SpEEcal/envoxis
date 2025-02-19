import { useEffect, useState } from "react"
import useConversation from "../../zustand/useConversation"
import Messages from "./Messages"
import MessageInput from "./MessageInput"
import { useAuthContext } from "../../context/AuthContext"
import useAddFriends from "../../zustand/useAddFriends"
import useRequestSent from "../../hooks/useRequestSent"

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
    const [friend, setFriend] = useState("")
    const isRequest = null
    const { RequestSent } = useRequestSent()

    const handleRequest = (e) => {
        e.preventDefault()
        if (!search) return
        if(search.length < 3){
            return toast.error('Usernames are at least 3 characters long')
        }
        else{
            RequestSent(friend)
        }
    }

    return (
        // displaying both the requests from other users and to give requests to others
        <div className="add-friend-container">
            <h1 className="friend-title">Add and Accept Users to Chat with</h1>
            <form onSubmit={handleRequest} className="friend-form">
                <input type="search" className="friend-input" placeholder="Search user..." value={friend} onChange={(e) => setFriend(e.target.value)}/>
                <button className="friend-submit"><i className="bx bx-search-alt-2" /></button>
            </form>
            <h1 className="requests-incoming">Requests</h1>

            
        </div>
    )
}