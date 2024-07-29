import { Link,useLocation } from "react-router-dom";
import "./List.css";
import { Publish } from "@material-ui/icons";
import { useState } from "react";
import { updateListFailure, updateListStart, updateListSuccess } from "../../context/ListContext/ListAction";
import { useContext } from "react";
import { ListContext } from "../../context/ListContext/ListContext";
import axios from 'axios'

export default function List() {
    const location = useLocation()
    const list = location.list
    const [listUpdate, setListUpdate] = useState(null)
    const {dispatch} = useContext(ListContext)
   

    

    const handleChange = (e)=>{
        const value = e.target.value
        setListUpdate({...listUpdate,[e.target.name]:value})
    }

    const handleUpdate = async(e)=>{
        e.preventDefault()
        dispatch(updateListStart());
        try {
          const res = await axios.patch("/lists/"+list._id,listUpdate,{
            headers:{
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
          })
          dispatch(updateListSuccess(res.data))
        } catch (error) {
          dispatch(updateListFailure())
        }
    }
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newList">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          
          <div className="productTopRight">
              <div className="productInfoTop">
                  <span className="productName">{list.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{list._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">type:</span>
                      <span className="productInfoValue">{list.type}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">genre:</span>
                      <span className="productInfoValue">{list.genre}</span>
                  </div>
                  
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Movie title</label>
                  <input type="text" name="title" placeholder={list.title} onChange={handleChange} />
                  <label>Type</label>
                  <input type="text" name="type" placeholder={list.type} onChange={handleChange}/>
                  <label>Genre</label>
                  <input type="text" name="genre" placeholder={list.genre} onChange={handleChange}/>
                 
              </div>
         
              <div className="productFormRight">
                 
                  <button className="productButton" onClick={handleUpdate}>Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
