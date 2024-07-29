import { useEffect, useState } from "react";
import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import axios from "axios";

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([])

  useEffect(()=>{
    const getNewUsers = async()=>{
      try {
        const res = await axios.get("/users?new=true",{
          headers:{
            token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODYyYzNmNmYyOWI5ZjNjMTE5NzA3OSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyMDA4NTYwMywiZXhwIjoxNzIwNTE3NjAzfQ.mCKgAoL_iIK8M6RPZEPJ0YEqf6M3Hk2sATh4fklMu9g "
          }
        })
        setNewUsers(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getNewUsers();
  },[])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map(user=>(

          <li className="widgetSmListItem">
          <img
            src={user.profilePic || "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"}
            alt=""
            className="widgetSmImg"
            />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        
      ))}
      </ul>
    </div>
  );
}
