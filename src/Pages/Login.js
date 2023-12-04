import React, { useContext } from 'react';
import Login from '../Components/Login/Login';
import { loadingContext } from '../store/context';
import Loading from '../Components/Loading/Loading';

function LoginPage() {
  const {loading} = useContext(loadingContext)
  return (
    <div>
      {loading? <Loading/> : <Login />}
    </div>
  );
}

export default LoginPage;
