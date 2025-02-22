import useGetConversations from "../../hooks/useGetConversations"
import Conversation from "./Conversation"

const Conversations = () => {
    const {loading, conversations} = useGetConversations()
    const friends = conversations.friends
    console.log(conversations)
    console.log(friends)
  return (
    <div>
        {conversations.map((conversation) => (
          console.log(conversation)
        ))}
        {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
    </div>
  )
}

export default Conversations