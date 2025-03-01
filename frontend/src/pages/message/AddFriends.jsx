import useAddFriends from "../../zustand/useAddFriends"
import useConversation from "../../zustand/useConversation"
import useCreateGroupChat from "../../zustand/useCreateGroupChat"

const AddFriends = () => {
    const {setSelectedAddFriends} = useAddFriends()
    const {setSelectedConversation} = useConversation()
    const {setselectedCreateGroupChat} = useCreateGroupChat()

    const handleSubmit = (e) => {
        e.preventDefault()
        setSelectedAddFriends("notnull")
        setSelectedConversation(null)
        setselectedCreateGroupChat(null)
    }
    
  return (
    <form id="add" onSubmit={handleSubmit}>
      <button form="add" className="add-friends-button"><i className="bx bx-user-plus"></i></button>
    </form>
  )
}

export default AddFriends