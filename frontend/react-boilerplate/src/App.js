import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import Modal from "react-modal";

//Custom Imports
import SignUp from "./Components/User/SignUp";

//Axios Imports
import { signUp } from "./Service/api_helper";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      // userProfile: null,
    };
  }
  //Sign up function
  handleSignUp = async (e, user) => {
    e.preventDefault();
    console.log("click works");
    const loadedUser = await signUp(user);
    // const userProfile = await getProfile(user);
    console.log(loadedUser);
    this.setState({
      currentUser: loadedUser,
      // userProfile: userProfile,
    });
    // this.props.history.push(`/profile`);
    console.log(this.state.currentUser);
  };

  render() {
    return (
      <div>
        <header>
          <h1>GAME ZONE</h1>
          <Link to={"/"}>
            <button>Home</button>
          </Link>
        </header>
        <SignUp handleSubmit={this.handleSignUp} />
      </div>
    );
  }
}
export default App;
