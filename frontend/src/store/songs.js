import { csrfFetch } from "./csrf";

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
    const response = await csrfFetch('/api/songs');
    const allSongs = await response.json();


    dispatch(getAllSongs(allSongs));
    return response;
}

export const addOneSong = (song) => async(dispatch)=>{
    const response = await csrfFetch('/api/songs/create',{
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(song)
    });
    if(response.ok){
        const newSong = await response.json();
        dispatch(addSong(newSong));
    };
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
        case ADD_SONG:
            newState = {...state};
            newState.songs.songs = [...newState.songs.songs, action.song];
            return newState;
        default:
            return state;
    }
};

export default songsReducer;
