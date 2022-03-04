import { createContext, useReducer, useEffect} from "react";
import reducer from './reducer'

const initialState = {
    favoritesList: localStorage.getItem('fav') ? JSON.parse(localStorage.getItem('fav')) : [],
}

export const DataContext = createContext(initialState)

export const ItemContext = (props) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const addFavorite = (e,movie) => {
        // console.log(e)
        e.target.className = 'btn btn-success btn-sm'
        e.target.disabled = true
        e.target.innerText = 'Added!'
        // console.log(movie)
        dispatch({ type: 'ADD_FAVORITE', payload: movie })
    }

    const removeFavorite = (id) => {
        dispatch({ type: 'REMOVE_FAVORITE', payload: id})
    }

    useEffect(() => {
        localStorage.setItem('fav', JSON.stringify(state.favoritesList))
    }, [state]);

    return (
        <DataContext.Provider value={{ favoritesList: state.favoritesList, addFavorite, removeFavorite }}>
            {props.children}
        </DataContext.Provider>
    )
}
