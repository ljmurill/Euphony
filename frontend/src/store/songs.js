import { csrfFetch } from "./csrf";

const GET_ALL_SONGS = 'songs/getAllSongs';
const ADD_SONG = 'songs/addSong';
const EDIT_SONG = 'songs/editSong';


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

const editSong = (song, songId) => {
    return{
        type: EDIT_SONG,
        song,
        songId
    }
}


export const allSongs = () => async(dispatch) => {
    const response = await csrfFetch('/api/songs');
    const allSongs = await response.json();

    console.log(allSongs)

    dispatch(getAllSongs(allSongs));
    return response;
}

export const addOneSong = (song) => async(dispatch)=>{
    const response = await csrfFetch('/api/songs/create',{
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(song)
    });
    console.log('RESPONSE')
    if(response.ok){
        const newSong = await response.json();

        dispatch(addSong(newSong));

    }

    return response;
}

export const editOneSong = (song, songId) => async(dispatch) => {
   
    const response = await csrfFetch(`/api/songs/${songId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(song)
    })

    if(response.ok){
        const updatedSong = await response.json();
        dispatch(editSong(updatedSong, songId))
    }

    return response;
}

const initialState = {songs: []};

const songsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case GET_ALL_SONGS:
            newState = {...state};
            newState.songs = [...action.allSongs];
            return newState;
        case ADD_SONG:
            newState = {...state};
            console.log(action.song)
            newState.songs = [...newState.songs, action.song];
            return newState;
        case EDIT_SONG:
            newState = {...state};
            console.log('YELLOW', action.song);
            console.log('HELLO BOZO', newState.songs[action.songId]);
            newState.songs[action.songId] = {...action.song};
            return newState;
        default:
            return state;
    }
};

export default songsReducer;
