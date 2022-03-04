const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_FAVORITE':
            return {
                ...state,
                favoritesList: [action.payload, ...state.favoritesList]
            }
        case 'REMOVE_FAVORITE':
            return {
                ...state,
                favoritesList: state.favoritesList.filter((v,i) => {
                    return i!== action.payload
                })
            }
        default: return state;
    }
}

export default reducer;
