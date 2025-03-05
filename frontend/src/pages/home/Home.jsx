import { useEffect, useState } from 'react';
import '../home/home.css'
import Sidebar from '../sidebar/Sidebar'
import Statuses from './Statuses'
import moment from 'moment';
import 'moment/locale/en-gb';
import $ from "jquery"

const Home = (e) => {
  $('style').append("<style type='text/css'>@media screen and (max-width: 1316px) {.sidebar-container {width: 100px;} .form-image-main{width: 600px;}}</style>");

    moment.locale(); 
    const formattedDay= moment().format("dddd Do MMMM")
    const formattedTime = moment().format('HH:mm')

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
            <div className="logo-design">
              <img src="./img/Lines.png" className="home-image-main" />
                <img src="./img/squiggles.png" className="home-image squiggles" />
                <img src="./img/beachball.png" className="home-image beachball" />
                <img src="./img/sandcastle.png" className="home-image sandcastle" />
                <img src="./img/Logo.png" className="home-image Logo" />
                <img src="./img/bubbles.png" className="home-image bubbles" />
                <img src="./img/sparkles.png" className="home-image sparkles" />
                <h1 className="text-for-homepage">Welcome To Envoxis</h1>
            </div>
          </div>

          <div className="last-container">
            <div className="events">
              <div className='Fday'>{formattedDay}</div>
            </div>
            <div className="time">
                <div className='Ftime'>{formattedTime}</div>
            </div>
          </div>

        </div>
    </div>
  )
}

export default Home