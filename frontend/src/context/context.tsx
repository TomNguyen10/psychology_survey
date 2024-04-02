import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:1337/";

interface ContextValue {
  words: string[];
  getWords: () => Promise<void>;
}

const GlobalContext = createContext<ContextValue | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const useCustomContext = ({ children }: ProviderProps) => {
  const [words, setWords] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getWords = async () => {
    try {
      const response = await axios.get<string[]>(`${BASE_URL}get-words`);
      setWords(response.data);
      return response.data;
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <GlobalContext.Provider value={{ getWords }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};
