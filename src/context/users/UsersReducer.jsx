const UsersReducer=(state,action) => {
    switch (action.type) {
        case 'ADD_USER':
            return {...state,users:[...state.users,action.payload]};
        case 'SET_USERS':
            return {...state,users:action.payload};
        case 'SET_LOADING':
            return {...state,loading:action.payload};

        case 'UPDATE_USER':
            return {...state,users:state.users.map(user => user._id === action.payload._id ? action.payload:user)}

        case 'DELETE_USER':
            return{
                ...state,
                users:state.users.filter(user=>user._id!==action.payload)
            }
        
        default:
            return state;
    }
  
}

export default UsersReducer