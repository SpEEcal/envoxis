import { useAuthContext } from "../../context/AuthContext"
import useGetConversations from "../../hooks/useGetConversations"
import Conversation from "./Conversation"

const Conversations = () => {
    const {authUser} = useAuthContext()
    const {loading, conversations} = useGetConversations()
    console.log(conversations)
    console.log(authUser)
  return (
    <div>
        {conversations.map((conversation) => (
            <Conversation 
                key={conversation._id}
                conversation={conversation}
            />
        ))}
        {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
    </div>
  )
}

export default Conversations