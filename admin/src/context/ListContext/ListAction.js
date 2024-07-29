export const getListsStart = ()=>{
    return{
        type:"GET_LISTS_START"
    }
}
export const getListsSuccess = (lists)=>{
    return{
        type:"GET_LISTS_SUCCESS",
        payload:lists,
    }
}
export const getListsFailure = ()=>{
    return{
        type:"GET_LISTS_FAILURE"
    }
}
export const createListStart = ()=>{
    return{
        type:"CREATE_LIST_START"
    }
}
export const createListSuccess = (list)=>{
    return{
        type:"CREATE_LIST_SUCCESS",
        payload:list,
    }
}
export const createListFailure = ()=>{
    return{
        type:"CREATE_LIST_FAILURE"
    }
}
export const updateListStart = ()=>{
    return{
        type:"UPDATE_LIST_START"
    }
}
export const updateListSuccess = (movies)=>{
    return{
        type:"UPDATE_LIST_SUCCESS",
        payload:movies,
    }
}
export const updateListFailure = ()=>{
    return{
        type:"UPDATE_LIST_FAILURE"
    }
}
export const deleteListStart = ()=>{
    return{
        type:"DELETE_LIST_START"
    }
}
export const deleteListSuccess = (id)=>{
    return{
        type:"DELETE_LIST_SUCCESS",
        payload:id,
    }
}
export const deleteListFailure = ()=>{
    return{
        type:"DELETE_LIST_FAILURE"
    }
}