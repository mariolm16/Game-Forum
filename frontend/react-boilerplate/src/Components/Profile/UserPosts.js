import React, { Component } from 'react';

import { retPost } from '../../Service/api_helper'

import '../../Css/Profile.css'

class UserPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singlePost: ''
        }
    }

    //get single post info
    getPost = async (id) => {
        const post = await retPost(id);
        this.setState({
            singlePost: post
        })
    }

    render(props) {
        const posts = this.props.posts.map((post) =>
            <li key={post._id}>{post.title}
                <button onClick={() => this.getPost(post._id)}>See more</button>
            </li>
        )
        return (
            <div className="singlePost">
                <h3>Your Posts</h3>
                <ul>
                    {posts}
                </ul>

                <h3>{this.state.singlePost.title}</h3>
                <img src={this.state.singlePost.image} alt="postpic" />
                <p>{this.state.singlePost.body}</p>
            </div>
        )
    }
}

export default UserPosts;
