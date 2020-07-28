import React, { Component } from "react";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      username: "",
      email: "",
      image: "",
      password: "",
    };
  }

  //takes input from form and sets it to current state
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <h3>Welcome gamers..This is the signup</h3>
        <form onSubmit={(e) => this.props.handleSubmit(e, this.state)}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="image"
            placeholder="Image"
            value={this.state.image}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <input type="submit" value="Register" />
        </form>
      </div>
    );
  }
}

export default SignUp;
