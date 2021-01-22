import users from '../../Data/usersData.json';
import { REMOVE_USER } from '../actions/users';

const initialState = {
    users: users,
    filteredUsers: users
}

export default (state=initialState,action) => {
    switch(action.type){
        case REMOVE_USER:
            const updatedUsers = state.filteredUsers.filter(user => user.id !== action.payload)
            return{
                ...state,
                filteredUsers: updatedUsers
            }
        default:
            return state;
    }
}