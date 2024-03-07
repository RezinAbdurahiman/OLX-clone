import { Children, createContext, useState } from 'react'
import React from 'react'

export const loadingContext = createContext(null)
export const firebaseContext = createContext(null)
export const navigateContext = createContext(null)
export const authContext = createContext(null)
export const favoriteContext = createContext(null)
export const productContext = createContext(null)
export const viewContext = createContext(null)

export default function Context({children}) {
    const [viewProduct, setViewProduct] = useState(null)
    const [user,setUser] = useState(null)
    const [products,setProducts] = useState([])
  return (
    <viewContext.Provider value={{viewProduct, setViewProduct}}>
    <productContext.Provider value={{products, setProducts}}>
    <authContext.Provider value={{user,setUser}}>
        {children}
    </authContext.Provider>
    </productContext.Provider>
    </viewContext.Provider>

  )
}
