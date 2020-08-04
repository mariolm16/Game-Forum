import React, { Component } from "react";

import "../../Css/App.css"


class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      username: "",
      email: "",
      image: "https://cdn.icon-icons.com/icons2/1379/PNG/512/folderredgames_93152.png",
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
      <div className="signForm">
        <h3>Sign Up</h3>
        <form onSubmit={(e) => this.props.handleSubmit(e, this.state)}>
          <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
          <br></br>
          <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
          <br></br>
          <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
          <br></br>
          <input type="text" name="image" placeholder="Image" value={this.state.image} onChange={this.handleChange} />
          <br></br>
          <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
          <br></br>
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    );
  }
}

export default SignUp;
