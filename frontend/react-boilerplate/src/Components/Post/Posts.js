import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import Modal from "react-modal";

import { getPosts, createPost, retPost, destroyPost } from "../../Service/api_helper"

//custom imports
import CreatePost from './CreatePost';
import SinglePost from './SinglePost';
import "../../Css/Post.css"

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allPosts: [],
            singlePost: "",
            user: this.props.user,
            modal: false,
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

    //get single post info
    getPost = async (id) => {
        const post = await retPost(id);
        this.setState({
            singlePost: post,
            modal: true
        })
    }

    //Set state of Modal pop-up: false
    setModalFalse = () => {
        this.setState({
            modal: false,
        });
    };

    deletePost = async (id) => {
        await destroyPost(id)
        const allPosts = this.state.allPosts;
        const remainingPosts = allPosts.filter((post) => {
            return post._id == id
        });
        this.setState({
            allPosts: remainingPosts
        })
    }


    render() {
        return (
            <div>
                <Modal className="postModal" isOpen={this.state.modal}>
                    <button onClick={() => this.setModalFalse()}> Close</button>
                    {this.state.singlePost && <SinglePost closeModal={this.setModalFalse} post={this.state.singlePost} id={this.state.user._id} />}
                </Modal>

                {this.state.user && <CreatePost handleSubmit={this.createPost} />}
                <div className="allPosts">
                    {this.state.allPosts.map((post, _id) => {
                        return (
                            <div key={_id}>
                                <h2>{post.title}</h2>
                                <img src={post.image} alt="post" />
                                <p>{post.created}</p>
                                <button onClick={() => this.getPost(post._id)}>See more</button>

                                {this.state.user && <button onClick={() => this.deletePost(post._id)}>Delete Post</button>}
                            </div>
                        )
                    })}
                </div>

            </div>
        )
    }
}

export default Posts;