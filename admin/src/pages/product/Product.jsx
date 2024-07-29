import { Link,useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { Publish } from "@material-ui/icons";
import { useState } from "react";
import { useContext } from "react";
import { MovieContext } from "../../context/MovieContext/MovieContext";
import { updateMovieFailure, updateMovieStart,updateMovieSuccess } from "../../context/MovieContext/MovieAction";
import axios from 'axios'
import storage from "../../firebase";

export default function Product() {
    const location = useLocation()
    const movie = location.movie
    const {dispatch} = useContext(MovieContext)
    const [updateMovie,setUpdateMovie] = useState(null)
    const [img, setImg] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [video, setVideo] = useState(null);

    const handleUpdate = (e)=>{
        const value = e.target.value
        setUpdateMovie({...updateMovie,[e.target.name]:value})
    }

    const deleteFile = async (fileUrl) => {
        const fileRef = storage.refFromURL(fileUrl);
        try {
          await fileRef.delete();
          console.log('File deleted successfully');
        } catch (error) {
          console.error('Error deleting file:', error);
        }
      };
      
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
              setUpdateMovie(pre=>({...pre,[item.label]:url}))
            })
          }
        )
        }
      );
      }
      const handleUpload = async(e)=>{
        e.preventDefault();
        if (img) {
            await deleteFile(movie.img);
          }
          if (trailer) {
            await deleteFile(movie.trailer);
          }
          if (video) {
            await deleteFile(movie.video);
          }
        upload([
          { file: img, label: "img" },
          { file: trailer, label: "trailer" },
          { file: video, label: "video" },
        ]);
      }

      const handleSubmit = async(e)=>{
        e.preventDefault()
        dispatch(updateMovieStart());
        try {
          const res = await axios.put("/movies/"+movie._id,updateMovie,{
            headers:{
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
          })
          dispatch(updateMovieSuccess(res.data))
        } catch (error) {
          dispatch(updateMovieFailure())
        }
      }
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={movie.img} alt="" className="productInfoImg" />
                  <span className="productName">{movie.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{movie._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">year:</span>
                      <span className="productInfoValue">{movie.year}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">genre:</span>
                      <span className="productInfoValue">{movie.genre}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">limit:</span>
                      <span className="productInfoValue">{movie.limit}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Movie title</label>
                  <input type="text" name="title" placeholder={movie.title} onChange={handleUpdate}/>
                  <label>Year</label>
                  <input type="text" name="year" placeholder={movie.year} onChange={handleUpdate} />
                  <label>Genre</label>
                  <input type="text" name="genre" placeholder={movie.genre} onChange={handleUpdate} />
                  <label>Limit</label>
                  <input type="text" name="limit" placeholder={movie.limit} onChange={handleUpdate} />
                  <label>Trailer</label>
                  <input type="file" name="trailer" placeholder={movie.trailer} onChange={e=>setTrailer(e.target.files[0])}/>
                  <label>Video</label>
                  <input type="file" name="video" placeholder={movie.video} onChange={e=>setVideo(e.target.files[0])}/>
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={movie.img} alt="" className="productUploadImg" />
                      <input type="file" name="img" onChange={e=>setImg(e.target.files[0])} />
                      <label for="file">
                          <Publish onClick={handleUpload}/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className="productButton" onClick={handleSubmit}>Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
