import useGetConversations from "../../hooks/useGetConversations"
import useGetFriends from "../../hooks/useGetFriends"
import Conversation from "./Conversation"
import useGetGroupChats from "../../hooks/useGetGroupChats"
import GroupConversation from "./GroupConversation"
import { useAuthContext } from "../../context/AuthContext"

const Conversations = () => {
  const {loading, conversations} = useGetConversations() // gets all conversations in array from MongoDB
  const {friends} = useGetFriends() // gets user information from hook
  const friendList = friends.friends // selects specifically the friends fielf from user information
  var isFriend = null // to check whether the selected conversation is the friends conversation
  const {groupconversations} = useGetGroupChats()
  const { authUser } = useAuthContext()
  var user = null
  var userid = authUser._id

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
            <div className="hideFromView">
              {user = conversation.groupchatparticipants}
            </div>
            {user.map((usersinGC) => (
              <div>
                {usersinGC != null && userid === usersinGC.toString() ? <GroupConversation key={conversation._id} conversation={conversation}/> : ""}
              </div>
            ))}
          </div>
        ))}
        {loading ? <span className="loading loading-spinner mx-auto"></span> : null} {/* checks whether the conversations are still being laoded up */}
    </div>
  )
}

export default Conversations