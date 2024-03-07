import React, { useState, Fragment, useContext, useEffect } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { authContext, firebaseContext, loadingContext, navigateContext } from '../../store/context';

const Create = () => {
  useEffect(()=>{console.log(user)},[])
  const date = new Date()
  const [image, setImage] = useState(null)
  const [main, setMain] = useState(null)
  const [name, setName]= useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const {loading, setLoading} = useContext(loadingContext)
  const {firebase} = useContext(firebaseContext)
  const {user} = useContext(authContext)
  const {navigate} = useContext(navigateContext)
  const handleClick = async(e)=> {
    try {
      e.preventDefault()
      setLoading(true)
      const downloadURLs = await Promise.all(
        image.map(async (picture) => {
          const uploadTask = await firebase.storage().ref(`/image/${picture.name}`).put(picture);
          const downloadURL = await uploadTask.ref.getDownloadURL();
          return downloadURL;
        })
      );
  
      console.log(downloadURLs);
  
      // Continue with the rest of your code
      firebase.firestore().collection('products').add({
        seller : user.displayName,
        phoneNumber: user.userPhone,
        location,
        name,
        category,
        price,
        pictures: downloadURLs,
        createdAt: date.toDateString(),
        
      });
  
      setLoading(false);
      navigate('/')
    } catch (error) {
      console.error('Error uploading images:', error);
      setLoading(false); 
    }
  };
  
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form onSubmit={handleClick}>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              placeholder='Name of the product'
              onChange={(e)=>setName(e.target.value)}
            />
            <br />
            <br/>
            <input
              className="input"
              type="text"
              id="fname"
              name="Location"
              placeholder='City/State'
              onChange={(e)=>setLocation(e.target.value)}
            />
            <br/>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              placeholder='Category'
              onChange={(e)=>setCategory(e.target.value)}
            />
            <br />
            <br />
            <input className="input" type="number" id="fname" name="Price" placeholder='Price' onChange={(e)=> setPrice(e.target.value)} />
            <br />
          
          <br />
          {main && <img className='mainImage' alt="Posts"  src={main? URL.createObjectURL(main) : ""}></img>}
          <div className={image? 'imageArea' : ""}>
          {image ?
          image.map((picture)=>{return <img className="imageUploaded" alt="Posts" width="200px" height="200px" src={picture? URL.createObjectURL(picture) : ""} onClick={()=>setMain(picture)}></img>}) : null}
          </div>
          
            <br />
            <input type="file" accept='image/*, video/*' onChange={(e)=>{setImage([...e.target.files]); setMain(e.target.files[0])}} multiple/>
            <br />
            <button className="uploadBtn" >upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
