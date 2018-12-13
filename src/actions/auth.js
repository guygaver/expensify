import { firebase, googleAuthProvider } from '../firebase/firebase';

export const logIn = uid => ({
  type: 'LOGIN',
  uid,
});

export const logOut = () => ({
  type: 'LOGOUT',
});

export const startLogin = () => () => firebase.auth().signInWithPopup(googleAuthProvider);

export const startLogout = () => () => firebase.auth().signOut();
