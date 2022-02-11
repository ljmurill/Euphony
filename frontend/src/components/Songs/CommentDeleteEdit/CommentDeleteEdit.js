import React, { useState } from 'react';
import '../../Songs/song.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function CommentDeleteEdit({comment}){
    const [icons, setIcons] = useState(false);

    const handleMouseOver = (e) => {
        e.preventDefault();
            e.stopPropagation();
            console.log('mouseEnter')
            setIcons(true);


    }

    const handleMouseLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();

            console.log('mouseLeave')
            setIcons(false);

    }
    let iconOnComment = (
        <div className="iconLiving">
            <FontAwesomeIcon icon='trash-can'  color="black"/>
            <FontAwesomeIcon icon='pen-to-square' color="black"/>
        </div>);

        return(
            <div onMouseEnter={handleMouseOver} onMouseLeave={handleMouseLeave} className={`comment ${comment.id}`}>
                {comment.body}
                {/* {icons ? iconOnComment: ''} */}
                {icons ? iconOnComment: ''}
            </div>
        )

}

export default CommentDeleteEdit;
