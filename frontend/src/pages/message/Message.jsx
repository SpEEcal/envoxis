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

const Message = () => {
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
              <AddFriends />
              <CreateGroupChat />
              <div className="contact-messages">
                <ul className="contact-list">
                  <li>
                    <Conversations />
                  </li>
                </ul>
              </div>
              
              <MiniProfile />
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
