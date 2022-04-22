import { useDispatch, useSelector } from "react-redux";
import '../../Songs/song.css';
import { useState } from "react";
import {editOneSong} from '../../../store/songs';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function EditSong({theSong, setShowModal}){
    // theSong.url.split('\\')[2]
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState(theSong.title);
    const [imageUrl, setImageUrl] = useState(theSong.imageUrl);
    const [errors, setErrors] = useState([]);


    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrors([]);

        const newSong = {
            userId: sessionUser.id,
            title,
            url: theSong.url,
            imageUrl
        }



        const songError =  await dispatch(editOneSong(newSong, theSong.id))
            .catch(async (res) => {
                const data = await res.json();
                if(data && data.errors) setErrors(data.errors);
            })

        if(songError && songError.status === 200){

           setShowModal(false);
           history.push(`/songs/${theSong.id}`)
        }

    }


    const updateFileImage = (e) => {
        const file = e.target.files[0];
        if (file) setImageUrl(file);
      };


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


                <form className="songForm" onSubmit={handleSubmit}>
                    <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder="Title"
                    className="input"
                    type='text'/>
                    <input type='file' id='imageEditFile' name='image' hidden onChange={updateFileImage}/>
                    <label htmlFor='imageEditFile'><FontAwesomeIcon icon="fa-solid fa-file-image" color='white' size="2x" className="iconHover"/>
                    {imageUrl ? <FontAwesomeIcon icon="fa-solid fa-circle-check" color="green" className="checkmarkImage"/> : ''}</label>
                    {/* <input
                    onChange={(e) => setImageUrl(e.target.value)}
                    value={imageUrl}
                    placeholder="Image Url (Optional)"
                    className="input"
                    type='text'/> */}

                    <button type="submit" className="songButton">Update Song</button>
                </form>


            </div>
        </div>
    )
}

export default EditSong;
