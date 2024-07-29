import React, { useContext, useEffect, useState } from 'react'
import "./Navbar.scss"
import { ArrowDropDown, Notifications, Search } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthContext/AuthContext';
import { logout } from '../../AuthContext/AuthAction';

export default function Navbar() {
    const [isScrolled, setScrolled] = useState(false)
    const {dispatch} = useContext(AuthContext)
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.pageYOffset !== 0);
            //Khi trạng thái setScrolled thay đổi thì nó sẽ re-render 1 lần gây ra log số 1
        };

        window.addEventListener("scroll", handleScroll);
        console.log(1)
        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    },[]);

    const handleLogout = ()=>{
      dispatch(logout())
    }
  return (
    <div className={isScrolled?"navbar scrolled":"navbar"}>
      <div className="container">
        <div className="left">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" 
            alt="" />
            <span>Homepage</span>
            <Link to="/series" className='link'>
            <span className='navbarmainLinks'>Series</span>
            </Link>
            <Link to="/movies" className='link'>
            <span className='navbarmainLinks'>Movies</span>
            </Link>
            <span>New and popular</span>
            <span>My list</span>
        </div>
        <div className="right">
            <Search className='icon'/>
            <span>KID</span>
            <Notifications className='icon'/>
            <img src='https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'/>
            <div className="profile">
                <ArrowDropDown className='icon'/>
                <div className="options">
                    <span>Settings</span>
                    <span onClick={handleLogout}>Logout</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
