import { csrfFetch } from "./csrf";

const GET_ALL_COMMENTS = 'comments/getAllComments';
const ADD_COMMENT = 'comments/addComment';
const UPDATE_COMMENT = 'comments/updateComment';
const DELETE_COMMENT = 'comments/deleteComment';

const getAllComments = (comments)=>{
    return {
        type: GET_ALL_COMMENTS,
        comments
    }
}

const addComment = (comment) => {
    return{
        type: ADD_COMMENT,
        comment
    }
}

const updateComment = (comment, commentId) => {
    return{
        type:UPDATE_COMMENT,
        comment,
        commentId

    }
}

const deleteComment = (comment, commentId) => {
    return{
        type: DELETE_COMMENT,
        comment,
        commentId
    }
}

export const allComments = (songId) => async(dispatch) => {
    const response = await csrfFetch(`/api/songs/${songId}/comments`);
    const allComments = await response.json();
    dispatch(getAllComments(allComments));
    return response;
}

export const postComment = (comment, songId) => async(dispatch) => {
    const response = await csrfFetch(`/api/songs/${songId}/comments`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment)
    })

    if(response.ok){
        const newComment = await response.json();
        dispatch(addComment(newComment))
    }

    return response;
}

export const updateOneComment = (comment, commentId, songId) => async(dispatch) => {
    const response = await csrfFetch(`/api/songs/${songId}/comments/${commentId}`,{
        method:'PUT',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(comment)
    });

    if(response.ok){
        const updatedComment = await response.json();
        dispatch(updateComment(updatedComment, commentId))
    }
    return response;
}

export const deleteOneComment = (comment, commentId, songId) => async(dispatch) => {
    const response = await csrfFetch(`/api/songs/${songId}/comments/${commentId}`, {
        method: 'DELETE',
    })

    const deletedComment = await response.json();
    if(deletedComment.message === 'Success'){
        dispatch(deleteComment(comment, commentId));
    }
    return response;
}

const initialState = {comments: []}

const commentReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case GET_ALL_COMMENTS:
            newState = {...state};
            newState.comments = [...action.comments];
            return newState
        case ADD_COMMENT:
            newState = {...state};
            newState.comments = [action.comment, ...newState.comments]
            return newState;
        case UPDATE_COMMENT:
            newState = {...state};
            let index;

            newState.comments.forEach((comment, i) => {
                if(comment.id === action.commentId){
                    index = i;
                }
            })
            console.log('HELLO', action.comment);
            console.log('NEWW', newState.comments[index]);
            const newComments = [...newState.comments];
            newComments[index] = {...action.comment};
            // newComments.splice(index, 1);
            // const newestComments = [{...action.comment}, ...newComments]
            newState.comments = newComments;
            return newState;
        case DELETE_COMMENT:
            newState = {...state};
            let deleteIndex;
            newState.comments.forEach((comment, i) => {
                if(comment.id === action.commentId){
                    deleteIndex = i;
                }
            })

            if(newState.comments[deleteIndex]) delete newState.comments[deleteIndex];
            return newState;
        default:
            return state
    }
}

export default commentReducer;
