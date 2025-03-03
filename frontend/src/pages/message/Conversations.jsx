import useGetConversations from "../../hooks/useGetConversations"
import useGetFriends from "../../hooks/useGetFriends"
import useGetGroupChats from "../../hooks/useGetGroupChats"
import Conversation from "./Conversation"
import GroupConversation from "./GroupConversation"

const Conversations = () => {
  const {loading, conversations} = useGetConversations()
  const {groupconversations} = useGetGroupChats()
  const {friends} = useGetFriends() // gets user information from hook
  const friendList = friends.friends // selects specifically the friends fielf from user information
  var isFriend = null // to check whether the selected conversation is the friends conversation

  return (
    <div>
      {/* loops through each user in database */}
        {conversations.map((conversation) => (
          <div>
            {/* loops through each friend in the users friend list */}
            {friendList.map((friend) =>(
              <div>
              {/* checks if the friends id is the same as the conversation id */}
                {isFriend = friend._id === conversation._id}
              {/* display conversation if so else no conversation displayed */}
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