import { useAuthContext } from '../../context/AuthContext'
import { useSocketContext } from '../../context/SocketContext'
import useConversation from '../../zustand/useConversation'

const Status = ({conversation}) => {
  const {selectedConversation, setSelectedConversation} = useConversation()
  const {onlineUsers} = useSocketContext()
  const isOnline = onlineUsers.includes(conversation._id)
  const { authUser } = useAuthContext()

  if(isOnline === true) {
    return [
      <div className="status-user-container">
        <a href="/message" onClick={() => {setSelectedConversation(conversation)}} >
          <img className="online-user-status" src={`${isOnline ? authUser.status : "../Messageimg/invis.png"}`} alt="" />
          <img className="online-user-pfp" src={conversation.profilePic} alt="" />
          <span className="online-user-name">{conversation.username}</span>
        </a>  
      </div>
    ]
  }
}

export default Status