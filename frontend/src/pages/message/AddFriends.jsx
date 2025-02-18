
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
    <button onClick={handleSubmit} className="add-friends-button"><i className="bx bx-user-plus"></i></button>
  )
}

export default AddFriends