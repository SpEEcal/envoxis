import useAddFriend from "../../hooks/useAddFriend"
import useDeleteRequest from "../../hooks/useDeleteRequest"

const Request = ({request}) => {
    // setting senderId in request to a variable
    const senderinfo = request.senderId
    const { addFriend } = useAddFriend()

    // delete request
    const deleteRequest = (senderid) => {
        useDeleteRequest(senderid)
    }

    const acceptRequest = (senderid) => {
        addFriend(senderid)
    }

  return (
    <div className="request-container">
        <div className="senderPFP">
            <img src={senderinfo.profilePic} alt="Profile picture of a user" />
        </div>
        <div className="senderUsername">
            {senderinfo.username}
        </div>
        <form onSubmit={acceptRequest(senderinfo._id)}>
            <div className="accept-button">
                <button><i className="bx bx-check"/></button>
            </div>
        </form>
        <form onSubmit={deleteRequest(senderinfo._id)}>
            <div className="decline-button">
                <button><i className="bx bx-x"/></button>
            </div>
        </form>
    </div>
  )
}

export default Request