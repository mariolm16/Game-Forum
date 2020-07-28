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

  render() {
    return (
      <div>
        <h3>Welcome gamers..This is the signup</h3>
      </div>
    );
  }
}

export default SignUp;
