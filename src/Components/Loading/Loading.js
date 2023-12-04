import React from 'react'
import ReactLoading from 'react-loading'
import "./Loading.css"

function Loading() {
  return (
    <div className="bg" >
        <ReactLoading className='loading-icon'  type="bars" color="black" />  
    </div>
  )
}

export default Loading
