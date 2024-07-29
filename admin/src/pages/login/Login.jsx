import React, { useContext, useState } from 'react'
import "./login.css"
import { AuthContext } from '../../context/AuthContext/AuthContext'
import { loginFailure, loginStart, loginSuccess } from '../../context/AuthContext/AuthAction'
import axios from 'axios'
export default function Login() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const {isFetching,dispatch} = useContext(AuthContext)

    const handleLogin = async(e)=>{
        e.preventDefault()
        dispatch(loginStart());
        try {
            const res = await axios.post("/auth/login",{email,password})
            res.data.isAdmin&&dispatch(loginSuccess(res.data))
        } catch (error) {
            dispatch(loginFailure())
        }
    }
  return (
    <div className='login'>
        <form action="" className="loginForm">
            <input type="text" className="loginInput" placeholder='email' onChange={e=>setEmail(e.target.value)} />
            <input type="password" className="loginInput" placeholder='password' onChange={e=>setPassword(e.target.value)}/>
            <button className="loginBtn" onClick={handleLogin}>Login</button>
        </form>
    </div>
  )
}
