import React, { Fragment, useContext, useEffect } from 'react';
import Header from '../Components/Header/Header';
import Create from '../Components/Create/Create';
import { authContext, loadingContext, navigateContext } from '../store/context';
import Loading from "../Components/Loading/Loading"

const CreatePage = () => {
  const {user} = useContext(authContext)
  const {navigate} = useContext(navigateContext)
  useEffect(()=>{ 
    if(!user)
    {
       navigate('/login')
       setLoading(false)
    } 
  },[])
  const {loading, setLoading} = useContext(loadingContext)
  return (
    <div>
    {loading ? <Loading/> :
    <Fragment>
      <Header />
      <Create/>
    </Fragment>
    }
    </div>
  );
};

export default CreatePage;
