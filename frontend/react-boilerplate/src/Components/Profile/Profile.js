import React, { Component } from 'react';
import Modal from "react-modal";
import { withRouter } from "react-router-dom";
import { putProfile, findPosts } from '../../Service/api_helper'

//Custom imports
import UserPosts from './UserPosts';
import '../../Css/Profile.css'


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: props.user.username,
            name: props.user.name,
            image: props.user.image,
            email: props.user.email,
            created: props.user.created,
            _id: props.user._id,
            bio: props.user.bio,
            modal: false,
            posts: []
        }
    }

    async componentDidMount(id) {
        const posts = await findPosts(this.state._id);
        this.setState({
            posts
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    //Set state of Modal pop-up : true
    setModalTrue = () => {
        this.setState({
            modal: true,
        });
    };

    //Set state of Modal pop-up: false
    setModalFalse = () => {
        this.setState({
            modal: false,
        });
    };

    //update user
    updateUser = async (e, values) => {
        e.preventDefault();
        const updatedUser = await putProfile(values);
        this.setState({
            currentUser: updatedUser,
            modal: false,
        });
    };

    render(props) {
        return (
            <div className="profileMain">

                <div className="userInfo">
                    <h2>Welcome {this.state.username}!</h2>
                    <img src={this.state.image} alt="user icon" />
                    <p>Email: {this.state.email}</p>
                    <p>Member since: {this.state.created}</p>
                    <p>{this.state.bio}</p>
                    <button onClick={() => this.setModalTrue()}>Edit Profile</button>
                    <button onClick={() => this.props.deleteUser()}>Delete Profile</button>
                </div>
                <Modal className="editForm" isOpen={this.state.modal}>
                    <form onSubmit={(e) => this.updateUser(e, this.state)}>
                        <h1>Edit Profile</h1>
                        <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange} />
                        <br></br>
                        <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.handleChange} />
                        <br></br>
                        <input type="text" name="image" placeholder="image" value={this.state.image} onChange={this.handleChange} />
                        <br></br>
                        <input type="text" name="bio" placeholder="bio" value={this.state.bio} onChange={this.handleChange} />
                        <br></br>
                        <input type="submit" value="Accept Changes" />
                    </form>
                    <button onClick={() => this.setModalFalse()}> Close</button>
                </Modal>
                <div className="userPosts">
                    {this.state.posts ? (<UserPosts posts={this.state.posts} />) : (<h3>Head over to the posts section to begin having fun</h3>)}
                </div>
            </div>
        )
    }
}
export default withRouter(Profile);