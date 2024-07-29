import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import axios from 'axios'
export default function Home() {
  const MONTHS = useMemo(()=>
    [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
  
    ],[]
  )
  const [userStats, setUserStats] = useState([])

  useEffect(()=>{
    const getStats = async()=>{
      try {
        const res = await axios.get("/users/stats")
        const  statsList = res.data.sort((a,b)=>a._id-b._id)
        statsList.map(item=>setUserStats(pre=>[...pre,{name:MONTHS[item._id-1],"New User":item.total}]))
      } catch (error) {
        console.log(error)
      }
    }
    getStats();
  },[])
  console.log(userStats)
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
