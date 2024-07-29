import { useRef, useState } from "react"
import "./Register.scss"
import {Navigate, useNavigate} from "react-router-dom"
import axios from 'axios'
export default function Register() {
    const [email, setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [username,setUsername] = useState("")
    const emailRef = useRef()

    const navigate = useNavigate()
    const handleStart = ()=>{
        setEmail(emailRef.current.value)
    }
    const handleFinish = async(e)=>{
        e.preventDefault()
        try {
            await axios.post("/auth/register",{email,username,password})
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }
    const handleNav = ()=>{
        console.log("connect")
        navigate("/login")
    }
  return (
    <div className="register">
        <div className="top">
            <div className="wrapper">

                <img className="logo" 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" 
                alt="" />
                <button className="loginButton" onClick={handleNav}>Sign in</button>
            </div>
        </div>
        <div className="container">
            <h1>Unlimited movies, TV shows, and more.</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <p>
            Ready to watch? Enter your email to create or restart your membership.
            </p>
            {!email?(

                <div className="input">
                    <input type="email" placeholder="email address" ref={emailRef} />
                    <button className="registerButton" onClick={handleStart}>Get started</button>
                </div>
            ):(
                <form className="input">
                    <input type="text" placeholder="username" onChange={e=>setUsername(e.target.value)} />
                    <input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)} />
                    <button className="registerButton" onClick={handleFinish}>
                    Start
                    </button>
                </form>
            )}
        </div>
    </div>
  )
}
