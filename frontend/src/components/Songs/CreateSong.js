import Navigation from "../Navigation";
import { useDispatch, useSelector } from "react-redux";
import '../Songs/song.css';
import { useEffect, useState } from "react";
import {addOneSong} from '../../store/songs';
import { useHistory, Redirect } from "react-router-dom";

function CreateSong({isLoaded}){
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState('');
    const [songLink, setSongLink] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrors([]);

        const newSong = {
            userId: sessionUser.id,
            title,
            url: songLink,
            imageUrl
        }

        const songError =  await dispatch(addOneSong(newSong))
            .catch(async (res) => {
                const data = await res.json();
                if(data && data.errors) setErrors(data.errors);
            })

        if(songError && songError.status === 200){
            reset();
            history.push('/');
        }
    }

    const reset = () => {
        setTitle('');
        setSongLink('');
        setImageUrl('');
        setErrors([]);
    }

    return(
        <div className="createSong">
            <Navigation isLoaded={isLoaded}/>
            <div className="createSongDiv">
                <div className="formHeader">
                <h1 className="formTitle">Share your Music</h1>
                <i className="fa-solid fa-boombox"></i>
                </div>
                {errors.length > 0 ? <div className="errorsSection">
                    {errors.map((error, i) => {
                        return <li className='errorsList' key = {i}>{error}</li>
                    })}
                </div>: ''}
                {/* {errors.length > 0 &&
                    errors.map((error, i) => {
                        return <li className='errorsList' key = {i}>{error}</li>
                    })} */}

                <form className="songForm" onSubmit={handleSubmit}>
                    <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder="Title"
                    className="input"
                    type='text'/>
                    <input
                    onChange={(e) => setImageUrl(e.target.value)}
                    value={imageUrl}
                    placeholder="Image Url (Optional)"
                    className="input"
                    type='text'/>
                    <div className="file">
                        <input
                        id="fileInput"
                        onChange={(e) => setSongLink(e.target.value)}
                        value={songLink}
                        placeholder="Mp3 Url Link"
                        type='file'/>
                        <label htmlFor='fileInput' className="labelFileInput">Choose file...</label>
                        <span className='fileName' onChange={(e) => setSongLink(e.target.value)}>{songLink}</span>
                    </div>
                    <button type="submit" className="songButton">Upload Song</button>
                </form>
                    {/* <i className="fa-solid fa-up-from-line fa-3x"/> */}
            </div>
        </div>
    )
}

export default CreateSong;
