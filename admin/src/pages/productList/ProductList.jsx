import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {MovieContext} from "../../context/MovieContext/MovieContext"
import axios from "axios";
import { deleteMoviesFailure, deleteMoviesStart, getMoviesFailure, getMoviesStart, getMoviesSuccess } from "../../context/MovieContext/MovieAction";
export default function ProductList() {
  const {movies,dispatch} = useContext(MovieContext)
  


  useEffect(()=>{
    const getMovies = async()=>{
      dispatch(getMoviesStart())
      try {
        const res = await axios.get("/movies", {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
     
        dispatch(getMoviesSuccess(res.data));
      } catch (error) {
       dispatch(getMoviesFailure()) 
      }
    }
    getMovies();
  },[dispatch])

  const handleDelete = async(id) => {
    dispatch(deleteMoviesStart())
    try {
         await axios.delete("/movies/"+id,{
        headers:{
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        }
      })
      dispatch(deleteMoviesStart(id));
    } catch (error) {
      dispatch(deleteMoviesFailure())
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "year", width: 120 },
    { field: "limit", headerName: "limit", width: 120 },
    { field: "isSeries", headerName: "isSeries", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{ pathname: "/product/" + params.row._id,  movie: params.row  }}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={movies}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
