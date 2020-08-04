import React, { Component } from 'react';

import "../../Css/Post.css"

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            body: "",
            image: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div className="createComment">
                <h3>Create a post!</h3>
                <form onSubmit={(e) => this.props.handleSubmit(e, this.state)}>
                    <input type="text" name="title" placeholder="title" onChange={this.handleChange} />
                    <input type="text" name="body" placeholder="body" onChange={this.handleChange} />
                    <input type="text" name="image" placeholder="image" onChange={this.handleChange} />
                    <input type="submit" value="Create post" />
                </form>
            </div>
        )
    }
}

export default CreatePost;