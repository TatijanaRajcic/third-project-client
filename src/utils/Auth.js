import axios from "./axios";
import qs from "querystring";

class Auth {
	constructor(domain) {
		this.domain = domain || process.env.REACT_APP_API;
		this.login = this.login.bind(this);
	}

	login(username, password) {
		// debugger
		// STEP 2 OF LOGIN: SEND THE DATA FROM THE FORM TO THE BANCKEND
		return axios({
			method: "POST",
			url: "/login",
			baseURL: this.domain,
			headers: { 'content-type': 'application/x-www-form-urlencoded' },
			data: qs.stringify({username, password}),
		})
		// STEP 4 OF LOGIN: RETRIEVE THE DATA SENT BY THE BACKEND
		.then((response)=> {
			this.setUser(response.data)
		})
	}

	signup({username, password, email}) {
		// STEP 2 OF SIGNUP: SEND THE DATA FROM THE FORM TO THE BACKEND
		// debugger
		return axios({
			method: "POST",
			url: "/signup",
			baseURL: this.domain,
			headers: { 'content-type': 'application/x-www-form-urlencoded' },
			data: qs.stringify({username, password, email}),
		})
		// STEP 4 OF SIGN-UP: RETRIEVE THE DATA SENT BY THE BACKEND
		.then((response)=> {
			// debugger
			this.setUser(response.data);
		})
	}

	loggedIn(){
		const user = this.getUser()
		return !!user; 
	}

	setUser(user){
		localStorage.setItem('user', JSON.stringify(user)); //in Local storage: user is the key, JSON.stringify(user) is the value
	}

	getUser(){
		return JSON.parse(localStorage.getItem('user'));
	}

	logout(){
		// debugger
		return axios({
			method: "GET",
			url: "/logout",
			baseURL: this.domain
		})
		.then((response)=> {
			// debugger
			localStorage.removeItem('user');
		})
	}    
}

export default Auth