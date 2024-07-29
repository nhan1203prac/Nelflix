import "./ListList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import axios from "axios";
import { ListContext } from "../../context/ListContext/ListContext";
import { deleteListFailure, deleteListStart, deleteListSuccess, getListsFailure, getListsStart, getListsSuccess } from "../../context/ListContext/ListAction";
export default function ListList() {
  const {lists,dispatch} = useContext(ListContext)
  


  useEffect(()=>{
    const getLists = async()=>{
      dispatch(getListsStart())
      try {
        const res = await axios.get("/lists", {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
     
        dispatch(getListsSuccess(res.data))
      } catch (error) {
       dispatch(getListsFailure()) 
      }
    }
    getLists();
  },[dispatch])

  const handleDelete = async(id) => {
    dispatch(deleteListStart())
    try {
         await axios.delete("/lists/"+id,{
        headers:{
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        }
      })
      dispatch(deleteListSuccess(id));
    } catch (error) {
      dispatch(deleteListFailure())
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "title",
      headerName: "Title",
      width: 250,
     
    },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "type", headerName: "Type", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{ pathname: "/list/" + params.row._id,  list: params.row  }}>
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
        rows={lists}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
