import useGetConversations from "../../hooks/useGetConversations"
import Conversation from "./Conversation"

const Conversations = () => {
    const {loading, conversations} = useGetConversations()
    const friends = conversations.friends
  return (
    <div>
        {friends.map((conversation) => (
            <Conversation 
                key={conversation}
                conversation={conversation}
            />
        ))}
        {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
    </div>
  )
}

export default Conversations