import { useEffect, useState } from "react";

export const useLocalStorage = (key,initialValue) => {
    const [storedValue,setStoredValue]=useState(() => {
        if (typeof window === "undefined") {
          return initialValue;
        }
        try {
          const item = localStorage.getItem(key);
          return item ? JSON.parse(item) : initialValue;
        } 
        catch (error) {
          console.error(error);
          return initialValue;
        }
      })
    
    useEffect(() => {
        try {
          window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
          console.error("Error writing to localStorage:", error);
        }
      }, [key, storedValue]);
    
      return [storedValue,setStoredValue];
};
