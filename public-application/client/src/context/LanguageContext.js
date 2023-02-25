import React, { useMemo, useState, useEffect, useContext } from "react";

export const LanguageContext = React.createContext({ language: null });

export function useLanguage(){
    return useContext(LanguageContext);
}

export const LanguageContextProvider = (props) => {
  const [languageId, setLanguageId] = useState();

  useEffect(() => {
    const checkLanguage = () => {
      setLanguageId("HR");
    };
    checkLanguage();
  }, []);

  const value = {
    languageId,
    setLanguageId
  }

  return (
    <LanguageContext.Provider value={value}>
      {props.children}
    </LanguageContext.Provider>
  );
};