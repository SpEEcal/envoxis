import { useEffect, useState } from "react"
import useConversation from "../../zustand/useConversation"
import Messages from "./Messages"
import MessageInput from "./MessageInput"
import { useAuthContext } from "../../context/AuthContext"
import useAddFriends from "../../zustand/useAddFriends"
import useRequestSent from "../../hooks/useRequestSent"
import Request from "./Request"
import useGetRequests from "../../hooks/useGetRequests"
import './message.css';
import useCreateGroupChat from "../../zustand/useCreateGroupChat"
import Friends from "./Friends"
import useGetFriends from "../../hooks/useGetFriends"
import useAddGroupChat from "../../hooks/useAddGroupChat"
import toast from "react-hot-toast"
import GroupMessages from "./GroupMessages"
import GroupMessageInput from "./GroupMessageInput"
import $ from "jquery"

const MessageContainer = () => {
    const {selectedConversation, setSelectedConversation} = useConversation() // gets conversation from hook
    const {selectedAddFriends, setSelectedAddFriends} = useAddFriends() // loads adding friends container
    const {selectedCreateGroupChat, setSelectedCreateGroupChat} = useCreateGroupChat() // gets group conversation from hook

    useEffect(() => {

        //cleanup func
        return () => {
            setSelectedConversation(null)
            setSelectedAddFriends(null)
            setSelectedCreateGroupChat(null)
        }
    },[setSelectedConversation, setSelectedAddFriends, setSelectedCreateGroupChat])

   // for mobile users so that they can access the user's description
    const UserDescButton = () => {
        $('style').append("<style type='text/css'>@media screen and (max-width: 1316px) {.chat-container {width: 0%;} .contact-container {width: 0%;} .user-desc{ width: 90vw;} .message-container {width: 90vw; gap: 0px;} }</style>");
    }
   // for mobile users so that they can access the contact list again
    const BackToContactList = () => {
        $('style').append("<style type='text/css'>@media screen and (max-width: 1316px) {.chat-container {width: 0%;} .contact-container {width: 90vw;} .user-desc{ width: 0%;} .message-container {width: 90vw; gap: 0px;} }</style>");
    }

    // checks if there is a conversation and it is a group chat
    if (selectedConversation != null && selectedConversation.typeofchat == "group"){
        return (
            <>
                <div className="chat-top">
                    <button type="button" className="chat-back"><i className="bx bx-left-arrow-alt" /></button> {/* allow mobile users to exit the chat back to the contact list */}
                    <div className="chat-user">
                        <img src={selectedConversation.groupchatpfp} className="chat-user-pfp" alt="" /> {/* displays groupchat profile picture */}
                        <div className="detail-three">
                            <div className="chat-username">{selectedConversation.groupchatname}</div> {/* displays groupchat name */}
                        </div>
                    </div>
                </div>

                <GroupMessages /> {/* loads group messages */}
                <GroupMessageInput /> {/* loads an input bar to send messages */}
            </>
        )
    }
    // checks if there is a conversation and it is a 1 to 1 chat
    else if (selectedConversation != null){
        return (
            <>
                <button type="button" className="chat-back" onClick={(e) => BackToContactList()}><i className="bx bx-left-arrow-alt" /></button> {/* allow mobile users to exit the chat back to the contact list */}
                <div className="chat-top" onClick={(e) => UserDescButton()}>
                    <div className="chat-user">
                        <img src={selectedConversation.profilePic} className="chat-user-pfp" alt="" /> {/* displays the user being chatted to profile picture */}
                        <div className="detail-three">
                            <div className="chat-username">{selectedConversation.username}</div> {/* displays the user being chatted to username */}
                        </div>
                    </div>
                </div>

                <Messages /> {/* loads 1 to 1 messages */}
                <MessageInput /> {/* loads an input bar to send messages */}
            </>
        )
    }
    // checks if user wants to add friends
    else if (selectedAddFriends != null){
        return(
            <AddFriends /> // loads function to display the adding friends container
        )
    }
    // checks if user wants to create group chat
    else if (selectedCreateGroupChat != null){
        return(
            <CreateGroupChat /> // loads function to display the creating groupchat container
        )
    }
    // checks if user has just entered the messaging page
    else{
        return(
            <NoChatSelected /> // lets user know that no chat has been selected
        )
    }
}

export default MessageContainer


const NoChatSelected = () => {
    const {authUser} = useAuthContext()

    return(
        <div className="s-container"> {/* displays text to say to user that there is no chat to use to text someone with */}
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
    const isRequest = requests.length !== 0
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
        <div>
            {/* displays input box to sent users requests */}
            <div className="add-friend-container">
                <h1 className="friend-title">Add and Accept Users to Chat with</h1>
                <form id="add-friends" onSubmit={handleRequest} className="friend-form">
                    {/* Grabs username inputted by the user */}
                    <input type="search" className="friend-input" placeholder="Search user..." value={friend} onChange={(e) => setFriend(e.target.value)}/>
                    <button form="add-friends" className="friend-submit" type="submit"><i className="bx bx-search-alt-2" /></button>
                </form>
            </div>
            {/* displays requests sent TO user */}
            <div className="requests-container">
                {isRequest ? <h1 className="requests-incoming">Incoming requests</h1> : <h1 className="requests-incoming">No incoming requests</h1>}
                {isRequest && requests.map((request) => ( <Request key={request._id} request={request} /> ))}
            </div>
        </div>
    )
}

const CreateGroupChat = () => {
    const { authUser } = useAuthContext()
    const friendList = useGetFriends()
    const friends = friendList.friends
    const { addGroupChat } = useAddGroupChat()

    const ChangeInArray = () => {
        const {selectedUsers} = useCreateGroupChat()
        return(
            <div className="selected-people-container">
                {selectedUsers.map((selecteduser) => (
                    <div className="selected-friend-container">
                        {console.log(selecteduser)}
                        <img src={selecteduser.profilePic} alt="selectedUserPFP" className="selected-friend-PFP" />
                        <h1 className="selected-friend-username">{selecteduser.username}</h1>
                    </div>
                ))}
            </div>
        )
    }
    const getSelectedUser = () => {
        const {selectedUsers} = useCreateGroupChat()
        return selectedUsers
    }

    let array = getSelectedUser()

    const submitGroupInfo = async (e) => {
        e.preventDefault()
        if (array.length == 10){
            toast.error("Maximum 10 users per group")
        }
        else if (array.length == 1){
            toast.error("Add one more user to create a group")
        }
        else{
            await addGroupChat(authUser._id, array)
        }
    }

    if (friends.friends != undefined && friends.friends.length > 1){
        return(
            <form id="creation-group-container">
                <h1 className="GC-creation-title">Select Users to Add to Group Chat</h1>
                <ChangeInArray/>
                <div className="creation">
                    <Friends />
                </div>
                <button form="creation-group-container" className="creation-submit" onClick={submitGroupInfo}>
                    <p>Create Group Chat</p>
                    <i className="bx bx-send"></i>
                </button>
            </form>
        )
    }
    else{
        return(
            <div>
                <CannotCreateGroup/>
            </div>
        )
    }
}

const CannotCreateGroup = () => {
    return(
        <div className="cannot-create-group-container">
            <i className="bx bx-lock"></i>
            <h1 className="cannot-create-group-text">Add more friends to gain access to creating groups!</h1>
        </div>
    )
}