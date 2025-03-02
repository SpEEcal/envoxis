// library or external function to be used in program
import useAddFriend from "../../hooks/useAddFriend"
import useDeleteRequest from "../../hooks/useDeleteRequest"
import './message.css';

const Request = ({request}) => {
    // setting senderId in request to a variable
    const senderinfo = request.senderId
    const { addFriend } = useAddFriend() // gets function in hook to be used to send requests to users

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
            {/* Displays profile picture of user that has sent request */}
            <img className="senderPFP" src={senderinfo.profilePic} alt="Profile picture of a user" />
        </div>
        {/* Displays username of user that has sent request */}
        <div className="senderUsername">
            {senderinfo.username}
        </div>
        {/* Displays a tick to allow the user to accept the request */}
        <form id="accept-request">
            <div className="accept-button">
                {/* button is used for the form "accept-request" */}
                <button form="accept-request" onClick={e => acceptRequest(senderinfo._id)}><i className="bx bx-check"/></button>
            </div>
        </form>
        {/* Displays a cross to allow the user to decline the request */}
        <form id="delete-request">
            <div className="decline-button">
                {/* button is used for the form "delete-request" */}
                <button form="delete-request" onClick={e => deleteRequest(senderinfo._id)}><i className="bx bx-x"/></button>
            </div>
        </form>
    </div>
  )
}

export default Request