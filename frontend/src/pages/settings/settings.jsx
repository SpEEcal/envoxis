import { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import useDeleteUser from '../../hooks/useDeleteUser';
import useUpdateUsername from '../../hooks/useUpdateUsername';
import Sidebar from '../sidebar/Sidebar';
import './settings.css';
import useUpdateEmail from '../../hooks/useUpdateEmail';
import useUpdatePFP from '../../hooks/useUpdatePFP';

const Settings = () => {
    const { authUser, setAuthUser } = useAuthContext()

    const { deleteUser } = useDeleteUser()

    const { updateUsername } = useUpdateUsername()
    const [username, setUsername] = useState("")

    const { updateEmail } = useUpdateEmail()
    const [email, setEmail] = useState("")

    const { updatePFP } = useUpdatePFP()
    const [file, setFile] = useState("")

    const handleSubmitUsername = async (e) => {
        await updateUsername(username)
    }

    const handleSubmitEmail = async (e) => {
        await updateEmail(email)
    }

    const handleSumbitPFP = async (e) => {
        const formData = new FormData()
        formData.append("file", file)
        await updatePFP(formData)
        setFile("")
    }

    const ChangePassword = () => {
        console.log("Clicked password forgotten");   
    }

    const onInputChange=(e)=>{
        setFile(e.target.files[0])
    }

    return(
        <>
            <meta charSet="UTF-8" />
            <meta name="viewpoint" content="width=device-width, initial-scale=1.0" />
            <title>Envoxis | Settings</title>
            {/*- Box icons */}
            <link
                href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
                rel="stylesheet"
            />
            <div className="settings-container">
                <Sidebar />
                <div className="menu-filter"></div>
                <div className="option-listing"></div>
                <div className="profile-view">
                    <h1 className="titleUP">Update Profile</h1>
                    <form className='Update3' onSubmit={handleSumbitPFP}>
                        <img src={authUser.profilePic} className='ChangePFP'/>
                        <input type='file' onChange={onInputChange}/>
                        <button type="submit" className="pfp-submit"><i className="bx bx-send" /></button>
                    </form>
                    <form className="Update1" onSubmit={handleSubmitUsername}>
                        <h1 className="CUTitle">Username</h1>
                        <i className="bx bx-pencil" />
                        <input type='text' className="ChangeUsername" placeholder={authUser.username} 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </form>
                    <form className="Update2" onSubmit={handleSubmitEmail}>
                        <h1 className="CETitle">Email Address</h1>
                        <i className="bx bx-pencil" />
                        <input type='text' className="ChangeEmail" placeholder={authUser.email} 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </form>

                    <button className="ChangePassword" onClick={ChangePassword}>Change Password</button>
                    <button className="DeleteUser" onClick={deleteUser}>Delete Account</button>
                </div>
            </div>
        </>
    )
}

export default Settings