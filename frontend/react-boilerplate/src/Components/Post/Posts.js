import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";


import { getPosts, createPost } from "../../Service/api_helper"

//custom imports
import CreatePost from './CreatePost';


class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allPosts: [],
            user: this.props.user
        }
    }
    // route /post/all
    async componentDidMount() {
        const allPosts = await getPosts();
        this.setState({
            allPosts
        })
        console.log(this.state.allPosts)
    }

    //Create a new post
    createPost = async (e, postData) => {
        e.preventDefault();
        const newPost = await createPost(this.props.user._id, postData);
        const posts = this.state.allPosts;
        posts.push(newPost.data);
        this.setState({
            allPosts: posts
        })
    }

    render() {
        return (
            <div>
                {this.state.user && <CreatePost handleSubmit={this.createPost} />}
                <div className="allPosts">
                    {this.state.allPosts.map((post, _id) => {
                        return (
                            <div key={_id}>
                                <Link to={`/posts/${post._id}`}><h2>{post.title}</h2></Link>
                                <img src={post.image} alt="post" />
                                <p>{post.body}</p>
                                <p>{post.created}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Posts;