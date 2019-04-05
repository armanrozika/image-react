
const initState = {
    data: 'data-dummy'
}

const Reducer = (state = initState, action)=>{
    if(action.type === 'fetch_data'){
        return {
            ...state,
            data: action.payload
        }
    }
    return state;
}

export default Reducer;