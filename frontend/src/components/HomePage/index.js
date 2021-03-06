import Navigation from "../Navigation";
import { useDispatch, useSelector } from "react-redux";
import { allSongs } from "../../store/songs";
import '../HomePage/homePage.css'
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import LoginForm from "../LoginFormModal/LoginForm";
import { Modal } from "../../context/Modal";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import LoginSongModal from "../LoginFormModal/loginSongsSetup";





const defaultImage = "https://preview.redd.it/e1l2mfuraia51.jpg?width=960&crop=smart&auto=webp&s=598397a1367b7a4a7c273d10a0298d6b848a1c94";

function Home({isLoaded}){
    const dispatch =useDispatch();
    const songsArr = useSelector(state => state.songs.songs);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(allSongs())
      }, [dispatch])



    return(
        <>
            <div className="homeHeader">
                <Navigation isLoaded={isLoaded}/>
                <SearchBar allSongs={songsArr}/>
            </div>

            <h3 className="titleSongs">What's new on Euphony!</h3>
            <div className="songs">
                {sessionUser && songsArr && songsArr.map((song, id) => {

                    return (id < 20 &&
                        <Link to={`/songs/${song.id}`} key={id} className='linkSong'>
                        <div className="songBlock">
                            <div className="imageDiv">
                                {song.imageUrl ? <img src={song.imageUrl} alt='' className='songImage'/>: <img alt='' src={defaultImage} className='songImage'/>}
                            </div>
                                <div className="optionsSongs">
                                    <div>
                                    <p className="songDetails title">{song.title}</p>
                                    <p className="songDetails username">{song.User.username}</p>
                                    </div>
                                </div>
                        </div></Link>
                    )

                })}
                {!sessionUser && songsArr && songsArr.map((song, id) => {

                    return (id < 20 &&
                        <div key={id}>
                            <LoginSongModal song={song}/>
                        </div>
                    )

                })}
            </div>
            <footer className="myInfo">
                <div className="myName">
                Created By Leonel Murillo
                </div>
                <div className="aboutLinks">
                <a href="https://www.linkedin.com/in/leonel-murillo/"><FontAwesomeIcon icon={faLinkedin} size='2x' color='black' className="aboutMe"/></a>
                <a href="https://github.com/ljmurill/Euphony"><FontAwesomeIcon icon={faGithub} size='2x' color="black" className="aboutMe"/></a>
                </div>

            </footer>
        </>

    )
}

export default Home;
