const initUserState = {
    expired: '',
    rest: '',
    user : ''
};

const UserReducer = (state = initUserState, action) => {
    switch (action.type) {
        case "CONNECT": {
            return {
                expired: action.expired,
                rest: action.rest,
                user: action.user
            }
        }
        case "LOGOUT": {
            return {expired: '', rest: '', user: ''}
        }

    }
    return state
};


export default UserReducer
