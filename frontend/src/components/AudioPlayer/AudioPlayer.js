import React from 'react';
import { useDispatch } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './audioplayer.css'
function Player({ song }){
    const dispatch = useDispatch();

    const handlePlay = () => {
        // dispatch()
    }

    return(
    <>
            <AudioPlayer
            src={song.url}
            onPlay={handlePlay}
            layout='horizontal-reverse'
            footer
        />
    </>


    )
}

export default Player;
