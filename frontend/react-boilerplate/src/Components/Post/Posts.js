import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import Modal from "react-modal";

import { getPosts, createPost, retPost, destroyPost, editPost, makeComment, destroyComment } from "../../Service/api_helper"

//custom imports
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
    // route /post/all
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
    //Set modal for update form
    setModalEdit = () => {
        this.setState({
            modalEdit: true,
        });
    };

    //set modal for edit
    setModalEditFalse = () => {
        this.setState({
            modalEdit: false,
        });
    };
    //delete post if user signed on and owns post
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

    // handle change for form
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    //update post function
    // updatePost = async (e, id, values) => {
    //     e.preventDefault();
    //     console.log(id, values)
    //     const updatedPost = await editPost(id, values);
    // }

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
            <div>
                <Modal className="postModal" isOpen={this.state.modal}>
                    <button onClick={() => this.setModalFalse()}> Close</button>
                    <Comment postId={this.state.singlePost} handleSubmit={this.createComment} />
                    {this.state.singlePost ? (<SinglePost closeModal={this.setModalFalse} deleteComment={this.deleteComment} post={this.state.singlePost} />) : (<p>Loading...</p>)}

                </Modal>

                {this.state.user ? (<CreatePost handleSubmit={this.createPost} />) : (<p>Sign in to join the conversation</p>)}

                <div className="allPosts">
                    {this.state.allPosts.map((post, _id) => {
                        return (
                            <div key={_id}>
                                <h2>{post.title}</h2>
                                <img src={post.image} alt="post" />
                                <p>{post.created}</p>
                                <button onClick={() => this.getPost(post._id)}>See more</button>

                                {this.state.user && <button onClick={() => this.deletePost(post._id)}>Delete Post</button>}

                                {/* <button onClick={() => this.setModalEdit()}>Edit Post</button>
                                <Modal isOpen={this.state.modalEdit}>
                                    <form onSubmit={(e) => this.updatePost(e, this.state)}>

                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="title"
                                            value={post.title}
                                            onChange={this.handleChange}
                                        />
                                        <br></br>
                                        <input
                                            type="text"
                                            name="body"
                                            placeholder="body"
                                            value={post.body}
                                            onChange={this.handleChange}
                                        />
                                        <input
                                            type="text"
                                            name="image"
                                            placeholder="image"
                                            value={post.image}
                                            onChange={this.handleChange}
                                        />
                                        <input type="submit" value="Submit Post" />
                                        <button onClick={() => this.setModalEditFalse()}>Return</button>
                                    </form> */}
                                {/* </Modal> */}
                            </div>
                        )
                    })}
                </div>

            </div >
        )
    }
}

export default Posts;