import useAddFriend from "../../hooks/useAddFriend"
import useDeleteRequest from "../../hooks/useDeleteRequest"
import './message.css';

const Request = ({request}) => {
    // setting senderId in request to a variable
    const senderinfo = request.senderId
    const { addFriend } = useAddFriend()

    // delete request
    const deleteRequest = (senderid) => {
        useDeleteRequest(senderid)
    }

    // accept request
    const acceptRequest = async (senderid) => {
        await addFriend(senderid)
        useDeleteRequest(senderid)
    }

  return (
    <div className="request-container">
        <div className="senderPFP">
            <img className="senderPFP" src={senderinfo.profilePic} alt="Profile picture of a user" />
        </div>
        <div className="senderUsername">
            {senderinfo.username}
        </div>
        <form id="accept-request">
            <div className="accept-button">
                <button form="accept-request" onClick={e => acceptRequest(senderinfo._id)}><i className="bx bx-check"/></button>
            </div>
        </form>
        <form id="delete-request">
            <div className="decline-button">
                <button form="delete-request" onClick={e => deleteRequest(senderinfo._id)}><i className="bx bx-x"/></button>
            </div>
        </form>
    </div>
  )
}

export default Request