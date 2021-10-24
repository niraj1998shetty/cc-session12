import React from "react";
import { useState, useEffect } from "react";

const usePersistanceState = (key, initValue) => {
  const [persistanceKey, setPersistance] = useState(localStorage.getItem(key) || initValue);
  useEffect(() => {
    localStorage.setItem(key, persistanceKey);
  }, [persistanceKey]);

  return [persistanceKey, setPersistance];
};
export default usePersistanceState;
