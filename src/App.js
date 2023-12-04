import './App.css';
import {Routes, Route, useNavigate} from 'react-router-dom'
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import View from "./Pages/ViewPost"
import Sell from "./Pages/Create"
import { loadingContext, navigateContext, firebaseContext, favoriteContext} from './store/context';
import { useContext, useState } from 'react';



function App() {
  const [loading, setLoading] = useState(false)
  const [userFavorites, setUserFavorites] = useState([]) 
  const navigate = useNavigate()
  return (
 <favoriteContext.Provider value={{userFavorites, setUserFavorites}}>
 <navigateContext.Provider value={{navigate}}>
 <loadingContext.Provider value={{loading, setLoading}}>
 <Routes>
 <Route element={<Home/>} path='/' />
 <Route element={<Signup/>} path='/signup' />
 <Route element={<Login/>} path='/login' />
 <Route element={<View/>} path='/view' />
 <Route element={<Sell/>} path='/sell' />
 </Routes> 

</loadingContext.Provider>
</navigateContext.Provider>
</favoriteContext.Provider>
    
  );
}

export default App;
