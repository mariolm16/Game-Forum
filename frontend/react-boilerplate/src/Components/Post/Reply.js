import React, { Component } from 'react';

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
            <div>
                <form onSubmit={(e) => this.props.handleSubmit(e, this.props.id, this.state.reply)}>
                    <input
                        type="text"
                        name="reply"
                        placeholder="Name"
                        value={this.state.reply}
                        onChange={this.handleChange}
                    />
                    <input type="submit" value="Reply" />
                </form>
                {this.props.replies.map((reply, _id) => {
                    return (
                        <div key={_id}>
                            <h3>REPLY: {reply.reply}</h3>
                            <p>REPLY BY: {reply.username}</p>
                            <p>REPLY TIME: {reply.created}</p>
                            <button onClick={() => this.props.handleDelete(reply._id)}>Delete Comment</button>
                        </div>
                    )

                })}

            </div>
        )
    }
}

export default Reply;