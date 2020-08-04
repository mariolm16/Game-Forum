import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import Modal from "react-modal";

import { getPosts, createPost, retPost, destroyPost, makeComment, destroyComment } from "../../Service/api_helper"

//Custom imports
import Comment from './Comment';
import CreatePost from './CreatePost';
import SinglePost from './SinglePost';

import "../../Css/Post.css"

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allPosts: [],
            singlePost: {},
            user: null,
            modal: false,
            modalEdit: false,

        }
    }

    async componentDidMount() {
        const allPosts = await getPosts();
        const currentUser = await this.props.user
        this.setState({
            allPosts,
            user: currentUser
        })
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

    //Get single post info
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

    //delete post if user signed on and owns post
    deletePost = async (id) => {
        await destroyPost(id)
        const allPosts = await getPosts();
        this.setState({
            allPosts
        })
    }

    //create comment
    createComment = async (e, body) => {
        e.preventDefault()
        const newComment = await makeComment(this.state.singlePost._id, body);
        const post = this.state.singlePost._comments
        this.getPost(this.state.singlePost._id)
    }

    //delete comment if user siged on and owns it
    deleteComment = async (id) => {
        await destroyComment(id)
        const allComments = this.state.singlePost._comments
        const comments = allComments.filter((comment) => {
            return comment._id == id;
        })
        this.getPost(this.state.singlePost._id)
    }

    render() {
        return (
            <div className="postTop">
                <Modal className="postModal" isOpen={this.state.modal}>
                    <button onClick={() => this.setModalFalse()}> Close</button>
                    {this.state.singlePost ? (<SinglePost closeModal={this.setModalFalse} deleteComment={this.deleteComment} post={this.state.singlePost} getPost={this.getPost} />) : (<p>Loading...</p>)}
                    {this.state.user ? (<Comment postId={this.state.singlePost} handleSubmit={this.createComment} />) : (<h2 class="message">Sign in to join the conversation</h2>)}

                </Modal>

                {this.state.user ? (<CreatePost handleSubmit={this.createPost} />) : (<h2 class="message">Sign in to join the conversation</h2>)}

                <div className="postMid">
                    {this.state.allPosts.map((post, _id) => {
                        return (
                            <div className="allPosts" key={_id}>
                                <img src={post.image} alt="post" />
                                <h2>{post.title}</h2>
                                <button onClick={() => this.getPost(post._id)}>See more</button>

                                {this.state.user && <button onClick={() => this.deletePost(post._id)}>Delete Post</button>}
                            </div>
                        )
                    })}
                </div>
            </div >
        )
    }
}

export default withRouter(Posts);