import React, { Component } from 'react';

import { fetchReply, createReply, deleteReply } from "../../Service/api_helper";

//custom imports
import Reply from './Reply';

import "../../Css/Post.css"

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
            <div className="singPostCont">

                <div className="singPost">
                    <h1>{this.props.post.title}</h1>
                    <img src={this.props.post.image} alt="post icon" />
                    <h2>{this.props.post.body}</h2>
                    <p>Post created by: {this.props.post._creator.username}</p>
                    <p>Created: {this.props.post.created}</p>
                </div>
                <div className="commentsInfo">
                    <div>
                        {this.props.post._comments.map((comment, _id) => {
                            return (
                                <div key={_id} className="replyTop">
                                    <h3>Comment: {comment.body}</h3>
                                    <p>Comment by: {comment.username}</p>
                                    <p>Created: {comment.created}</p>
                                    <button onClick={() => this.getReply(comment._id)}>See replies!</button>
                                    <button onClick={() => this.props.deleteComment(comment._id)}>Delete Comment</button>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        {this.state.replies ? (<Reply replies={this.state.replies} id={this.state.commentId} handleSubmit={this.createReply} handleDelete={this.deleteReply} />) : (<p>...</p>)}
                    </div>
                </div>
            </div>
        )
    }
}

export default SinglePost