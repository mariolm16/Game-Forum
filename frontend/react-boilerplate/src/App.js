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
    this.props.history.push(`/`);
  };

  //sign in function
  handleSignIn = async (e, user) => {
    e.preventDefault();
    const currentUser = await loginUser(user);
    this.setState({
      modal2: false,
      currentUser: currentUser
    })
    this.props.history.push('/profile');
  }

  //Signout function 
  handleLogout = () => {
    this.setState({
      currentUser: null
    })
    localStorage.removeItem('authToken');
    this.props.history.push('/');
  }


  //REFACTOR MODALS TO TAKE LESS SPACE
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

  //Set state of Modal pop-up : true
  setModalTrue2 = () => {
    this.setState({
      modal2: true,
    });
  };

  //Set state of Modal pop-up: false
  setModalFalse2 = () => {
    this.setState({
      modal2: false,
    });
  };

  //delete user
  deleteUser = async (_id) => {
    console.log('Sending from profile.js', this.state._id)
    deleteUser(this.state._id);
    this.setState({
      currentUser: null
    })
    localStorage.removeItem('authToken');
    this.props.history.push('/');
  }

  render() {
    Modal.setAppElement("#root");
    return (
      <div>
        <header>
          <h1>GAME ZONE</h1>
          <Link to={"/"}>
            <button>Home</button>
          </Link>

          <Link to={"/posts"}>
            <button>Posts</button>
          </Link>

          {this.state.currentUser && (
            <Link to={"/profile"}>
              <button>Profile</button>
            </Link>)}

          {this.state.currentUser ? (
            <button onClick={this.handleLogout}>Logout</button>) : (
              <div>
                <button onClick={() => this.setModalTrue()}>Sign Up</button>
                <Modal className="signin" isOpen={this.state.modal}>
                  <h2>Sign Up</h2>
                  <SignUp handleSubmit={this.handleSignUp} />

                  <button onClick={() => this.setModalFalse()}> Close</button>
                </Modal>
                <button onClick={() => this.setModalTrue2()}>Log in</button>
                <Modal className="signin" isOpen={this.state.modal2}>
                  <h2>Sign In</h2>
                  <SignIn handleSubmit={this.handleSignIn} closeModal={this.setModalFalse2} />
                  <button onClick={() => this.setModalFalse2()}> Close</button>
                </Modal>
              </div>
            )}




          <Route path='/profile' render={(props) => { return <Profile deleteUser={this.deleteUser} user={this.state.currentUser} /> }} />

        </header>



        <Route exact path='/posts' render={(props) => { return (<Posts user={this.state.currentUser} />) }} />

        <News />
      </div>
    );
  }
}
export default withRouter(App);
