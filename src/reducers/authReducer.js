
export default (state = {}, action) => {
    switch(action.type) {
        case 'SIGN_UP':
            return action.user;
        default:
            return state;
    }
}