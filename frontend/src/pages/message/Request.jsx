import React from 'react'

const Request = ({request}) => {
    console.log(request)
    const senderinfo = request.senderId
    console.log(senderinfo.username)

  return (
    <div className="request-container">
        <div className="senderPFP">
            <img src={senderinfo.profilePic} alt="Profile picture of a user" />
        </div>
        <div className="senderUsername">
            {senderinfo.username}
        </div>
        <div className="accept-button">
            <i className="bx bx-check"></i>
        </div>
        <div className="decline-button">
            <i className="bx bx-x"></i>
        </div>
    </div>
  )
}

export default Request