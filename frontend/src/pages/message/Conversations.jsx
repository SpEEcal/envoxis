import { useAuthContext } from "../../context/AuthContext"
import useGetConversations from "../../hooks/useGetConversations"
import Conversation from "./Conversation"

const Conversations = () => {
    const {authUser} = useAuthContext()
    const {loading, conversations} = useGetConversations()
    const friends = authUser.friends
    var isFriend = null
    console.log(conversations)
    console.log(authUser)
    
  return (
    <div>
        {conversations.map((conversation) => {
          friends.map((friend) =>(
            <div>
              {isFriend = friend === conversation._id}
              {isFriend ? <Conversation key={conversation._id} conversation={conversation}/> : ""}
            </div>
          ))
        })}
        {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
    </div>
  )
}

export default Conversations