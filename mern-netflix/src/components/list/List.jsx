import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@mui/icons-material'
import "./List.scss"
import ListItem from '../listItem/ListItem'
import { useRef, useState } from 'react'

export default function List({list}) {
  const listRef = useRef()
  const [slideNumber, setSlideNumer] = useState(0)
  const [isMoved,setIsmoved] = useState(false)
  const handleClick = (direction)=>{
    setIsmoved(true)
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if(direction==="left" && slideNumber > 0){
      setSlideNumer(slideNumber - 1)
      listRef.current.style.transform =  `translateX(${distance + 230}px)`;
    }
    if(direction==="right" && slideNumber <5){
      setSlideNumer(slideNumber + 1)
      listRef.current.style.transform =  `translateX(${distance - 230}px)`;
    }
  }
  return (
    <div className='list'>
        <span className="listTitle">{list.title}</span>
        <div className="wrapper">
            <ArrowBackIosOutlined className='sliderArrow left' onClick={()=>handleClick("left")} style={{display:!isMoved&&"none"}}/>
            <div className="container" ref={listRef}>
            {list.content.map((item,index)=>(

            <ListItem index={index} item={item}/>
            ))}
            
            </div>
            <ArrowForwardIosOutlined className='sliderArrow right' onClick={()=>handleClick("right")}/>
        </div>
    </div>
  )
}
