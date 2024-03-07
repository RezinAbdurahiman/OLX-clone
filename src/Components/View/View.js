import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { viewContext } from '../../store/context';

function View() {
  var pictures= []
  const [mainPicture, setMainPicture] = useState('')
  
  useEffect(()=>{console.log(viewProduct)
  pictures = viewProduct.pictures
  setMainPicture(pictures[0])
  console.log(pictures)},[])
  const {viewProduct, setViewProduct} = useContext(viewContext)
  return (
    viewProduct && (
      <div className="viewParentDiv">
        <div className="imageShowDiv">
          <img
            src={mainPicture}
            alt=""
          />
          <div className='imagesArea'>
            {viewProduct.pictures.map((picture, index) => (
              <img className="imageUploaded" alt="Posts" width="200px" height="200px" src={picture} onClick={()=>{setMainPicture(picture)}}></img>
            ))}
          </div>
        </div>
        <div className="rightSection">
          <div className="productDetails">
            <p>&#x20B9;{viewProduct.price}</p>
            <span>{viewProduct.name}</span>
            <p>{viewProduct.category}</p>
            <span>{viewProduct.createdAt}</span>
          </div>
          <div className="contactDetails">
            <p>Seller details</p>
          <p>{viewProduct.seller}</p>
            <p>{viewProduct.phoneNumber}</p>
          </div>
        </div>
      </div>
    )
  );
  
  
  
}
export default View;
