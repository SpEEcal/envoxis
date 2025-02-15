import { useState } from "react"
import { useAuthContext } from "../../context/AuthContext"
import useChangeStatus from "../../hooks/useChangeStatus"

const MiniProfile = () => {
    const {authUser} = useAuthContext()
    const [style, setStyle] = useState("personal-status")
    const { newstatus } = useChangeStatus()

    const Expand = () => {
        if (style !== "change-status") setStyle("change-status");
        else setStyle("personal-status");
    }

    const Idle = async () => {
        await newstatus("../Messageimg/idle.png")
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
            <img src={authUser.status} className="status-image" alt="" />
            <div className="profile-pic">
                <img src={authUser.profilePic} alt="" />
            </div>
            <div className="details">
                <span>{authUser.username}</span>
            </div>
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