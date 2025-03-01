import Status from "./Status"
import useGetConversations from "../../hooks/useGetConversations"
import useGetFriends from "../../hooks/useGetFriends"

const Statuses = () => {
  const {loading, conversations} = useGetConversations()
  const {friends} = useGetFriends()
  const friendList = friends.friends
  var isFriend = null

  return (
    <div>
        {conversations.map((conversation) => (
          <div>
            {friendList != undefined && friendList.map((friend) =>(
              <div>
                {isFriend = friend._id === conversation._id}
                {isFriend ? <Status key={conversation._id} conversation={conversation}/> : ""}
              </div>
            ))}
        </div>
        ))}
        {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
    </div>
  )
}

export default Statuses