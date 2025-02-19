import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useGetSenderOfRequest from '../../hooks/useGetSenderOfRequest'

const Request = ({request}) => {
    const senderinfo = useGetSenderOfRequest(request)
    console.log(senderinfo)

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