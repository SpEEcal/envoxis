import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import './Login.css';
import useSignup from '../../hooks/useSignup';
import useLogin from '../../hooks/useLogin';

const Login = () => {
    //sign in
    const [inputs, setInputs] = useState({
        username: '',
        email:'',
        phonenumber:'',
        password: '',
        confirmPassword: ''
    })

    const {loading, signup } = useSignup()

    const handleSubmit1 = async (e) => {
        e.preventDefault()
        await signup(inputs)
    }

    //login
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const {loading2, login } = useLogin()
    const handleSubmit2 = async (e) => {
        e.preventDefault()
        console.log(username)
        await login(username, password)
    }

    const [RBtn, setStyleOne] = useState('registerBtn');
    const [LBtn, setStyleTwo] = useState('loginBtn');
    const [LForm, setStyleThree] = useState('login-form');
    const [RForm, setStyleFour] = useState('register-form');

    const LoginClick = () => {
        console.log("you just clicked");
        if (RBtn !== "registerBtn") setStyleOne("registerBtn");
        else setStyleTwo("loginBtn");
        if (LBtn !== "loginBtn") setStyleTwo("loginBtn");
        else setStyleOne("registerBtn");
        if (LForm !== "login-form") setStyleThree("login-form");
        else setStyleFour("register-form")
        if (RForm !== "register-form") setStyleFour("register-form");
        else setStyleThree("login-form")
    }
    const SignInClick = () => {
        console.log("you just clicked");
        if (RBtn !== "loginBtn") setStyleOne("loginBtn");
        else setStyleTwo("registerBtn");
        if (LBtn !== "registerBtn") setStyleTwo("registerBtn");
        else setStyleOne("loginBtn");
        if (LForm !== "register-form") setStyleThree("register-form");
        else setStyleFour("login-form")
        if (RForm !== "login-form") setStyleFour("login-form");
        else setStyleThree("register-form")
    }

    return (
        <div>
            <meta charSet="UTF-8" />
            <meta name="viewpoint" content="width=device-width, initial-scale=1.0" />
            <title>Envoxis | Register</title>
            {/*- Box icons */}
            <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
            {/* form */}
            <div className="body">
            <div className="form-container">
            {/* column 1 */}
            <div className="col col-1">
                {/* images */}
                <div className="images">
                    <img src="./img/Lines.png" className="form-image-main" />
                    <img src="./img/squiggles.png" className="form-image squiggles" />
                    <img src="./img/beachball.png" className="form-image beachball" />
                    <img src="./img/sandcastle.png" className="form-image sandcastle" />
                    <img src="./img/Logo.png" className="form-image Logo" />
                    <img src="./img/bubbles.png" className="form-image bubbles" />
                    <img src="./img/sparkles.png" className="form-image sparkles" />
                </div>
                <p className="ImageTxt">You Are A Few Minutes Away From Boosting Your Messaging Game With <span>Envoxis</span></p>
            </div>
            {/* column 2 */}
            <div className=" col col-2">
                <div className="btn-box">
                    <div className={LBtn}>
                        <button className="LoBtn" id="login" onClick={LoginClick}>Sign In</button>        {/* buttons for the user to pick an option*/}
                    </div>
                    <div className={RBtn}>
                        <button className="ReBtn" id="register" onClick={SignInClick}>Sign Up</button>
                    </div>
                </div>
                {/* Login form */}
                <div className={LForm}>
                <div className="form-title">
                    <span>Sign In</span>
                </div>
                <form onSubmit={handleSubmit2}>
                    <div className="form-inputs">
                        <div className="input-box">
                        <input type="text" className="input-field" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <i className="bx bx-user icon" />
                        </div>
                        <div className="input-box">
                        <input type="password" className="input-field" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <i className="bx bx-lock-alt icon" />
                        </div>
                        <div className="forgot-pass">
                        <a href="#">Forgot Password?</a>
                        </div>
                        <div className="input-box">
                        <button type="submit" className="input-submit">
                            <span> Sign In</span>
                            <i className="bx bx-right-arrow-alt" />
                        </button>
                        </div>
                        <div className="social-login">
                        <i className="bx bxl-google" />
                        <i className="bx bxl-facebook" />
                        <i className="bx bxl-twitter" />
                        <i className="bx bxl-github" />
                        </div>
                    </div>
                </form>
                </div>
                {/* Register form */}
                <div className={RForm}>
                <div className="form-title">
                    <span>Create Account</span>
                </div>
                <form onSubmit={handleSubmit1}>
                    <div className="form-inputs">
                        <div className="input-box">
                        <input type="text" className="input-field" placeholder="Username" required value={inputs.username} onChange={(e) => setInputs({...inputs, username: e.target.value})} />
                        <i className="bx bx-user icon" />
                        </div>
                        <div className="input-box">
                        <input type="text" className="input-field" placeholder="Email" required value={inputs.email} onChange={(e) => setInputs({...inputs, email: e.target.value})} />
                        <i className="bx bx-envelope icon" />
                        </div>
                        <div className="input-box">
                        <input type="text" className="input-field" placeholder="Phone number" required value={inputs.phonenumber} onChange={(e) => setInputs({...inputs, phonenumber: e.target.value})} />
                        <i className="bx bx-phone icon" />
                        </div>
                        <div className="input-box">
                        <input type="password" className="input-field" placeholder="Password" required value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value})} />
                        <i className="bx bx-lock-alt icon" />
                        </div>
                        <div className="input-box">
                        <input type="password" className="input-field" placeholder="Confirm Password" required value={inputs.confirmPassword} onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}/>
                        <i className="bx bx-lock-alt icon" />
                        </div>
                        <div className="input-box">
                        <button type="submit" className="input-submit">
                            <span> Sign Up</span>
                            <i className="bx bx-right-arrow-alt" />
                        </button>
                        </div>
                        <div className="social-login">
                        <i className="bx bxl-google" />
                        <i className="bx bxl-facebook" />
                        <i className="bx bxl-twitter" />
                        <i className="bx bxl-github" />
                        </div>
                    </div>
                    </form>
                </div>
            </div>
            </div>
            </div>
        </div>
    )
}

export default Login