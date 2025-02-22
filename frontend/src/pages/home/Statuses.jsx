import Status from "./Status"
import useGetConversations from "../../hooks/useGetConversations"

const Statuses = () => {
  const {loading, conversations} = useGetConversations()
  const {friends} = useGetFriends()
  const friendList = friends.friends
  var isFriend = null

  return (
    <div>
        {conversations.map((conversation) => (
          <div>
            {friendList.map((friend) =>(
              <div>
                {isFriend = friend._id === conversation._id}
                {console.log(isFriend)}
                {console.log(`friendid: ${friend._id}`)}
                {console.log(`conversationid: ${conversation._id}`)}
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