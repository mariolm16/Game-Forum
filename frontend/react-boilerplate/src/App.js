import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import Modal from "react-modal";

//Custom Imports

import SignUp from "./Components/User/SignUp";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      userProfile: null,
    };
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
        <SignUp />
      </div>
    );
  }
}
export default App;
