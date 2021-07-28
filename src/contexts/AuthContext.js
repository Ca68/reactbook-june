import React, { useContext, useEffect, useState} from 'react';
import firebase from '../firebase';



const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

 export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({loggedIn: false});
    const auth = new firebase.auth.GoogleAuthProvider();
    const db = firebase.firestore()
     function signIn(){
         return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                firebase.auth().signInWithPopup(auth)
                    .then((res) => {
                            console.log(res.user);
                            firebase.firestore().collection('users').doc(res.user.uid).get()
                                .then((snapshot) => {
                                    if (!snapshot.exists) {
                                        firebase.firestore().collection('users').doc(res.user.uid).set({
                                            name: res.user.displayName,
                                            image: res.photoURL,
                                            email: res.email,
                                            bio: "",
                                        })
                                    }
                                })
                        });
                })
                .catch(err => console.error(`${err.code}\n${err.message}`))
        }



     function logout() {
            firebase.auth().signOut()
            .then(() => console.log('Logged out successfully'))
            .catch(err => console.log(err))
     }


     useEffect(() => {
        const subscribe = firebase.auth().onAuthStateChanged(u => {
            if(u) {
                    db.collection('users').doc(u.uid).get()
                    .then(user => {
                        let userData = user.data()

                        setCurrentUser( {
                            id: u.uid,
                            name : u.displayName,
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            image: userData.image,
                            bio: userData.bio,
                            email: u.email,
                            loggedIn: true,
                    })
                    
            });
            console.log(currentUser)
            }
            else {
                setCurrentUser({loggedIn: false})
            }
            
        })
        return subscribe;
     }, [])

     const value = { currentUser, signIn, logout};
     //const value = {
     //    currentUser: currentUser,
     //    signIn: signIn
     //};

     return (
        <AuthContext.Provider value={value}>
            { children }

        </AuthContext.Provider>
     )
 }