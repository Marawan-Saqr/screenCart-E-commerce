import React, { createContext, useState } from 'react';


export const CartContext = createContext();
const CartProvider = ({children}) => {

  // Add To Cart Function
  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    const isExist = cart.find(res => res.id === product.id);
    if (!isExist) {
      const newCart = [...cart, product];
      setCart(newCart);
    }
  }


  return (
    <CartContext.Provider value={{cart, addToCart}}>
      {children}
    </CartContext.Provider>
  )
}


export default CartProvider;