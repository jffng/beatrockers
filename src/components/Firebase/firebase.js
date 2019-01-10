import app from "firebase/app";
import 'firebase/auth';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCvOmgNtxKpRpsk9hGQJnEdBWxSOqRCpb0",
  authDomain: "beatrockers-8e449.firebaseapp.com",
  databaseURL: "https://beatrockers-8e449.firebaseio.com",
  projectId: "beatrockers-8e449",
  storageBucket: "beatrockers-8e449.appspot.com",
  messagingSenderId: "836978447712"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

	// *** Auth API ***
	doCreateUserWithEmailAndPassword = (email, password) =>
		this.auth.createUserWithEmailAndPassword(email, password);
	
	doSignInWithEmailAndPassword = (email, password) =>
    	this.auth.signInWithEmailAndPassword(email, password);

	doSignOut = () => this.auth.signOut();

}

export default Firebase;