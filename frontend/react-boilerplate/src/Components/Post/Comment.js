import React, { Component } from 'react';

import "../../Css/Post.css"

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            body: '',
            postId: this.props.postId._id
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(props) {
        return (
            <div className="createPost">
                <form onSubmit={(e) => this.props.handleSubmit(e, this.state.body)}>
                    <input type="text" name="body" placeholder="body" onChange={this.handleChange} />
                    <input type="submit" value="Comment" />
                </form>
            </div>
        )
    }
}

export default Comment