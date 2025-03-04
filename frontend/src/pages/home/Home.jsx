import { useEffect, useState } from 'react';
import '../home/home.css'
import Sidebar from '../sidebar/Sidebar'
import Statuses from './Statuses'
import moment from 'moment';
import 'moment/locale/en-gb';
import $ from "jquery"

const Home = (e) => {
  $('style').append("<style type='text/css'>@media screen and (max-width: 1316px) {.sidebar-container {width: 100px;}}</style>");

    moment.locale(); 
    const formattedDay= moment().format("dddd Do MMMM")
    const formattedTime = moment().format('LT')


  return (

    <div className='body2'>
        <meta charSet="UTF-8" />
        <meta name="viewpoint" content="width=device-width, initial-scale=1.0" />
        <title>Envoxis | Home</title>
        {/*- Box icons */}
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />

        <div className="home-container">
          <Sidebar />

          <div className="statuses">
            <div className="statuses-title">Online Users</div>
            <div className="statuses-arrow"><i className="bx bx-down-arrow-alt"></i></div>
            <div className="online-user-container">
                <ul className="status-list">
                  <li>
                    <Statuses />
                  </li>
                </ul>
              </div>
          </div>

          <div className="middle-container">
            <div className="unread-messages">

            </div>
            <div className="logo-design">

            </div>
          </div>

          <div className="last-container">
            <div className="events">

            </div>
            <div className="time">
                <time className='Fday'>{formattedDay}</time>
                <time className='Ftime'>{formattedTime}</time>
            </div>
          </div>

        </div>
    </div>
  )
}

export default Home