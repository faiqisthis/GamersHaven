const UsersReducer=(state,action) => {
    switch (action.type) {
        case 'ADD_USER':
            return {...state,users:action.payload};
        case 'SET_USERS':
            return {...state,users:action.payload};
        case 'SET_LOADING':
            return {...state,loading:action.payload};
        default:
            return state;
    }
  
}

export default UsersReducer