const initialState = {
    data: {
        title: "",
        amount: null,
        location: null,
        notes:""
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
        case "SET_AMOUNT":
            return {
                ...state,
                data: {
                    ...state.data,
                    amount: action.amount
                }
            }

        case "SET_LOCATION":
            return {
                ...state,
                data: {
                    ...state.data,
                    location: action.location
                }
            }

        case "SET_NOTES":
            return {
                ...state,
                data: {
                    ...state.data,
                    notes: action.notes
                }
            }
    }

    return state;
}