import React, { Component } from 'react';

import { findPosts, retPost } from '../../Service/api_helper'


class UserPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            singlePost: ''
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
    //get single post info
    getPost = async (id) => {
        console.log(id)
        const post = await retPost(id);
        this.setState({
            singlePost: post
        })
    }


    render(props) {
        const posts = this.state.posts.map((post) =>
            <li key={post.title}>{post.title}
                <button onClick={() => this.getPost(post._id)}>See more</button>
            </li>
        )
        return (
            <div>
                <h1>Your contributions</h1>
                <ul>
                    {posts}

                </ul>

            </div>
        )
    }
}

export default UserPosts;
