import React, { Component } from 'react';

import { fetchReply } from "../../Service/api_helper";

//custom imports
import Reply from './Reply';

class SinglePost extends Component {
    constructor() {
        super()
        this.state = {
            replies: null
        }
    }
    //get comment reply by id
    getReply = async (id) => {
        const reply = await fetchReply(id)
        console.log(reply)
        // const keys = Object.keys(reply)
        // console.log(keys)
        this.setState({
            replies: reply
        })

        console.log(this.state.replies)
    }

    render() {
        return (
            <div>
                <h1>{this.props.post.title}</h1>
                <img src={this.props.post.image} alt="post icon" />
                <h3>Post created by: {this.props.post._creator.username}</h3>
                <p>{this.props.post.body}</p>
                <p>Created: {this.props.post.created}</p>

                {this.props.post._comments.map((comment, _id) => {
                    return (
                        <div key={_id}>
                            <button onClick={() => this.getReply(comment._id)}>See replies!</button>

                            <h3>Comment: {comment.body}</h3>
                            <p>Comment by: {comment.username}</p>
                            <p>Created: {comment.created}</p>
                            <button onClick={() => this.props.deleteComment(comment._id)}>Delete Comment</button>
                        </div>

                    )

                })}
                {this.state.replies ? (<Reply replies={this.state.replies} />) : (<p>No replies yet</p>)}

            </div>
        )
    }
}

export default SinglePost