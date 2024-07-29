import { useContext, useEffect, useState } from "react";
import "./NewList.css";
import { MovieContext } from "../../context/MovieContext/MovieContext";
import { getMoviesFailure, getMoviesStart, getMoviesSuccess } from "../../context/MovieContext/MovieAction";
import axios from "axios";
import { ListContext } from "../../context/ListContext/ListContext";
import { createListFailure, createListStart, createListSuccess } from "../../context/ListContext/ListAction";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function NewList() {
  const [list, setList] = useState(null);

  const {dispatch} = useContext(ListContext)
  const {movies,dispatch:dispatchMovie} = useContext(MovieContext)

  const history = useHistory()
  useEffect(()=>{
    const getMovies = async()=>{
      dispatchMovie(getMoviesStart())
      try {
        const res = await axios.get("/movies", {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
     
        dispatchMovie(getMoviesSuccess(res.data));
      } catch (error) {
        dispatchMovie(getMoviesFailure()) 
      }
    }
    getMovies();
  },[dispatchMovie])

  const handleChange = (e)=>{
    const value = e.target.value;
    setList({...list,[e.target.name]:value})
  }
  const handleSelect = (e)=>{
    const selectOptions = Array.from(e.target.selectedOptions).map(option=>option.value)
    setList({...list,[e.target.name]:selectOptions})
    // const selectOption = Array.from(e.target.selectedOptions)

    // const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    // console.log(selectOption)
  }
console.log(list)
  const handleSubmit = async(e)=>{
    e.preventDefault()
    dispatch(createListStart());
    try {
      const res = await axios.post("/lists",list,{
        headers:{
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        }
      })
      dispatch(createListSuccess(res.data))
      history.push("/lists")
    } catch (error) {
      dispatch(createListFailure())
    }
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm">
        
        
      <div className="formLeft">
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="Popular Movies"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <input
              type="text"
              placeholder="action"
              name="genre"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Type</label>
            <select name="type" onChange={handleChange}>
              <option>Type</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>
        <div className="formRight">
          <div className="addProductItem">
              <label>Content</label>
              <select
              multiple
              name="content"
              onChange={handleSelect}
              style={{ height: "280px" }}
            >
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        
          
          <button className="addProductButton" onClick={handleSubmit}>Create</button>
       
         
      </form>
    </div>
  );
}
