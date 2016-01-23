const initialState = {
    menuVisible: false,
    bountiesOpen: false,
    account: {

    }
};

export default function main(state = initialState, action) {
    switch( action.type ) {
    	case "TOGGLE_MENU":
    		return {
    			...state,
    			menuVisible: !state.menuVisible
    		}
    	case "MENU_CHANGE":
    		return {
    			...state,
    			menuVisible: action.menuVisible
    		}
    	case "SET_USERNAME":
    		return {
    			...state,
                account: {
                    ...state.account,
                    username: action.name
                }
    		}
        case "OPEN_MY_BOUNTIES":
            return {
                ...state,
                bountiesOpen: true
            }

        case "CLOSE_MY_BOUNTIES":
            return {
                ...state,
                bountiesOpen: false
            }

        case "LOGIN":
            return {
                ...state,
                account: action.account
            }

        case "LOGOUT":
            return {
                ...state,
                account: {}
            }
    }

    return state;
}