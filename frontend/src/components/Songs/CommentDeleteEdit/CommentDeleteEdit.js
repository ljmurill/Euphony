import React, { useState } from 'react';
import '../../Songs/song.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { deleteOneComment } from '../../../store/comments';
import { useHistory } from 'react-router-dom';



function CommentDeleteEdit({comment, setComment, setEdit, setCommentId, songId}){
    const [icons, setIcons] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleMouseOver = () => {
        setIcons(true);
    }

    const handleMouseLeave = () => {
        setIcons(false);
    }

    const handleEditComment = () => {
        setComment(comment.body);
        const commentDiv = document.querySelector(`#comment${comment.id}`);
        setCommentId(comment.id);
        console.log(commentDiv);
        // commentDiv.remove();
        commentDiv.classList.add('hidden');
        setEdit(true)
    }

    const handleDelete = async() => {

        const finished = await dispatch(deleteOneComment(comment, comment.id, songId))
            .catch(async (res) => {
                const data = await res.json();
            })

            if(finished && finished.status === 200){
                history.push(`/api/songs/${songId}`);
            }
    }

    let iconOnComment = (
        <div className="iconLiving">
            <FontAwesomeIcon icon='trash-can'  color="black" onClick={handleDelete}/>
            <FontAwesomeIcon icon='pen-to-square' color="black" onClick={handleEditComment}/>
        </div>);

        return(
            <div onMouseEnter={handleMouseOver} onMouseLeave={handleMouseLeave} className={`comment`}>
                {comment.body}
                {/* {icons ? iconOnComment: ''} */}
                {icons ? iconOnComment: ''}
            </div>
        )

}

export default CommentDeleteEdit;
