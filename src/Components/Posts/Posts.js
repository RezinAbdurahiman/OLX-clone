import React, { useContext, useEffect, useState } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { authContext, favoriteContext, firebaseContext, loadingContext, navigateContext, productContext, viewContext } from '../../store/context';
import Loading from '../Loading/Loading';

function Posts() {
  const {firebase}= useContext(firebaseContext)
  const {setLoading} = useContext(loadingContext)
  const {user} = useContext(authContext)
  const {userFavorites, setUserFavorites} = useContext(favoriteContext)
  const {viewProduct, setViewProduct} = useContext(viewContext)
  const {navigate} = useContext(navigateContext)
 
  const {products,setProducts} = useContext(productContext)
  useEffect(()=>{
    handleFavorite()
  },[userFavorites])
  useEffect(()=>{

    firebase.firestore().collection('products').get().then((snapshot)=>{
      const allPost= snapshot.docs.map((product)=>{
      return{...product.data(),
             key: product.id}})
      setProducts(allPost)
    
  })
    
  },[])
  const [view, setView] = useState(false)
  const [favorites, setFavorites] = useState(products.map(() => false));
  const handleClick = ()=>{
    setView(!view)
  }
  const handleFavorite = async (favorite, product) => {
  try {

    // Fetch user document reference
    const querySnapshot = await firebase.firestore()
      .collection('users')
      .where("userId", "==", user.uid)
      .get();

    if (!querySnapshot.empty) {
      const userDocRef = querySnapshot.docs[0].ref;

      await userDocRef.update({ favorites: userFavorites });

      console.log("Update successful!");
      console.log(userFavorites)
    } else {
      // Handle the case where no matching document is found
      console.log("No matching document found for the user.");
    }
  } catch (error) {
    console.error("Error updating document:", error);
  }
};
  return (
    <div className="postParentDiv">
      <div className="cardbox">
        <div className="heading">
          <span>Quick Menu</span>
          <span onClick={handleClick}>{view? "View less" : "View more"}</span>
        </div>
        <div className={view? "moreView": "cards"}>
         { 
         products.map((product, index) => (
          <div className="card" key={product.id} onClick={()=>{setViewProduct(product); navigate('/view')}}>
            <div className="favorite" onClick={async () => {
  if (!favorites[index]) {
    await setUserFavorites(prevUserFavorites => prevUserFavorites.concat(product));
  } else {
    let tempIndex = userFavorites.indexOf(product);
    let temp = [...userFavorites.slice(0, tempIndex), ...userFavorites.slice(tempIndex + 1)];
    await setUserFavorites(temp);
  }
              const newFavorites = [...favorites];
              newFavorites[index] = !newFavorites[index];
              setFavorites(newFavorites);
            }}>
              <Heart click={favorites[index]} />
            </div>
            <div className="image">
              <img src={product.pictures[0]} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.name}</span>
              <p className="name">{product.category}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
        ))
          } 
        </div>
      </div>
      {userFavorites.length>0?
      <div className="recommendations">
        <div className="heading">
          <span>Favorites</span>
        </div>
        <div className="cards">
          {userFavorites.map((userFavorite)=>{return(
            <div className="card">
            <div className="image">
              <img src={userFavorite.pictures[0]} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {userFavorite.price}</p>
              <span className="kilometer">{userFavorite.category}</span>
              <p className="name"> {userFavorite.name}</p>
            </div>
            <div className="date">
              <span>{userFavorite.createdAt}</span>
            </div>
          </div>
          )

          })}
        </div>
      </div>
      : null
      }
    </div>
  );
}

export default Posts;
