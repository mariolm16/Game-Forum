import React, { Component } from 'react';
import Modal from "react-modal";


import { putProfile } from '../../Service/api_helper'

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
            modal: false
        }
    }
    handleChange = (e) => {
        console.log()
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
        });
    };

    render(props) {
        return (
            <div>
                <h1>Nice this is the profile page</h1>
                <h2>Username: {this.state.username}</h2>
                <img src={this.state.image} alt="user icon" />
                <p>Email: {this.state.email}</p>
                <p>Member since: {this.state.created}</p>
                <p>{this.state.bio}</p>

                <button onClick={() => this.setModalTrue()}>Edit Profile</button>
                <Modal isOpen={this.state.modal}>
                    <form onSubmit={(e) => this.updateUser(e, this.state)}>
                        <h1>Edit Profile</h1>
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />{" "}
                        <br></br>
                        <input
                            type="email"
                            name="email"
                            placeholder="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <br></br>
                        <input
                            type="text"
                            name="image"
                            placeholder="image"
                            value={this.state.image}
                            onChange={this.handleChange}
                        />
                        <br></br>
                        <input
                            type="text"
                            name="bio"
                            placeholder="bio"
                            value={this.state.bio}
                            onChange={this.handleChange}
                        />
                        <br></br>
                        <input type="submit" value="Accept Changes" />
                    </form>

                    <button onClick={() => this.setModalFalse()}>Return</button>
                </Modal>
            </div>

        )
    }
}
export default Profile;