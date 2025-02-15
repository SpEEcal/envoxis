import { useEffect } from "react"
import useConversation from "../../zustand/useConversation"
import Messages from "./Messages"
import MessageInput from "./MessageInput"
import { useAuthContext } from "../../context/AuthContext"
import useAddFriends from "../../zustand/useAddFriends"

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
  return (
    <div>WORKKKKKKKKKKKKKKKKKKKKKKKKKKK</div>
  )
}