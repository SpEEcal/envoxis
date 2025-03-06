import { useAuthContext } from '../../context/AuthContext'
import { useSocketContext } from '../../context/SocketContext'
import useConversation from '../../zustand/useConversation'

const Status = ({conversation}) => { // parameter of the conversation between the two users
  const {setSelectedConversation} = useConversation() // imports function from zustand hook to be used for loading the conversation
  const {onlineUsers} = useSocketContext() // array of online users
  const isOnline = onlineUsers.includes(conversation._id) // checks whether the user is definitely online
  const { authUser } = useAuthContext() // information about current user

  if(isOnline === true) {
    return [
      <div className="status-user-container">
        <a href="/message" onClick={() => {setSelectedConversation(conversation)}} > {/* goes to the the messaging page if one of the users is clicked */}
          <img className="online-user-status" src={`${isOnline ? authUser.status : "../Messageimg/invis.png"}`} alt="" /> {/* sets the status of users that are offline to the invisible icon */}
          <img className="online-user-pfp" src={conversation.profilePic} alt="" /> {/* displays the users profile picture */}
          <span className="online-user-name">{conversation.username}</span> {/* displays the users username */}
        </a>  
      </div>
    ]
  }
}

export default Status