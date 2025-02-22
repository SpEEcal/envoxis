import useGetConversations from "../../hooks/useGetConversations"
import useGetFriends from "../../hooks/useGetFriends"
import Conversation from "./Conversation"

const Conversations = () => {
  const {loading, conversations} = useGetConversations()
  const {friends} = useGetFriends()
  const friendList = friends.friends
  var isFriend = null
  console.log(conversations)
  console.log(friendList)

  return (
    <div>
        {friendList.map((friend) => (
          <div>
            {conversations.map((conversation) =>(
              <div>
                {isFriend = friend._id === conversation._id}
                {console.log(isFriend)}
                {console.log(friend._id)}
                {console.log(conversation._id)}
                {isFriend ? <Conversation key={conversation._id} conversation={conversation}/> : ""}
              </div>
            ))}
          </div>
        ))}
        {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
    </div>
  )
}

export default Conversations