import {auth, googleAuthProvider, facebookAuthProvider, } from '../config/fbConfig';
  
  const firebaseInstance = getFirebase();

  const signIn = async (event) => {
      event.preventDefault();
  
      try {
        if (firebaseInstance) {
          const user = await firebaseInstance
            .auth()
            .signInWithEmailAndPassword(email.value, password.value);
          console.log("user", user);
          alert("Welcome back!");
        }
      } catch (error) {
        console.log("error", error);
      }
  };

export default signIn;
  