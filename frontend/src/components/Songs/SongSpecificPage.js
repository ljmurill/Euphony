import Navigation from "../Navigation";
import { useDispatch, useSelector } from "react-redux";
import { allSongs, getSpecificSong } from "../../store/songs";
import '../Songs/song.css';
import { useEffect, useState } from "react";
import {addOneSong} from '../../store/songs';
import { useHistory, Redirect, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EditFormModal from "./EditFormModal";

function SpecificSongPage({isLoaded}){
    const defaultImage = 'https://preview.redd.it/e1l2mfuraia51.jpg?width=960&crop=smart&auto=webp&s=598397a1367b7a4a7c273d10a0298d6b848a1c94';
    const {songId} = useParams();
    // const songs = JSON.parse(window.localStorage.getItem('Songs'));
    const songs = useSelector(state => state.songs.songs);
    console.log('HELLO', songs)
    const theSong = songs.find(song => song.id === +songId);
    const sessionUser = useSelector(state => state.session.user);

    let icons;
    if(sessionUser.id === theSong.User.id){
        icons = (
            <div className="iconLiving">
            <EditFormModal song ={theSong}/>
            <FontAwesomeIcon icon='trash-can' color="white" className="trashCan"/>
            </div>
        )
    }

    return(
        <div className="songPageDiv">
            <Navigation isLoaded={isLoaded}/>
            <div className="songDetailsDiv">
                <div className="leftSide">
                    <div>
                        <h1><span className="theSongTitle">{theSong.title}</span></h1>
                        <div className='theSongUsername'>{theSong.User.username}</div>
                    </div>
                </div>
                <div className="rightSide">
                    <img className='specificSongImage' src={theSong.imageUrl ? theSong.imageUrl : defaultImage}/>
                    {icons}
                </div>
            </div>
        </div>
    )

}

export default SpecificSongPage;
