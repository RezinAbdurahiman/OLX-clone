import React, { useContext } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { authContext, firebaseContext, navigateContext } from '../../store/context';
function Header() {
  const {navigate} = useContext(navigateContext)
  const {user} = useContext(authContext)
  const {firebase} = useContext(firebaseContext)
  const handeleClick=()=>{
    firebase.auth().signOut().then(() => {
      navigate('/login')
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
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
