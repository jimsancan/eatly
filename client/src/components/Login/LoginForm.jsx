
/*
this file takes care of all authentication through firebase.
the firebase script is hard-loaded into the index.html rather than using the node module
*/
import React from 'react'
import NavBar from '../NavBar'
import Axios from 'axios'

export default class LoginForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			txtEmail: '',
			txtPassword: '',
			loggedIn: 'false',
		}
		this.firebase = this.props.firebase
	}
	handleInputChange({ target }) {
		this.setState({[target.name]: target.value})
	}
//handles log in event, bound to the log in button
	handleLogIn() {
		let { txtEmail, txtPassword } = this.state
		//firebase does the heavy lifting of valid email input verification
		this.firebase.auth().signInWithEmailAndPassword(txtEmail, txtPassword)
			.then((data) => console.log('logged in with: ', data))
			.catch((error) => console.log('error in user login: ' +error.code+ " --" + error.message))
	}
// Sends the newly created user to be written to firebase users "table" via userController
	postNewUser(email, UID) {
		console.log('posting user')
		Axios.post('/createAuthUser', {id: UID, emailAddress: email})
			.catch(err => console.log(err))
	}

//handles sign up event, bound to the sign up button
	handleSignUp() {
		let { txtEmail, txtPassword } = this.state
		//all users created this way are visible on the online firebase console
		this.firebase.auth().createUserWithEmailAndPassword(txtEmail, txtPassword)
			.then((data) => {
				this.postNewUser(data.email, data.uid)
				console.log('new user: ', data)
			})
			.catch((error) => console.log('error in user sign up: ' +error.code+ +"--"+ error.message))
	}

//real-time listener for any authentication state change, toggles state logged-in property accordingly

	render() {
		return (
			<div className="loginSignUpForm">
			
			<input id="txtEmail" name="txtEmail" type="email" placeholder="email" onChange={this.handleInputChange.bind(this)}></input>
			<input id="txtPassword" name="txtPassword" type="password" placeholder="password" onChange={this.handleInputChange.bind(this)}></input>
            	
			<div className="buttons">
					<button id="btnLogin" className="loginButton" onClick={this.handleLogIn.bind(this)}>Log In</button>
					<button id="btnSignUp" className="signupButton" onClick={this.handleSignUp.bind(this)}>Sign Up</button>
					
			</div>
		</div>
		)
	}
}