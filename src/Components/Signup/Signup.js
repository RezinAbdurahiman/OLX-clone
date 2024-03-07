import React, { useContext, useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { navigateContext, firebaseContext, loadingContext } from '../../store/context';
import 'firebase/auth';
import 'firebase/firestore'
export default function Signup() {

  const {loading, setLoading} = useContext(loadingContext)
  const {firebase} = useContext(firebaseContext)
  const {navigate} = useContext(navigateContext)
  const [username, setUsername]=  useState('')
  const [email, setEmail]=  useState('')
  const [phone, setPhone]=  useState('')
  const [password, setPassword]=  useState('')

  const handleClick = (e)=> {

  e.preventDefault()
  setLoading(true)
  firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => { 
    result.user.updateProfile({displayName : username})
    .then(()=>{
      firebase.firestore().collection("users").add({
      userId: result.user.uid,
      displayName : username,
      userEmail: email,
      userPhone: phone,
      favorites: []
    })
  })
  setLoading(false)
  navigate("/login")
    })
  .catch((error) => {
  setLoading(false)
  alert(error.message)
  });
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleClick}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            onChange={(e)=>{setUsername(e.target.value)}}
            placeholder="USERNAME"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            onChange={(e)=>{setEmail(e.target.value)}}
            className="input"
            type="email"
            id="email"
            name="email"
            placeholder="EMAIL"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            onChange={(e)=>{setPhone(e.target.value)}}
            className="input"
            type="number"
            id="phone"
            name="phone"
            placeholder="PHONE"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
          onChange={(e)=>{setPassword(e.target.value)}}
            className="input"
            type="password"
            id="password"
            name="password"
            placeholder="PASSWORD"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={()=>{navigate('/login')}}>Login</a>
      </div>
    </div>
  );
}
