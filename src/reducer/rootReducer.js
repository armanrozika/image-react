
const initState = {
    data: [],
    favlist: [],
    showcolor: 'hidecol',
    hidecolor: 'classzero',
    colorstate: []
}

const Reducer = (state = initState, action)=>{
    if(action.type === 'fetch_data'){
    	//console.log(action.payload.data[0])
        return {
            ...state,
            data: action.payload.data,
            loadstate: 'loading'
        }
    }
    if(action.type === 'fetch_next'){
    	console.log(state.data)
    	return {
    		...state,
    		data: [...state.data, ...action.payload.data]
    	}
    }
    if(action.type === 'add_favorite'){
    	return{
    		...state,
    		favlist: [...state.favlist, action.payload]
    	}
    }
    if(action.type === 'remove_favorite'){
    	console.log(action.payload)
    	state.favlist.splice(action.payload, 1)
    	return {
    		...state,
    	}
    }
    return state;
}

export default Reducer;