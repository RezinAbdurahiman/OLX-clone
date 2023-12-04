import React, { useContext, useState } from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { firebaseContext, loadingContext, navigateContext } from '../../store/context';

function Login() {

  const {firebase} = useContext(firebaseContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {loading, setLoading} = useContext(loadingContext)
  const {navigate} = useContext(navigateContext)
  const handleClick = (e)=>{
    e.preventDefault()
    setLoading(true)
    firebase.auth().signInWithEmailAndPassword(email, password).then((user)=>{
      setLoading(false)
      navigate("/")

    }).catch((error)=>{
      setLoading(false)
      console.log(error.message)
    })

    

  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleClick}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            onChange={(e)=>{setEmail(e.target.value)}}
            className="input"
            type="email"
            id="fname"
            name="email"
            placeholder='EMAIL'

          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            onChange={(e)=>{setPassword(e.target.value)}}
            className="input"
            type="password"
            id="lname"
            name="password"
            placeholder="PASSWORD"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
