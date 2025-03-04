import React, { useEffect, useState } from 'react'
import './message.css';
import Conversations from './Conversations';
import MessageContainer from './MessageContainer';
import SearchInput from './SearchInput';
import Sidebar from '../sidebar/Sidebar';
import UserDescContainer from './UserDescContainer';
import AddFriends from './AddFriends';
import MiniProfile from './MiniProfile';
import CreateGroupChat from './CreateGroupChat';
import $ from "jquery"

const Message = () => {
   // for mobile users so that they can access this container
   $('style').append("<style type='text/css'>@media screen and (max-width: 1316px) {.sidebar-container {width: 100px;}}</style>");
   const ToAddFriends = () => {
    $('style').append("<style type='text/css'>@media screen and (max-width: 1316px) {.chat-container {width: 90vw;} .contact-container {width: 0%;} .user-desc{ width: 0%;} .message-container {width: 90vw; gap: 0px;} .friend-title {font-size: 30px;} .friend-input::placeholder{font-size: 20px;} .friend-input{font-size: 20px; margin-left: 5px; width: 85%;} .friend-submit{position: absolute; right: 5vw;} .requests-incoming{ font-size: 25px; margin-bottom: 15px} .request-container{width: 95%; margin-bottom: 10px;} .senderUsername{ font-size: 20px; left: 25%; top: 25%;} .accept-button{ right: 70px; } .decline-button{ right: 10px; }}</style>");
}
  const MiniProfileUsed = () => {
    $('style').append("<style type='text/css'>@media screen and (max-width: 1316px) { .idle-status { left: 50%;} .dnd-status { left: 50%;} .dnd-status span {margin-left: 3px; margin-top: 10px;}}</style>");
  }

  return (
    <div>
        <meta charSet="UTF-8" />
        <meta name="viewpoint" content="width=device-width, initial-scale=1.0" />
        <title>Envoxis | Chat</title>
        {/*- Box icons */}
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
        <div className="body3">
          <div className="message-container">
            <Sidebar />

            <div className="contact-container">
              <div className="contact-title">Chats</div>
              <SearchInput />
              <div className="button-to-add-friends" onClick={(e) => ToAddFriends()}>
                <AddFriends />
              </div>
              <CreateGroupChat />
              <div className="contact-messages">
                <ul className="contact-list">
                  <li>
                    <Conversations />
                  </li>
                </ul>
              </div>
              <div className="mini-profile-button" onClick={(e) => MiniProfileUsed()}>
                <MiniProfile />
              </div>
            </div>

            <div className="chat-container">
              <MessageContainer />
            </div>

            <div className="user-desc">
              <UserDescContainer />
            </div>

        </div>
      </div>
      </div>
  )
}

export default Message
