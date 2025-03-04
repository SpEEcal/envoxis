import { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import useDeleteUser from '../../hooks/useDeleteUser';
import useUpdateUsername from '../../hooks/useUpdateUsername';
import Sidebar from '../sidebar/Sidebar';
import './settings.css';
import useUpdateEmail from '../../hooks/useUpdateEmail';
import useUpdatePFP from '../../hooks/useUpdatePFP';
import $ from "jquery"
import useUpdateProfile from '../../zustand/useUpdateProfile';

const Settings = () => {
    // for mobile users -  prevents sidebar from moving
    $('style').append("<style type='text/css'>@media screen and (max-width: 1316px) {.sidebar-container {width: 100px;}}</style>");
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
    // sets phone number so that phone number can be updated
    const [phonenumber, setPhonenumber] = useState("")

    // imports function to update the profile picture
    const { updatePFP } = useUpdatePFP()
    // sets profile picture so that profile picture can be updated
    const [file, setFile] = useState("")

    // imports hook so that the update profile page can be seen
    const {selectedUpdateProfile, setSelectedUpdateProfile} = useUpdateProfile()

    useEffect(() => {
            //cleanup func
            return () => {
                setSelectedUpdateProfile(null)
            }
        },[setSelectedUpdateProfile])

    // waits for the username to be updated
    const handleSubmitUsername = async (e) => {
        e.preventDefault() // prevents website from refreshing
        await updateUsername(username)
    }
    // waits for the email to be updated
    const handleSubmitEmail = async (e) => {
        e.preventDefault() // prevents website from refreshing
        await updateEmail(email)
    }

    // waits for the phone number to be updated
    const handleSubmitPhoneNumber = async (e) => {
        e.preventDefault() // prevents website from refreshing
        await updatePhoneNumber(phonenumber)
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

    // allows update profile page to be displayed
    const DisplayUpdateProfilePage = () => {
        setSelectedUpdateProfile("notnull")
        $('style').append("<style type='text/css'>@media screen and (max-width: 1316px) {.sidebar-container {width: 100px;} .option-listing {width: 90vw; display: block;} .menu-filter {display: none;} #updatepfp {margin-left: 0px; align-items: center; justify-content: center;} .pfp-submit{margin-top: 20px;} .titleUP {margin-top: 20px;}}</style>");
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
                    <div className="menu-filter">
                        <h1 className="title-settings"> Settings</h1>
                        <div className="menu-option-buttons" onClick={(e) => DisplayUpdateProfilePage()}>Update Profile</div>
                    </div>
                    <div className="option-listing">
                        { selectedUpdateProfile == null && (
                            <div className='nothing-container'>
                                <div className="text-settings">Press one of the sections to find what you are searching for</div>
                                <i className="bx bx-left-arrow-alt" id='text-settings-icon'/>
                            </div>
                        )}
                        { selectedUpdateProfile != null && (
                            <div>
                                <h1 className="titleUP">Update User Profile</h1>
                                <h1 className="update-pfp-title">Update Profile Picture</h1>
                                    <form id='updatepfp'>
                                        <label htmlFor="pfp-upload"><img src={authUser.profilePic} className='UpdatePFP'/></label>
                                        <input type='file' id='pfp-upload' placeholder={authUser.profilePic} onChange={onInputChange}/>
                                        <button type="submit" form='updatepfp' className="pfp-submit" onClick={handleSumbitPFP}>Submit Image <i className="bx bx-send"/></button>
                                    </form>
                                    <div className="update-profile-container">
                                    <form onSubmit={handleSubmitUsername}>
                                        <h1 className="modification-title">Update Username</h1>
                                        <input type='text' className="Change" placeholder={authUser.username} 
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </form>
                                    <form onSubmit={handleSubmitEmail}>
                                        <h1 className="modification-title"> Update Email Address</h1>
                                        <input type='text' className="Change" placeholder={authUser.email} 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </form>
                                    <form onSubmit={handleSubmitPhoneNumber}>
                                        <h1 className="Cmodification-title"> Update Phone Number</h1>
                                        <input type='text' className="Change" placeholder={authUser.phonenumber} 
                                            value={phonenumber}
                                            onChange={(e) => setPhonenumber(e.target.value)}
                                        />
                                    </form>
                                </div>
                                {/* once pressed function will be executed to delete user */}
                            <button className="DeleteUser" onClick={deleteUser}>Delete Account</button>
                            </div>
                        )}
                    </div>
                </div>
            </>
        )
}

export default Settings

// return(
//     <>
//         <meta charSet="UTF-8" />
//         <meta name="viewpoint" content="width=device-width, initial-scale=1.0" />
//         <title>Envoxis | Settings</title>
//         {/*- Box icons */}
//         <link
//             href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
//             rel="stylesheet"
//         />
//         <div className="settings-container">
//             <Sidebar />
//             <div className="update-profile-photo-container"></div>
//             <div className="option-listing"></div>
//             <div className="profile-view">
//                 <h1 className="titleUP">Update Profile</h1>
//                 <form id='updatepfp' className='Update3'>
                    // <hi className="title-pfp">Current Profile Picture</hi>
                    // <label htmlFor="pfp-upload"><img src={authUser.profilePic} className='ChangePFP'/></label>
                    // {/* <label for="file-upload" class="custom-file-upload"><i className="bx bx-paperclip" /></label>
                    // <input type="file" name="file" id="file-upload" onChange={onInputChange}/> gets file from user to be sent to other user */}
                    // <input type='file' id='pfp-upload' placeholder={authUser.profilePic} onChange={onInputChange}/>
                    // <button type="submit" form='updatepfp' className="pfp-submit" onClick={handleSumbitPFP}>Submit Image<i className="bx bx-send" /></button>
                    // </form>
//                 <form className="Update1" onSubmit={handleSubmitUsername}>
//                     <h1 className="CUTitle">Username</h1>
//                     <i className="bx bx-pencil" />
//                     <input type='text' className="ChangeUsername" placeholder={authUser.username} 
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                 </form>
//                 <form className="Update2" onSubmit={handleSubmitEmail}>
//                     <h1 className="CETitle">Email Address</h1>
//                     <i className="bx bx-pencil" />
//                     <input type='text' className="ChangeEmail" placeholder={authUser.email} 
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                 </form>
//                 {/* once pressed function will be executed to delete user */}
//                 <button className="DeleteUser" onClick={deleteUser}>Delete Account</button>
//             </div>
//         </div>
//     </>
// )