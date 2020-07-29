import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";


import { getPosts } from "../../Service/api_helper"


class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allPosts: []
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

    render() {
        return (
            <div className="allPosts">
                {this.state.allPosts.map((post, _id) => {
                    return (
                        <div key={_id}>
                            <Link to={`/posts/${post._id}`}><h2>{post.title}</h2></Link>
                            <img src={post.image} />
                            <p>{post.body}</p>
                            <p>{post.created}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Posts;