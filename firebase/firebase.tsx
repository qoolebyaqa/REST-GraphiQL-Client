import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDOZylM5pt078Y_wyeey7nBSzDH_pUrevg",
  authDomain: "rest-graphiql-client-1b574.firebaseapp.com",
  projectId: "rest-graphiql-client-1b574",
  storageBucket: "rest-graphiql-client-1b574.appspot.com",
  messagingSenderId: "1025753649257",
  appId: "1:1025753649257:web:8bb3b1d790f83b697d12f8"
};

export const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);
export const auth = getAuth();

export function createUser(email:string, password:string) {
  return createUserWithEmailAndPassword(auth, email, password);
}