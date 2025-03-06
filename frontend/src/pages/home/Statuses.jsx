import Status from "./Status"
import useGetConversations from "../../hooks/useGetConversations"
import useGetFriends from "../../hooks/useGetFriends"

const Statuses = () => {
  const {loading, conversations} = useGetConversations() // gets array of conversations
  const {friends} = useGetFriends() // gets array of user information with friends list
  const friendList = friends.friends // selects only array of friends list
  var isFriend = null

  return (
    <div>
        {conversations.map((conversation) => ( // loops through every conversation in the conversations array
          <div>
            {friendList != undefined && friendList.map((friend) =>( // loops through every friend in the friends list array
              <div>
                {isFriend = friend._id === conversation._id} {/* checks whether the conversation is with a friend */}
                {isFriend ? <Status key={conversation._id} conversation={conversation}/> : ""} {/* sends conversation to status.jsx file to use if so */}
              </div>
            ))}
        </div>
        ))}
        {loading ? <span className="loading loading-spinner mx-auto"></span> : null} {/* checks whether the online users are still being laoded up */}
    </div>
  )
}

export default Statuses