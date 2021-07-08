// import React, { useContext, useState, useEffect } from "react"
// import { fbAuth } from "../config/fbConfig"

// const AuthContext = React.createContext()

// export function useAuth() {
//   return useContext(AuthContext)
// }

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState()
//   const [loading, setLoading] = useState(true)

//   function signup(email, password) {
      

//     console.log(email, password, 't his is everythinf')
//     return fbAuth.createUserWithEmailAndPassword(email, password)
//   }

//   function login(email, password) {
//     return fbAuth.signInWithEmailAndPassword(email, password)
//   }

//   function logout() {
//     return fbAuth.signOut()
//   }

//   function resetPassword(email) {
//     return fbAuth.sendPasswordResetEmail(email)
//   }

//   function updateEmail(email) {
//     return currentUser.updateEmail(email)
//   }

//   function updatePassword(password) {
//     return currentUser.updatePassword(password)
//   }

//   useEffect(() => {
//     const unsubscribe = fbAuth.onAuthStateChanged(user => {
//       setCurrentUser(user)
//       setLoading(false)
//     })

//     return unsubscribe
//   }, [])

//   const value = {
//     currentUser,
//     login,
//     signup,
//     logout,
//     resetPassword,
//     updateEmail,
//     updatePassword
//   }

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   )
// }