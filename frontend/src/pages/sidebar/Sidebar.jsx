import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout"
import { useState } from "react";
import useGetChangeColor from "../../hooks/useGetChangeColor";
import './sidebar.css'

const Sidebar = () => {
    const {loading, logout} = useLogout()
    const navigate = useNavigate();
    const {Change1, Change2, Change3, Change4} = useGetChangeColor()

  return (
    <div className="sidebar-container">
            <li>
              <a href="#" className="logo">
                <img src="img/Logo.png" alt="Logo" className="sidebar-logo" />
              </a>
            </li>
            <div className="sidebar">
              <div className={`sidebar-home ${Change1 ? "bg-dark-dark-purple" : ""}`}>
                <a href="home">
                  <i className="bx bx-home-smile" />
                </a>
              </div>
              <div className={`sidebar-chat ${Change2 ? "bg-dark-dark-purple" : ""}`}>
                    <a href="message">
                        <i className="bx bx-chat"></i>
                    </a>
                </div>
                <div className={`sidebar-settings ${Change4 ? "bg-dark-dark-purple" : ""}`}>
                    <a href="settings">
                        <i className="bx bx-cog"></i>
                    </a>
                </div>
            </div>
            <div className="sidebar-log-out">
                <button onClick={logout}>
                    <i className="bx bx-log-out" />
                </button>
              </div>
          </div>
  )
}

export default Sidebar