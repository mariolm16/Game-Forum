import React, { Component } from 'react';

import { findPosts, retPost } from '../../Service/api_helper'


class UserPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // posts: [],
            singlePost: ''
        }
    }

    // async componentDidMount(id) {
    //     const posts = await findPosts(this.props.id);
    //     this.setState({
    //         posts
    //     })
    // }
    //get single post info
    getPost = async (id) => {
        console.log(id)
        const post = await retPost(id);
        this.setState({
            singlePost: post
        })
    }


    render(props) {
        const posts = this.props.posts.map((post) =>
            <li key={post._id}>{post.title}
                {/* <button onClick={() => this.getPost(post._id)}>See more</button> */}
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
