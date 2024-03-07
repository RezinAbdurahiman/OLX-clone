import React, { useContext, useEffect } from 'react';

import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';

import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Footer/Footer';
import { authContext, favoriteContext, firebaseContext, loadingContext, navigateContext, viewContext } from '../store/context';
import Loading from '../Components/Loading/Loading';

function Home(props) {
  const {loading} = useContext(loadingContext)
  const {firebase} = useContext(firebaseContext)
  const {user,setUser} = useContext(authContext)
  const {userFavorites,setUserFavorites} = useContext(favoriteContext)
  const {setViewProduct} = useContext(viewContext)
  const {navigate} = useContext(navigateContext)
  useEffect(() => {
    if (user) {
   firebase.auth().onAuthStateChanged((user)=>{
    firebase.firestore().collection('users').where("userId", "==", user.uid).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        setViewProduct(null)
  
      
    })})})}
  else{
    navigate('/login')
  }},[])

const loadFavorites =()=>{ 
   firebase.firestore().collection('users').where("userId", "==", user.uid).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      setUserFavorites(doc.data().favorites);
      console.log(userFavorites)
    })
  })
}

  
  return (
    <div >
      {loading? <Loading/> : user? <div className='homeParentDiv'>
        <Header />
        <Banner />
        <Posts />
        <Footer />
        </div>: ()=>{navigate('/login')} }
    </div>
  
  );
}

export default Home;
 
