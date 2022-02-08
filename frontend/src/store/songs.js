
const GET_ALL_SONGS = 'songs/getAllSongs';
const ADD_SONG = 'songs/addSong';


const getAllSongs = (songs) => {

    return {
        type: GET_ALL_SONGS,
        allSongs: songs
    }
}

const addSong = (song) => {
    return {
        type: ADD_SONG,
        song
    }
}

export const allSongs = () => async(dispatch) => {
    const response = await fetch('/api/songs');
    const allSongs = await response.json();


    dispatch(getAllSongs(allSongs));
    return response;
}

const initialState = {songs: null};

const songsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case GET_ALL_SONGS:
            newState = {...state};
            newState.songs = action.allSongs
            return newState;
        default:
            return state;
    }
};

export default songsReducer;
