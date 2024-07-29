import { useContext, useState } from "react";
import "./newProduct.css";
import storage from "../../firebase";
import { MovieContext } from "../../context/MovieContext/MovieContext";
import { createMovieFailure, createMovieStart, createMovieSuccess } from "../../context/MovieContext/MovieAction";
import axios from "axios";

export default function NewProduct() {
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const {dispatch} = useContext(MovieContext)
  const handleChange = (e)=>{
    const value = e.target.value;
    setMovie({...movie,[e.target.name]:value})
  }
  const upload = (items)=>{
    items.forEach((item) => {
      const fileName = new Date().getTime()+item.label+item.file.name;
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
      uploadTask.on("state_changed",(snapshot)=>{
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log("Upload is" + progress + "% done.");
      },(error)=>{
        console.log(error)
      },
      ()=>{
        uploadTask.snapshot.ref.getDownloadURL().then(url=>{
          setMovie(pre=>({...pre,[item.label]:url}))
          setUploaded(pre=>pre+1)
        })
      }
    )
    }
  );
  }
  const handleUpload = (e)=>{
    e.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTitle" },
      { file: imgSm, label: "imgSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    dispatch(createMovieStart());
    try {
      const res = await axios.post("/movies",movie,{
        headers:{
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        }
      })
      dispatch(createMovieSuccess(res.data))
    } catch (error) {
      dispatch(createMovieFailure())
    }
  }
  console.log(movie)

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="img" name="img" onChange={e=>setImg(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Title image</label>
          <input type="file" id="imgTitle" name="imgTitle" onChange={e=>setImgTitle(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Thumbnail image</label>
          <input type="file" id="imgSm" name="imgSm" onChange={e=>setImgSm(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" name="title" placeholder="John Wick" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text"  name="desc" placeholder="Description" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input type="text"  name="year" placeholder="Year" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" name="genre" placeholder="Genre" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input type="text" name="duration" placeholder="Duration" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input type="text" name="limit" placeholder="Limit" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Is Series?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input type="file" name="trailer" onChange={e=>setTrailer(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input type="file" name="video"  onChange={(e) => setVideo(e.target.files[0])}/>
        </div>
        {uploaded ===5?(
          
          <button className="addProductButton" onClick={handleSubmit}>Create</button>
        ):(
          <button className="addProductButton" onClick={handleUpload}>Upload</button>
        )}
      </form>
    </div>
  );
}
