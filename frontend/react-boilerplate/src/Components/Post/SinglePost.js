import React from 'react';

function SinglePost(props) {
    return (
        <div>
            <h1>{props.post.title}</h1>
            <img src={props.post.image} alt="post icon" />
            <h3>Post created by: {props.post._creator.username}</h3>
            <p>{props.post.body}</p>
            <p>Created: {props.post.created}</p>





            {props.post._comments.map((comment, _id) => {
                return (
                    <div key={_id}>

                        <h3>Comment: {comment.body}</h3>
                        <p>Comment by: {comment.username}</p>
                        <p>Created: {comment.created}</p>
                        <button onClick={() => props.deleteComment(comment._id)}>Delete Comment</button>
                    </div>
                )
            })}
        </div>
    )

}

export default SinglePost