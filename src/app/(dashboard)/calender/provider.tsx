"use client";
import React, { useEffect } from "react";
const context = React.createContext({});
import moment from "moment";

function Provider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const rbcContent = document.querySelector(".rbc-time-content");
    const currentTimeIndicator = document.querySelector(
      ".rbc-current-time-indicator"
    );
  }, []);
  return <context.Provider value={{}}>{children}</context.Provider>;
}

export default Provider;
