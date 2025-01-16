"use client";
import React, { useEffect } from "react";
const context = React.createContext({});
import moment from "moment";

function Provider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log("provider");
    const rbcContent = document.querySelector(".rbc-time-content");
    const currentTimeIndicator = document.querySelector(
      ".rbc-current-time-indicator"
    );

    console.log(rbcContent);
  }, []);
  return <context.Provider value={{}}>{children}</context.Provider>;
}

export default Provider;
