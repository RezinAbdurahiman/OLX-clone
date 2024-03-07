import React, { useContext, useState } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { authContext, firebaseContext, navigateContext, productContext} from '../../store/context';
function Header() {
  const {navigate} = useContext(navigateContext)
  const {user} = useContext(authContext)
  const {firebase} = useContext(firebaseContext)
  const[search, setSearch] = useState('')
  const[location,setLocation] = useState('')
 const {setProducts} = useContext(productContext)

  const handeleClick=()=>{
    firebase.auth().signOut().then(() => {
      navigate('/login')
    }).catch((error) => {
      // An error happened.
    });
  }

  const handleSearch = ()=>{
    firebase.firestore().collection('products').where("name", ">=", search).get().then((snapshot)=>{
      const allPost= snapshot.docs.map((product)=>{
      return{...product.data(),
             key: product.id}})
      setProducts(allPost)
      setSearch('')
        
      })}
  const locationSearch = ()=>{
    firebase.firestore().collection('products').where("location", ">=", location).get().then((snapshot)=>{
      const allPost= snapshot.docs.map((product)=>{
      return{...product.data(),
             key: product.id}})
      setProducts(allPost)
      setLocation('')

  })}

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName" onClick={()=>{navigate('/'); firebase.firestore().collection('products').get().then((snapshot)=>{
      const allPost= snapshot.docs.map((product)=>{
      return{...product.data(),
             key: product.id}})
      setProducts(allPost)
    
  })}}>
          <OlxLogo ></OlxLogo>
        </div>
        <div className="placeSearch" >
          <div onClick={locationSearch}><Search ></Search></div>
          <input type="text" onChange={(e)=>{setLocation(e.target.value)}} value={location}/>
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              value={search}
              onChange={(e)=>{setSearch(e.target.value)}}
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction" onClick={handleSearch}>
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        
          {user? <div className="loginPage"><span>{user.displayName}</span><hr /><span className="login-button" onClick={handeleClick}>Logout</span></div>: <div className="loginPage"><span className="login-button" onClick={()=>{navigate('/login')} }>Login</span><hr /></div>}
          
        

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent" onClick={()=>{user ? navigate('/sell') : navigate('login')}}>
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
