import React, { Component } from 'react';

import { fetchReply, createReply, deleteReply } from "../../Service/api_helper";

//custom imports
import Reply from './Reply';

class SinglePost extends Component {
    constructor() {
        super()
        this.state = {
            replies: null,
            commentId: ''
        }
    }
    // get comment reply by id
    getReply = async (id) => {
        const reply = await fetchReply(id)
        this.setState({
            replies: reply.reply,
            commentId: reply._id,
            modal: true
        })
    }


    //Create Reply
    createReply = async (e, id, body) => {
        e.preventDefault();
        const newReply = await createReply(id, body);
        const currentReplies = this.state.replies;
        currentReplies.push(newReply);
        this.setState({
            replies: currentReplies
        })
        this.getReply(id)
    }

    //Delete a reply
    deleteReply = async (id) => {
        await deleteReply(id);
        this.getReply(this.state.commentId)
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
                            <h3>Comment: {comment.body}</h3>
                            <p>Comment by: {comment.username}</p>
                            <p>Created: {comment.created}</p>
                            <button onClick={() => this.getReply(comment._id)}>See replies!</button>
                            <button onClick={() => this.props.deleteComment(comment._id)}>Delete Comment</button>
                        </div>
                    )
                })}
                {this.state.replies ? (<Reply replies={this.state.replies} id={this.state.commentId} handleSubmit={this.createReply} handleDelete={this.deleteReply} />) : (<p>No replies yet</p>)}
            </div>
        )
    }
}

export default SinglePost