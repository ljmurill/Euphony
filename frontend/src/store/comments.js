import { csrfFetch } from "./csrf";

const GET_ALL_COMMENTS = 'comments/getAllComments';
const ADD_COMMENT = 'comments/addComment';
const UPDATE_COMMENT = 'comments/updateComment'

const getAllComments = (comments, songId)=>{
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

export const allComments = (songId) => async(dispatch) => {
    const response = await csrfFetch(`/api/songs/${songId}/comments`);
    const allComments = await response.json();
    dispatch(getAllComments(allComments, songId));
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
            newState.comments[index] = {...action.comment};
            return newState;
        default:
            return state
    }
}

export default commentReducer;
