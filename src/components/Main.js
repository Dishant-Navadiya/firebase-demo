import React, { useState, createContext } from "react";

export const ListContext = createContext();

export const Main = (props) => {
  const [finalList, setFinalList] = useState(null);
  return (
    <ListContext.Provider value={[finalList, setFinalList]}>
      {props.children}
    </ListContext.Provider>
  );
};
