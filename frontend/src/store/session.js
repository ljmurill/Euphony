import { csrfFetch } from "./csrf";

const LOG_USER = 'session/logUser';
const REMOVE_USER = 'session/removeUser';

const logUser = (user) => {
    return {
        type: LOG_USER,
        user
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}

export const login = (user) => async(dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });

    const loggedIn = await response.json();
    dispatch(logUser(loggedIn.user));
    return response;
}

export const restoreUser = () => async(dispatch) => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(logUser(data.user));
    return response;
}

export const signup = (user) => async(dispatch) => {
    const {username, email, password} = user;
    const response = await csrfFetch('/api/users',{
        method: 'POST',
        body: JSON.stringify({
            username,
            email,
            password
        })
    });

    const signedUp = await response.json();
    dispatch(logUser(signedUp.user))
    return response;
}

export const logout = () => async(dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    })
    const loggedOut = await response.json();

    if(loggedOut.message === 'success'){
        dispatch(removeUser());
    }
    return response;
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case LOG_USER:
            newState = {...state};
            newState.user = action.user;
            return newState;
        case REMOVE_USER:
            newState = {...state};
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;
