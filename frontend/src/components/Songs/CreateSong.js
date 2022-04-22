import Navigation from "../Navigation";
import { useDispatch, useSelector } from "react-redux";
import '../Songs/song.css';
import React, { useEffect, useState } from "react";
import {addOneSong} from '../../store/songs';
import { useHistory, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function CreateSong({isLoaded}){
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState('');
    const [song, setSong] = useState(null);
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrors([]);

        const newSong = {
            userId: sessionUser.id,
            title,
            url: song,
            imageUrl : image
        }

        const songError =  await dispatch(addOneSong(newSong))
            .catch(async (res) => {
                const data = await res.json();
                console.log(data,'========')
                if(data && data.errors) setErrors(data.errors);
            })

        if(songError && songError.status === 200){
            history.push('/');
        }
    }



    const updateFileImage = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
      };
    const updateFileSong = (e) => {
        const file = e.target.files[0];
        if (file) setSong(file);
        };
    return(
        <div className="createSong">
            <Navigation isLoaded={isLoaded}/>
            <div className="createSongDiv">
                <div className="formHeader">
                <h1 className="formTitle">Share your Music</h1>
                <FontAwesomeIcon icon="headphones" className="headphones" size="2x"/>
                </div>
                {errors.length > 0 ? <div className="errorsSection">
                    {errors.map((error, i) => {
                        return <li className='errorsList' key = {i}>{error}</li>
                    })}
                </div>: ''}

                <form className="songForm" onSubmit={handleSubmit}>
                    <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder="Title"
                    className="input"
                    type='text'/>
                    <div className="fileIcons">
                        <input type='file' id='imageFile' name='image' onChange={updateFileImage} hidden/>
                        <label htmlFor='imageFile'><FontAwesomeIcon icon="fa-solid fa-file-image" color='white' size="2x" className="iconHover"/>
                        {image ? <FontAwesomeIcon icon="fa-solid fa-circle-check" color="green" className="checkmarkImage"/> : ''}
                        </label>
                        <input type='file' id='songFile' name="song" onChange={updateFileSong} hidden/>
                        <label htmlFor='songFile'><FontAwesomeIcon icon="fa-solid fa-file-audio" color='white' size="2x" className="iconHover"/>
                        {song ? <FontAwesomeIcon icon="fa-solid fa-circle-check" color="green" className="checkmarkSong"/> : ''}
                        </label>
                    {/* {song ? <FontAwesomeIcon icon="fa-solid fa-circle-check" color="green" className="checkmarkSong"/> : ''} */}
                    {/* {image ? <FontAwesomeIcon icon="fa-solid fa-circle-check" color="green" className="checkmarkImage"/> : ''} */}
                    </div>
                        <button type="submit" className="songButton">Upload Song</button>
                </form>

            </div>
        </div>
    )
}

export default CreateSong;
