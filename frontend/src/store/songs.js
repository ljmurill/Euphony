
const GET_ALL_SONGS = 'songs/getAllSongs';

const getAllSongs = (songs) => {
    return {
        type: GET_ALL_SONGS,
        songs
    }
}

export const allSongs = () => async(dispatch) => {
    const response = await fetch('/api/songs');
    const allSongs = await response.json();
    console.log(allSongs)
    dispatch(getAllSongs(allSongs));
    return response;
}

const initialState = {songs: null};

const songsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case GET_ALL_SONGS:
            newState = {...state};
            newState.songs = {...action.songs};
            return newState;
        default:
            return state;
    }
};

export default songsReducer;
