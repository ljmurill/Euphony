
import Navigation from "../../Navigation";
import { useDispatch, useSelector } from "react-redux";
import '../../Songs/song.css';
import { useState } from "react";
import {editOneSong} from '../../../store/songs';
import { useHistory, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function EditSong({theSong, setShowModal}){
    // theSong.url.split('\\')[2]
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState(theSong.title);
    const [songLink, setSongLink] = useState(theSong.url);
    const [imageUrl, setImageUrl] = useState(theSong.imageUrl);
    const [errors, setErrors] = useState([]);


    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrors([]);
        let newSong;
        if(songLink){
            newSong = {
                userId: sessionUser.id,
                title,
                url: songLink,
                imageUrl
            }
        }else{

            newSong = {
                userId: sessionUser.id,
                title,
                url: theSong.url,
                imageUrl
            }

        }

        const songError =  await dispatch(editOneSong(newSong, theSong.id))
            .catch(async (res) => {
                const data = await res.json();
                if(data && data.errors) setErrors(data.errors);
            })

        if(songError && songError.status === 200){
           console.log('hello');
           setShowModal(false);
           history.push(`/api/songs/${theSong.id}`)
        }

    }



    return(
        <div className="editSong">
            <div className="editSongDiv">
                <div className="formHeader">
                <h2 className="formTitle">Always Improving</h2>
                <FontAwesomeIcon icon="headphones" className="headphones" size="2x"/>
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
                    <input
                    onChange={(e) => setSongLink(e.target.value)}
                    value={songLink}
                    placeholder="Song Url"
                    className="input"
                    type='text'
                    />
                    {/* <div className="warning">Leave section below empty to keep song</div>
                    <div className="file">
                        <input
                        id="fileInput"
                        onChange={(e) => {
                            setSongLink(e.target.value)
                            console.log(songLink)}}
                        value={songLink}
                        placeholder="Mp3 Url Link"
                        type='file'/>
                        <label htmlFor='fileInput' className="labelFileInput">Choose file...</label>
                        <span className='fileName' onChange={(e) => setSongLink(e.target.value)}>{songLink}</span>
                    </div> */}
                    <button type="submit" className="songButton">Update Song</button>
                </form>
                    {/* <i className="fa-solid fa-up-from-line fa-3x"/> */}

            </div>
        </div>
    )
}

export default EditSong;
