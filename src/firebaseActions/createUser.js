// import {auth, firestore, fbConfig} from '../config/fbConfig'

// const createUser = (user) => {
//     const { email, password, name: userName } = user;



//     console.log(user, ' användaren ');
//     const firebaseAuth = auth;
//     //const firebase = getFirebase();
//     //const firestore = getFirestore();

//     auth()
//     .createUserWithEmailAndPassword(email, password)
//       .then(async (res) => {
//         const user = await res.user;
//         console.log(user,' användaren')
//         return await firestore.collection('users').doc(user.uid).set({
//           email: email,
//           name: user.firstName,
//         });
//       })
//       .then(() => {
//         return true
//       })
//       .catch((error) => false);
//   };

// export default createUser;
