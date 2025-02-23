
import useAddFriends from "../../zustand/useAddFriends"
import useConversation from "../../zustand/useConversation"

const AddFriends = () => {
    const {setSelectedAddFriends} = useAddFriends()
    const {setSelectedConversation} = useConversation()

    const handleSubmit = (e) => {
        e.preventDefault()
        setSelectedAddFriends("notnull")
        setSelectedConversation(null)
    }
    
  return (
    <form id="add" onSubmit={handleSubmit}>
      <button form="add" className="add-friends-button"><i className="bx bx-user-plus"></i></button>
    </form>
  )
}

export default AddFriends