import useLogout from "../../hooks/useLogout"
import useGetChangeColor from "../../hooks/useGetChangeColor";
import './sidebar.css'
import '../message/message.css';

const Sidebar = () => {
    const {logout} = useLogout() // provides logout function
    const {Change1, Change2, Change4} = useGetChangeColor() // provides changing colours when clicking on a page

  return (
    <div className="sidebar-container">
            <li>
              <a href="#" className="logo">
                <img src="img/Logo.png" alt="Logo" className="sidebar-logo" /> {/* displays website logo */}
              </a>
            </li>
            <div className="sidebar">
              <div className={`sidebar-home ${Change1 ? "bg-dark-dark-purple" : ""}`}>
                <a href="home">
                  <i className="bx bx-home-smile" /> {/* displays home page button */}
                </a>
              </div>
              <div className={`sidebar-chat ${Change2 ? "bg-dark-dark-purple" : ""}`}>
                    <a href="message">
                        <i className="bx bx-chat"></i> {/* displays message page button */}
                    </a>
                </div>
                <div className={`sidebar-settings ${Change4 ? "bg-dark-dark-purple" : ""}`}>
                    <a href="settings">
                        <i className="bx bx-cog"></i> {/* displays settings page button */}
                    </a>
                </div>
            </div>
            <div className="sidebar-log-out">
                <button onClick={logout}>
                    <i className="bx bx-log-out" /> {/* allows user to log out of website */}
                </button>
              </div>
          </div>
  )
}

export default Sidebar