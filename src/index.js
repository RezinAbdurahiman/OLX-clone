import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { firebaseContext } from './store/context';
import Context from './store/context';
import { firebase } from './firebase/Config';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <BrowserRouter>
  <React.StrictMode>
    
    <firebaseContext.Provider value={{firebase}} >
    <Context>
    <App />
    </Context>
    </firebaseContext.Provider>
    
    
  </React.StrictMode>
  </BrowserRouter>
);