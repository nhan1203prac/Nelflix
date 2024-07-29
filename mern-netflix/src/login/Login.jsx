import { useContext, useState } from "react"
import "./Login.scss"
import { AuthContext } from "../AuthContext/AuthContext"
import { loginFailure, loginStart, loginSuccess } from "../AuthContext/AuthAction"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const {dispatch} = useContext(AuthContext)
  const navigate = useNavigate()
  const handleSignin = async (e)=>{
    e.preventDefault()
    dispatch(loginStart())
    try {
      const res = await axios.post("/auth/login",{email,password})
      dispatch(loginSuccess(res.data))
      navigate("/")
    } catch (error) {
      dispatch(loginFailure())
    }
  }
  return (
    <div className="login">
        <div className="top">
            <div className="wrapper">
                <img className="logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" 
                alt="" />
            </div>
        </div>
        <div className="container">
        <form>
          <h1>Sign In</h1>
          <input type="email" placeholder="Email or phone number" onChange={e=>setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
          <button className="loginButton" onClick={handleSignin}>Sign In</button>
          <span>
            New to Netflix? <b>Sign up now.</b>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
          </form>
        </div>
    </div>
  )
}
