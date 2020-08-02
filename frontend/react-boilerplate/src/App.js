import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import Modal from "react-modal";

//Custom Imports
import SignUp from "./Components/User/SignUp";
import SignIn from './Components/User/SignIn';
import Profile from './Components/Profile/Profile';
import News from './Components/News/News';
import Posts from './Components/Post/Posts';

//Axios Imports
import { signUp, loginUser, verifyUser, deleteUser } from "./Service/api_helper";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      modal: false,
      modal2: false,
    };
    this.deleteUser = this.deleteUser.bind(this);
  }

  //Check to see if token is already in local storage
  async componentDidMount() {
    const currentUser = await verifyUser();
    document.title = "Game Zone"
    this.setState({
      currentUser: currentUser
    })
  }

  //Sign up function
  handleSignUp = async (e, user) => {
    e.preventDefault();
    const currentUser = await signUp(user);
    this.setState({
      currentUser: currentUser
    });
    this.props.history.push(`/home`);
  };

  //Sign in function
  handleSignIn = async (e, user) => {
    e.preventDefault();
    const currentUser = await loginUser(user);
    this.setState({
      modal2: false,
      currentUser: currentUser
    })
    this.props.history.push('/home');
  }

  //Signout function 
  handleLogout = () => {
    this.setState({
      currentUser: null
    })
    localStorage.removeItem('authToken');
    this.props.history.push('/home');
  }

  //Set state of Modal pop-up for Sign-in : true
  setModalTrue = () => {
    this.setState({
      modal: true,
    });
  };

  //Set state of Modal pop-up for Sign-in: false
  setModalFalse = () => {
    this.setState({
      modal: false,
    });
  };

  //Set state of Modal pop-up for Sign-up : true
  setModalTrue2 = () => {
    this.setState({
      modal2: true,
    });
  };

  //Set state of Modal pop-up for Sign-up: false
  setModalFalse2 = () => {
    this.setState({
      modal2: false,
    });
  };

  //Delete user
  deleteUser = async (_id) => {
    deleteUser(this.state._id);
    this.setState({
      currentUser: null
    })
    localStorage.removeItem('authToken');
    this.props.history.push('/home');
  }

  render() {
    Modal.setAppElement("#root");
    return (
      <div>
        <header>

          <h1>GAME ZONE</h1>
          <Link to={"/home"}><button>Home</button></Link>

          <Link to={"/posts"}><button>Posts</button></Link>

          {this.state.currentUser ? (
            <div>
              <Link to={"/profile"}><button>Profile</button></Link>
              <button onClick={this.handleLogout}>Logout</button>
            </div>
          ) : (
              <div>
                <button onClick={() => this.setModalTrue()}>Sign Up</button>
                <Modal className="signin" isOpen={this.state.modal}>
                  <SignUp handleSubmit={this.handleSignUp} />
                  <button onClick={() => this.setModalFalse()}> Close</button>
                </Modal>
                <button onClick={() => this.setModalTrue2()}>Sign in</button>
                <Modal className="signin" isOpen={this.state.modal2}>
                  <SignIn handleSubmit={this.handleSignIn} closeModal={this.setModalFalse2} />
                  <button onClick={() => this.setModalFalse2()}> Close</button>
                </Modal>
              </div>
            )}
          <Route path='/profile' render={(props) => { return <Profile deleteUser={this.deleteUser} user={this.state.currentUser} /> }} />
        </header>

        <Route exact path='/posts' render={(props) => { return (<Posts user={this.state.currentUser} />) }} />

        <Route exact path='/home' render={(props) => { return (<News />) }} />
      </div>
    )
  }
}
export default withRouter(App);
