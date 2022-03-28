import React, { Component } from "react";
import FormInput from "../../form-input/form-input.component";
import CustomButton from "../../custom-button/custom-button.component";
import "./sign-in.styles.scss";

import { auth } from "../../../firebase/firebase.utils.js";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
    } catch (error) {
      alert("cannot log in");
      console.log(error);
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value }); // this way f can be used for both pass and emial
  };

  render() {
    return (
      <div className="sign-in">
        <h2>Let's cook</h2>
        <span>Sign in with email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            label="Email"
            required
          />
          <FormInput
            name="password"
            type="password"
            handleChange={this.handleChange}
            value={this.state.password}
            label="Password"
            required
          />
          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>
            {/* <CustomButton
              type="button"
              onClick={() => signInWithGoogle()}
              isGoogleSignIn
            >
              Sign In with Google
            </CustomButton> */}
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
