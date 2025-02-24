import { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import useDeleteUser from '../../hooks/useDeleteUser';
import useUpdateUsername from '../../hooks/useUpdateUsername';
import Sidebar from '../sidebar/Sidebar';
import './settings.css';
import useUpdateEmail from '../../hooks/useUpdateEmail';
import useUpdatePFP from '../../hooks/useUpdatePFP';

const Settings = () => {
    // imports the signed in users information
    const { authUser, setAuthUser } = useAuthContext()

    // imports the function to delete a user from the websites database
    const { deleteUser } = useDeleteUser()

    // imports function to update username
    const { updateUsername } = useUpdateUsername()
    // sets username so that username can be updated
    const [username, setUsername] = useState("")

    // imports function to update email
    const { updateEmail } = useUpdateEmail()
    // sets email so that email can be updated
    const [email, setEmail] = useState("")

    // imports function to update the profile picture
    const { updatePFP } = useUpdatePFP()
    // sets profile picture so that profile picture can be updated
    const [file, setFile] = useState("")

    // waits for the username to be updated
    const handleSubmitUsername = async (e) => {
        e.preventDefault()
        await updateUsername(username)
    }
    // waits for the email to be updated
    const handleSubmitEmail = async (e) => {
        e.preventDefault()
        await updateEmail(email)
    }

    // waits for the profile picture to be updated
    const handleSumbitPFP = async (e) => {
        e.preventDefault()
        // creates an array for form data
        const formData = new FormData()
        // adds file as item in array
        formData.append("file", file)
        // executes to change the profile picture
        await updatePFP(formData)
        // resets file to empty string
        setFile("")
    }

    // function to change the password of a user
    const ChangePassword = () => {
        console.log("Clicked password forgotten");   
    }

    // sets file to the chosen file by user
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
                    <form id='updatepfp' className='Update3'>
                        <label htmlFor="pfp-upload"><img src={authUser.profilePic} className='ChangePFP'/></label>
                        {/* <label for="file-upload" class="custom-file-upload"><i className="bx bx-paperclip" /></label>
                        <input type="file" name="file" id="file-upload" onChange={onInputChange}/> gets file from user to be sent to other user */}
                        <input type='file' id='pfp-upload' placeholder={authUser.profilePic} onChange={onInputChange}/>
                        <button type="submit" form='updatepfp' className="pfp-submit" onClick={handleSumbitPFP}><i className="bx bx-send" /></button>
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
                    {/* once pressed function will be executed to delete user */}
                    <button className="DeleteUser" onClick={deleteUser}>Delete Account</button>
                </div>
            </div>
        </>
    )
}

export default Settings