export function setUsername (name) {
    return {
        type: "SET_USERNAME",
        name: name
    }
}

export function setProfilePhoto (photo) {
    return {
        type: "SET_PROFILE_PHOTO",
        photo: photo
    }
}

export function closeMyBounties () {
    return {
        type: "CLOSE_MY_BOUNTIES",
    }
}

export function openMyBounties () {
    return {
        type: "OPEN_MY_BOUNTIES",
    }
}


export function login (account) {
    return {
        type: "LOGIN",
        account: account
    }
}

export function logout () {
    return {
        type: "LOGOUT",
    }
}

export function menuChange (val) {
    return (dispatch, getState) => {
        var {main} = getState();
        if ( main.menuVisible != val ) {
        	dispatch({
        		type: "MENU_CHANGE",
        		menuVisible: val
        	})
        }
    }
}

export function menuToggle () {
    return (dispatch, getState) => {
    	var {main} = getState();
        var newMenuVal = !main.menuVisible
        dispatch( menuChange(newMenuVal) );
    }
}