import React, { createContext, useState } from 'react';

// Create Context
export const MyContext = createContext();

const Context = ({ children }) => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');

  return (
    <MyContext.Provider value={{ pickupLocation, setPickupLocation, dropLocation, setDropLocation }}>
      {children}
    </MyContext.Provider>
  );
};

export default Context;
