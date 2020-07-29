import React, { Component } from 'react';

import { findPosts } from '../../Service/api_helper'


class UserPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    async componentDidMount(id) {
        console.log(this.props.id)
        const posts = await findPosts(this.props.id);
        console.log(posts)
        this.setState({
            posts
        })
    }


    render(props) {
        const posts = this.state.posts.map((post) =>
            <li key={post.title}>{post.title}</li>
        )
        return (
            <div>
                <h1>I am the profile posts Component</h1>
                <ul>
                    {posts}
                </ul>

            </div>
        )
    }
}

export default UserPosts;
