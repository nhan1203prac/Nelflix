import { ArrowBackOutlined } from '@mui/icons-material'
import "./Watch.scss"
import { Link, useLocation } from 'react-router-dom'

export default function Watch() {
  const location = useLocation()

  const movie = location.state.movie
  return (
    <div className='watch'>
      <Link to='/'>
        <div className="back">
            <ArrowBackOutlined/>
            Home
        </div>
      </Link>
        <iframe className='video' src={movie.video} allow='autoplay' allowFullScreen={true}>

        </iframe>
    </div>
  )
}
