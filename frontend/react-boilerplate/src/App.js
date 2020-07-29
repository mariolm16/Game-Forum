import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import Modal from "react-modal";

//Custom Imports
import SignUp from "./Components/User/SignUp";
import SignIn from './Components/User/SignIn';
import Profile from './Components/Profile/Profile';

//Axios Imports
import { signUp, loginUser, verifyUser } from "./Service/api_helper";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      modal: false,
      // userProfile: null,
    };
  }

  //Check to see if token is already in local storage
  async componentDidMount() {
    const currentUser = await verifyUser();
    this.setState({
      currentUser: currentUser
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
      currentUser: currentUser
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
      currentUser: currentUser
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

  render() {
    Modal.setAppElement("#root");
    return (
      <div>
        <header>
          <h1>GAME ZONE</h1>
          <Link to={"/"}>
            <button>Home</button>
          </Link>
          {this.state.currentUser && (
            <Link to={"/profile"}>
              <button>Profile</button>
            </Link>)}

          {this.state.currentUser && <button onClick={this.handleLogout}>Logout</button>}
        </header>
        {/* <SignUp handleSubmit={this.handleSignUp} />
        <SignIn handleSubmit={this.handleSignIn} /> */}
        <button onClick={() => this.setModalTrue()}>Ready to Begin?</button>
        <Modal className="signin" isOpen={this.state.modal}>
          <h2>Welcome to Wayfarer!</h2>
          <SignUp handleSubmit={this.handleSignUp} />
          <SignIn handleSubmit={this.handleSignIn} />
          <br></br>
          <button onClick={() => this.setModalFalse()}> Close</button>
        </Modal>
        {this.state.currentUser &&
          <Route path='/profile' render={(props) => { return <Profile user={this.state.currentUser} /> }} />}
      </div>
    );
  }
}
export default withRouter(App);
