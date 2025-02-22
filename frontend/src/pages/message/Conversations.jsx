import useGetConversations from "../../hooks/useGetConversations"
import useGetFriends from "../../hooks/useGetFriends"
import Conversation from "./Conversation"

const Conversations = () => {
  const {loading, conversations} = useGetConversations()
  const {friends} = useGetFriends()
  const friendList = friends.friends
  var isFriend = null
  console.log(`conversations: ${conversations}`)
  console.log(`friends: ${friendList}`)

  return (
    <div>
        {conversations.map((conversation) => (
          <div>
            {isFriend = friend === conversation._id}
            {isFriend && friendList.map((friend) =>(
              <Conversation key={conversation._id} conversation={conversation}/>
            ))}
          </div>
        ))}
        {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
    </div>
  )
}

export default Conversations