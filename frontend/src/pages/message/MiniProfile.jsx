// library or external function to be used in program
import { useState } from "react"
import { useAuthContext } from "../../context/AuthContext"
import useChangeStatus from "../../hooks/useChangeStatus"

const MiniProfile = () => {
    // allows to use user information to display
    const {authUser} = useAuthContext()
    // allows the miniprofile to expand when clicked upon
    const [style, setStyle] = useState("personal-status")
    // imported function to change status
    const { newstatus } = useChangeStatus()

    // function to expand miniprofile depending on value of style
    const Expand = () => {
        if (style !== "change-status") setStyle("change-status");
        else setStyle("personal-status");
    }

    // functions to be called depending on what status the user wants
    const Idle = async () => {
        await newstatus("../Messageimg/idle.png") // sets status in database as a string as images are in the public folder
    }

    const Online = async () => {
        await newstatus("../Messageimg/active1.png")
    }

    const Invis = async () => {
        await newstatus("../Messageimg/invis.png")
    }

    const DND = async () => {
        await newstatus("../Messageimg/dnd.png")
    }

    return(
        <div onClick={Expand} className={style}>
            {/* displays status for user */}
            <img src={authUser.status} className="status-image" alt="" />
            {/* displays profile picture for user */}
            <div className="profile-pic">
                <img src={authUser.profilePic} alt="" />
            </div>
            {/* displays username for user */}
            <div className="details">
                <span>{authUser.username}</span>
            </div>
            {/* displays all statuses that the user can choose from */}
            <div className="statues">
                <button className="online-status" onClick={Online}>
                    <img src="./Messageimg/active1.png" alt="" />
                    <span>Online</span>
                </button>
                <button className="invisible-status" onClick={Invis}>
                    <img src="./Messageimg/invis.png" alt="" />
                    <span>Invisible</span>
                </button>
                <button className="idle-status" onClick={Idle}>
                    <img src="./Messageimg/idle.png" alt="" />
                    <span>Idle</span>
                </button>
                <button className="dnd-status" onClick={DND}>
                    <img src="./Messageimg/dnd.png" alt="" />
                    <span>Do Not Disturb</span>
                </button>
            </div>
        </div>
    )
}

export default MiniProfile