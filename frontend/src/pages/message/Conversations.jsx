import useGetConversations from "../../hooks/useGetConversations"
import useGetFriends from "../../hooks/useGetFriends"
import useGetGroupChats from "../../hooks/useGetGroupChats"
import Conversation from "./Conversation"
import GroupConversation from "./GroupConversation"

const Conversations = () => {
  const {loading, conversations} = useGetConversations()
  const {groupconversations} = useGetGroupChats()
  const {friends} = useGetFriends()
  const friendList = friends.friends
  var isFriend = null

  console.log(`groupcnvos: ${groupconversations}`)

  return (
    <div>
        {conversations.map((conversation) => (
          <div>
            {friendList.map((friend) =>(
              <div>
                {isFriend = friend._id === conversation._id}
                {isFriend ? <Conversation key={conversation._id} conversation={conversation}/> : ""}
              </div>
            ))}
          </div>
        ))}
        {groupconversations.map((conversation) => (
          <div>
            <GroupConversation key={conversation._id} conversation={conversation}/>
          </div>
        ))}
        {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
    </div>
  )
}

export default Conversations