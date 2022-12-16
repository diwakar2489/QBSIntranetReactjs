

//var jwt = require("jsonwebtoken");

import React, { useState, useEffect, useRef } from 'react'

import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
function LoginComp() {

    let navigate = useNavigate()
    let SERVER_URL = process.env.REACT_APP_BASE_URL;
    // alert(SERVER_URL);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [crdmsg, setCrdmsg] = useState('');
    const [emailotp, setEmailotp] = useState();
    const [displogin, setDisplogin] = useState(true);
    const [dispforget, setDispforget] = useState(false);
    const [dispotp, setDispotp] = useState(false);
    const [disnewpass, setDisnewpass] = useState(false);
    const [otp, setOtp] = useState();
    const [otperr, setOtperr] = useState('');
    const [errorconfirmpass, setErrorconfirmpass] = useState('');

    const [erroremailotp, setErroremailotp] = useState();
    const [newpass, setNewpass] = useState();
    const [confirmpass, setConfirmpass] = useState();
    const [successmsg, setsuccessmsg] = useState('');

    const now = new Date()


    const Userlogin = () => {
      //alert(SERVER_URL)
        const fetchData = async () => {
            const response = await fetch(SERVER_URL + `api/login`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: pass
                    }),
                })
                .then(res => res.json())
                .then(data => {
                    const tokenDecoded = jwt_decode(data.accessToken)                  
                    if (data.status == true) {
                        const tokenDecoded = jwt_decode(data.accessToken)
                        const item = {
                            value: data.accessToken,
                            expiry: tokenDecoded.exp

                        }
                        localStorage.setItem('key', JSON.stringify(item))
                        localStorage.setItem('userId', tokenDecoded.userId)
                        navigate("/dashboard")
                    } else {
                        setCrdmsg(data.msg);
                    }
                })
        }
        fetchData()
    }



    const [passtype, setPasstype] = useState('password');
    const handleShowPassword = () => {
        setPasstype('text');
    }
    const handlePasswordChange = () => {
        setPasstype('password')
    }

    const dispforgetpass = () => {
        setDisplogin(false)
        setDispforget(true)
    }
    const emailRef = useRef();
    const sendotp = (e) => {
        e.preventDefault()
        setErroremailotp('')
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEmail.test(emailotp)) {
            setErroremailotp('Please enter a valid email address')
            emailRef.current.focus();
            return false;
        } else {
            const response = fetch(SERVER_URL + `api/forgot-password`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: emailotp
                    }),
                })
                .then(res => res.json())
                .then(result => {
                    if (result.status == true) {
                        setDispotp(true);
                        setDispforget(false)
                        setDisplogin(false)
                    } else {
                        setErroremailotp(result.msg)
                    }
                })
        }
    }
    const otpRef = useRef()
    const checkotp = (e) => {
        e.preventDefault()
        const response = fetch(SERVER_URL + `api/otp-verify`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailotp,
                    code: otp
                }),
            })
            .then(res => res.json())
            .then(result => {
                if (result.status == true) {
                    setDisnewpass(true);
                    setDispotp(false);
                } else {
                    setOtperr(result.msg)
                    otpRef.current.focus()

                }
            })
    }
    const newpassRef = useRef()
    const confpassRef = useRef()
    const resetpass = (e) => {
        e.preventDefault()

        if (newpass.length > 4 && newpass == confirmpass) {
            const response = fetch(SERVER_URL + `api/change-password`,
                {
                    method: 'put',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: emailotp,
                        password: newpass
                    }),
                })
                .then(res => res.json())
                .then(result => {
                    setErrorconfirmpass('')
                    if (result.status == true) {
                        setsuccessmsg('Password has been successfully changed')
                        setTimeout(() => {
                            setDisplogin(true);
                            setDisnewpass(false);
                        }, 1000);
                    } else {
                        setErrorconfirmpass('Error! something went wrong')
                    }

                })
        } else {
            setErrorconfirmpass('new and confirm password not match');
            return false
        }
    }
    return (
        <div className="login_container">
            <div className="login_blk">
                <div className="logo_blk1"><img src="assets/images/logo.png" /></div>
                <div id="login" style={{ display: displogin == true ? 'block' : 'none' }}>
                    <form>
                        <h2>Welcome to </h2>
                        <h1>QBS LEARNING</h1>
                        <div className="formblk mb28">
                            <label className="form-label">Enter your username</label>
                            <div className="form-input">
                                <input type="text" onChange={(e) => { setEmail(e.target.value) }} value={email} className="form-control" placeholder="Username or email address" />
                            </div>
                        </div>
                        <div className="formblk mb10">
                            <label className="form-label">Enter your Password</label>
                            <div className="form-input">
                                <input onChange={(e) => { setPass(e.target.value) }} value={pass} type={passtype ? passtype : 'password'} className="form-control" placeholder="Password" />
                                <span className="icon_wrp"><img src="assets/images/eye_crossed.png" onClick={handleShowPassword} onMouseOut={handlePasswordChange} /></span>
                            </div>
                        </div>

                        <div className="forgot_password mb30">
                            <span onClick={dispforgetpass}>Forgot Password</span>
                        </div>
                        <span style={{ color: 'red' }}>{crdmsg}</span>
                        <button type="button" onClick={Userlogin} className="button_login">Login</button>
                    </form>
                </div>
                <div className="whitebox_wrp" style={{ display: dispforget == true ? 'block' : 'none' }}>
                    <form>
                        <h1 className="mb20">Reset Password</h1>
                        <p className="mb25">Enter the email associated with your account and we’ll send an email with instructions to reset your password</p>
                        <div className="formblk mb28">
                            <div className="form-input">
                                <input ref={emailRef} type="text" onChange={e => setEmailotp(e.target.value)} className="form-control" placeholder="Email address" />
                            </div>
                        </div>
                        <span style={{ color: 'red' }}>{erroremailotp}</span>
                        <button className="button_login" onClick={sendotp}>Send Instructions</button>
                    </form>
                </div>
                <div className="whitebox_wrp" style={{ display: dispotp == true ? 'block' : 'none' }}>
                    <form >
                        <h1 className="mb20">Check Your Email</h1>
                        <p className="mb25">We have sent a verification code to your email address.</p>
                        <div className="formblk mb28">
                            <label className="form-label">One Time Password</label>
                            <div className="form-input">
                                <input type="text" onChange={e => setOtp(e.target.value)} ref={otpRef} className="form-control" placeholder="Enter One Time Password" />
                            </div>
                        </div>
                        <span style={{ color: 'red' }}>{otperr}</span>
                        <button className="button_login" onClick={checkotp}>Submit</button>
                    </form>
                </div>
                <div className="whitebox_wrp" style={{ display: disnewpass == true ? 'block' : 'none' }}>
                    <form >
                        <h1 className="mb20">Create New Password</h1>
                        <p className="mb25">Your new password must be different from previous used password</p>
                        <div className="formblk mb28">
                            <label className="form-label">Password</label>
                            <div className="form-input">
                                <input useRef={newpassRef} onChange={e => setNewpass(e.target.value)} type="password" className="form-control" placeholder="Enter new password" />
                            </div>
                            <div className="mgstext">Must be at least 8 characters.</div>
                        </div>
                        <div className="formblk mb10">
                            <label className="form-label">Confirm Password</label>
                            <div className="form-input">
                                <input useRef={confpassRef} onChange={e => setConfirmpass(e.target.value)} type="password" className="form-control" placeholder="Enter confirm password" />
                            </div>
                            <div className="mgstext mb30">Both passwords must match. </div>
                        </div>
                        <span style={{ color: 'red' }}>{errorconfirmpass}</span>
                        <span style={{ color: 'green' }}>{successmsg}</span>
                        <button className="button_login" onClick={resetpass} >Reset Password</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default LoginComp
