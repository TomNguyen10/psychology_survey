import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:1337/api/";

const Survey: React.FC = () => {
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [userInput, setUserInput] = useState<string | null>(null);

  useEffect(() => {
    if (words.length === 0) {
      const getWords = async () => {
        try {
          const response = await axios.get<string[]>(`${BASE_URL}get-words`);
          setWords(response.data);
        } catch (error: Error) {
          setError(error.message);
        }
      };

      getWords();
    }
  }, [words]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "f" || event.key === "j") {
        setUserInput(event.key);
        console.log(`User pressed: ${event.key}`);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (currentWordIndex < words.length) {
      console.log(words);
      const interval = setInterval(() => {
        console.log(words[currentWordIndex]);
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
        setUserInput(null);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentWordIndex, words]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const currentWord = words[currentWordIndex] || "";

  return (
    <div>
      <h2>Word Display Game</h2>
      <div style={{ fontSize: "24px", marginTop: "20px" }}>{currentWord}</div>
      <div>User Input: {userInput}</div>
    </div>
  );
};

export default Survey;
