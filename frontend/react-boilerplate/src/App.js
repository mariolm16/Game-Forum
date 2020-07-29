import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import Modal from "react-modal";

//Custom Imports
import SignUp from "./Components/User/SignUp";
import SignIn from './Components/User/SignIn';

//Axios Imports
import { signUp, loginUser, verifyUser } from "./Service/api_helper";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      // userProfile: null,
    };
  }

  //Check to see if token is already in local storage
  async componentDidMount() {
    const currentUser = await verifyUser();
    this.setState({
      currentUser
    })
  }

  //Sign up function
  handleSignUp = async (e, user) => {
    e.preventDefault();
    console.log("click works. sending:", user);
    const currentUser = await signUp(user);
    // const userProfile = await getProfile(user);
    console.log(currentUser);
    this.setState({
      currentUser
      // userProfile: userProfile,
    });
    this.props.history.push(`/`);
    console.log(this.state.currentUser);
  };

  //sign in function
  handleSignIn = async (e, user) => {
    e.preventDefault();
    console.log("click works. sending:", user);
    const currentUser = await loginUser(user);
    this.setState({
      currentUser
    })
    this.props.history.push(`/`);
    console.log('this is the state:', this.state.currentUser);
  }

  //Signout function 
  handleLogout = () => {
    this.setState({
      currentUser: null
    })
    localStorage.removeItem('authToken');
    this.props.history.push('/');
  }

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
        <SignIn handleSubmit={this.handleSignIn} />
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}
export default withRouter(App);
