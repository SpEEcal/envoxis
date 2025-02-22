import useGetConversations from "../../hooks/useGetConversations"
import useGetFriends from "../../hooks/useGetFriends"
import Conversation from "./Conversation"

const Conversations = () => {
  const {loading, conversations} = useGetConversations()
  const {friends} = useGetFriends()
  var isFriend = null
  console.log(conversations)
  console.log(friends)

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