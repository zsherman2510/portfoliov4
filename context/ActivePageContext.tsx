// context/ActivePageContext.tsx
"use client";
import { createContext, useState, useContext, ReactNode } from "react";

interface ActivePageContextType {
  activePage: string;
  setActivePage: (page: string) => void;
}

const ActivePageContext = createContext<ActivePageContextType | undefined>(
  undefined
);

export const ActivePageProvider = ({ children }: { children: ReactNode }) => {
  const [activePage, setActivePage] = useState("Generated");

  return (
    <ActivePageContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </ActivePageContext.Provider>
  );
};

export const useActivePage = () => {
  const context = useContext(ActivePageContext);
  if (!context) {
    throw new Error("useActivePage must be used within an ActivePageProvider");
  }
  return context;
};
