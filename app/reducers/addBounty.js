const initialState = {
    data: {
        title: ""
    }
};

export default function main(state = initialState, action) {
    switch( action.type ) {
    	case "SET_TITLE":
    		return {
    			...state,
    			data: {
                    ...state.data,
                    title: action.title
                }
    		}
    }

    return state;
}