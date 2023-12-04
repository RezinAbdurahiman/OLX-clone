import React, { useContext } from 'react'
import Loading from '../Components/Loading/Loading'
import Header from '../Components/Header/Header'
import View from '../Components/View/View'
import { loadingContext } from '../store/context'

function ViewPost(props) {
    const {loading} = useContext(loadingContext)
    return (
        <div>
            {loading? <Loading/> :
            <div>
            <Header/>
            <View/>
            </div>
            }
        </div>
    )
}

export default ViewPost
