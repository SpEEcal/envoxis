import useAddFriends from "../../zustand/useAddFriends"
import useConversation from "../../zustand/useConversation"
import useCreateGroupChat from "../../zustand/useCreateGroupChat"
import './message.css';

const CreateGroupChat = () => {
    const {setSelectedAddFriends} = useAddFriends()
    const {setSelectedConversation} = useConversation()
    const {setSelectedCreateGroupChat, setIsSelectedUser, setoldSelectedUser, setSelectedUsers} = useCreateGroupChat()

    const handleSubmit = (e) => {
        e.preventDefault()
        setSelectedCreateGroupChat("notnull")
        setSelectedAddFriends(null)
        setSelectedConversation(null)
        setSelectedUsers([])
        setIsSelectedUser(0)
        setoldSelectedUser(0)
    }
    
  return (
    <form id="group-chat-creation" onSubmit={handleSubmit}>
      <button form="group-chat-creation" className="create-group-button">Create group chat <i className="bx bx-plus"></i></button>
    </form>
  )
}

export default CreateGroupChat