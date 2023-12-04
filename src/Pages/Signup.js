import React from 'react';
import { loadingContext } from '../store/context';
import { useContext } from 'react';
import Loading from '../Components/Loading/Loading';

import Signup from '../Components/Signup/Signup';

function SignupPage() {
  const { loading } = useContext(loadingContext)
  return (
    <div>
   {loading? <Loading/> : <Signup/>}
    </div>

  );
}

export default SignupPage;
