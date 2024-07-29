import { createContext, useEffect, useReducer } from "react"
import MovieReducer from "./MovieReducer"


const INIT_STATE = {
    movies:[],
    isFetching:false,
    error:false
}

export const MovieContext = createContext(INIT_STATE)

export const MovieContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(MovieReducer,INIT_STATE)

    
    return(
        <MovieContext.Provider value={{movies:state.movies,isFetching:state.isFetching,error:state.error,dispatch}}>
            {children}
        </MovieContext.Provider>
    )
}