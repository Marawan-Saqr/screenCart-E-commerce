// TitleContext.js
import React, { createContext, useContext } from 'react';
const TitleContext = createContext();

export const TitleProvider = ({ children }) => {
  const title = "All Products";

  return (
    <TitleContext.Provider value={title}>
      {children}
    </TitleContext.Provider>
  );
};

export const useTitle = () => useContext(TitleContext);