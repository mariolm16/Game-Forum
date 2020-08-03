import React, { Component } from 'react'

import "../../Css/App.css"


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div className="signForm">
                <h2>Sign In</h2>
                <form onSubmit={(e) => this.props.handleSubmit(e, this.state)}>
                    <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
                    <br></br>
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                    <br></br>
                    <input type="submit" value="Sign In" />
                </form>
            </div>
        )
    }
}

export default SignIn;