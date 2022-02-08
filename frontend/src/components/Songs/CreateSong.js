import Navigation from "../Navigation";
import { useDispatch, useSelector } from "react-redux";
import './song.css'
import { useEffect, useState } from "react";
import {addOneSong} from '../../store/songs';

function CreateSong({isLoaded}){
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState('');
    const [songLink, setSongLink] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([])

        const newSong = {
            userId: sessionUser.id,
            title,
            url: songLink,
            imageUrl
        }

        const promise = dispatch(addOneSong(newSong))
        console.log(promise)

        if(promise){
            promise
                .catch(async (res) => {
                    const data = await res.json();
                    if(data && data.errors) setErrors(data.errors);
                })
        }

    }

    return(
        <div className="createSong">
            <Navigation isLoaded={isLoaded}/>
            <div className="createSongDiv">
                {errors.length > 0 &&
                    errors.map((error, i) => {
                        return <li key = {i}>{error}</li>
                    })}
                <form className="songForm" onSubmit={handleSubmit}>
                    <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder="Title"
                    className="input"
                    type='text'/>
                    <input
                    onChange={(e) => setSongLink(e.target.value)}
                    value={songLink}
                    placeholder="Mp3 Url Link"
                    className="input"
                    type='file'/>
                    <input
                    onChange={(e) => setImageUrl(e.target.value)}
                    value={imageUrl}
                    placeholder="Image Url"
                    className="input"
                    type='text'/>
                    <button type="submit">Upload Song</button>
                </form>
            </div>
        </div>
    )
}

export default CreateSong;
