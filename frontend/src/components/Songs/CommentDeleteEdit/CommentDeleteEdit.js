import React, { useState } from 'react';
import '../../Songs/song.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function CommentDeleteEdit({comment, setComment, setEdit, setCommentId}){
    const [icons, setIcons] = useState(false);

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
        commentDiv.remove();
        setEdit(true)
    }

    let iconOnComment = (
        <div className="iconLiving">
            <FontAwesomeIcon icon='trash-can'  color="black"/>
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
