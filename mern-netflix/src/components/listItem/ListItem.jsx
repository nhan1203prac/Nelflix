import { Add, PlayArrow, ThumbDownAltOutlined, ThumbDownOutlined, ThumbUpAltOutlined } from "@mui/icons-material"
import "./ListItem.scss"
import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default function ListItem({item,index}) {
  const [isHovered, setHovered] = useState(false)
  const [movie, setMovie] = useState({})

  const trailer = "https://drive.google.com/file/d/1sxtH_IOAyiFaeKwRNI_YDG33abpO_noj/preview"


  useEffect(()=>{
    const getMovie = async()=>{
      try {
        const res = await axios.get("/movies/find/"+item)
        console.log(res.data)
        setMovie(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getMovie()
  },[item])
  return (
    <Link to="/watch" state={{movie }}>
    <div className='listItem' 
      onMouseEnter={()=>setHovered(true)} 
      onMouseLeave={()=>setHovered(false)} style={{left: isHovered ? index * 225 - 50 + index * 2.5 : '0'}}>
        <img src={movie.img} 
        alt="" />
        {isHovered && 
        (<>
        {/* <video src={trailer} autoPlay={true} loop muted controls/> */}
        <iframe className='video' src={movie.trailer} allow='autoplay' allowFullScreen={true}></iframe>

        
        <div className="itemInfo">
            <div className="icons">
                <PlayArrow  className="icon"/>
                <Add className="icon"/>
                <ThumbUpAltOutlined className="icon"/>
                <ThumbDownOutlined className="icon"/>


            </div>
            <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limit">+{movie.limit}</span>
                <span>{movie.year}</span>
            </div>
            <div className="desc">
              {movie.desc}
              
            </div>
            <div className="genre">
              {movie.genre}
            </div>
        </div>
        </>)
        }
    </div>
        </Link>
  )
}
