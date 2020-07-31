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
                        <p>Comment: {comment.body}</p>
                        <p>Created: {comment.created}</p>
                    </div>
                )
            })}
        </div>
    )

}

export default SinglePost