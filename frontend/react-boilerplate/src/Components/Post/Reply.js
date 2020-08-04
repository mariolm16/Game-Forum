import React, { Component } from 'react';

import "../../Css/Post.css"

class Reply extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reply: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    render(props) {
        return (
            <div className="replyForm">
                <form onSubmit={(e) => this.props.handleSubmit(e, this.props.id, this.state.reply)}>
                    <input type="text" name="reply" placeholder="Name" value={this.state.reply} onChange={this.handleChange} />
                    <input type="submit" value="Reply" />
                </form>

                {this.props.replies.map((reply, _id) => {
                    return (
                        <div className="replyCont" key={_id}>
                            <h3>Reply: {reply.reply}</h3>
                            <p>By: {reply.username}</p>
                            <p>Time: {reply.created}</p>
                            <button onClick={() => this.props.handleDelete(reply._id)}>Delete Reply</button>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Reply;