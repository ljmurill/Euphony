import Navigation from "../Navigation";
import { useDispatch, useSelector } from "react-redux";
import { allComments, postComment } from "../../store/comments";
import '../Songs/song.css';
import { useEffect, useState } from "react";
import { useHistory, Redirect, useParams } from "react-router-dom";
import CommentDeleteEdit from "./CommentDeleteEdit/CommentDeleteEdit";
import EditFormModal from "./EditFormModal";
import DeleteFormModal from "./DeleteFormModal/DeleteSong";
import {updateOneComment} from '../../store/comments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactAudioPlayer from 'react-audio-player';

function SpecificSongPage({isLoaded}){
    const defaultImage = 'https://preview.redd.it/e1l2mfuraia51.jpg?width=960&crop=smart&auto=webp&s=598397a1367b7a4a7c273d10a0298d6b848a1c94';
    const {songId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [edit, setEdit] = useState(false);
    // const [queueDelete, setQueueDelete] = useState(false);
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState([]);
    const [commentId, setCommentId] = useState('');
    const songs = useSelector(state => state.songs.songs);
    const theSong = songs.find(song => song.id === +songId);
    const sessionUser = useSelector(state => state.session.user);
    const commentsArr = useSelector(state => state.comments);
    console.log(theSong.url.split('\\')[2])

    useEffect(() =>{
        dispatch(allComments(+songId))
    }, [dispatch])

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setErrors([]);
        if(!edit){
            const newComment = {
                userId: sessionUser.id,
                songId,
                body: comment
            }
            const commentError =  await dispatch(postComment(newComment, theSong.id))
                .catch(async (res) => {
                    const data = await res.json();
                    if(data && data.errors) setErrors(data.errors);
                })

            if(commentError && commentError.status === 200){
                setComment('');
                setErrors([]);
                history.push(`/api/songs/${theSong.id}`)
            }
        }else{
            const updatedComment = {
                userId: sessionUser.id,
                songId,
                body: comment
            }

            const updateError = await dispatch(updateOneComment(updatedComment, commentId, theSong.id))
                .catch(async (res) => {
                    const data = await res.json();
                    if(data && data.errors) setErrors(data.errors);
                })

            if(updateError && updateError.status === 200){
                const commentDiv = document.querySelector(`#comment${commentId}`);
                commentDiv.classList.remove('hidden');
                setCommentId('');
                setEdit(false)
                setComment('');
                setErrors([]);
                history.push(`/api/songs/${theSong.id}`)
            }
        }

    }
    let iconOnPage;


    if(sessionUser.id === theSong.User.id){
        iconOnPage = (
            <div className="iconLiving">
            <DeleteFormModal song ={theSong}/>
            <EditFormModal song ={theSong}/>
            </div>
        )
    }


    return(
        <>

        <div className="songPageDiv">
            <Navigation isLoaded={isLoaded}/>
            <div className="songDetailsDiv">
                <div className="leftSide">
                    <div className="playSide">
                        {/* <FontAwesomeIcon icon="circle-play" size="4x" className="play" /> */}
                        {/* <ReactAudioPlayer
                            src={`${theSong.url}`}
                            autoPlay
                            controls
                            /> */}
                        <div className="songNameUser">
                            <h1 className='h1Song'><span className="theSongTitle">{theSong.title}</span></h1>
                            <div className='theSongUsername'>{theSong.User.username}</div>
                        </div>
                    </div>
                        <audio controls src={`${theSong.url}`}></audio>
                </div>
                <div className="rightSide">
                    <img className='specificSongImage' src={theSong.imageUrl ? theSong.imageUrl : defaultImage}/>
                    {iconOnPage}
                </div>
            </div>
        </div>

        <div className="commentSection">

            <form onSubmit={handleSubmit} className='commentForm'>
                <img className="formSongImage" src={theSong.imageUrl ? theSong.imageUrl : defaultImage}/>
                <input
                className="commentInput"
                type='text'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder='Write Comment...'
                />
                <button type="submit" className="commentButton">Comment</button>
            </form>
            {errors.length > 0 ? <div className="errorsSection">
                    {errors.map((error, i) => {
                        return <li className='errorsList' key = {i}>{error}</li>
                    })}
                </div>: ''}
            <div className="allComments">
                {commentsArr && commentsArr.comments.map((comment1, i)=>{
                    return (
                        <div key={i} id={`comment${comment1.id}`}>
                            <CommentDeleteEdit songId = {theSong.id} setCommentId={setCommentId} setEdit ={setEdit} comment = {comment1} setComment ={setComment}/>
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    )

}

export default SpecificSongPage;
