import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:1337/api/";

const Survey: React.FC = () => {
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWords = async () => {
      try {
        const response = await axios.get<string[]>(`${BASE_URL}get-words`);
        setWords(response.data);
      } catch (error: Error) {
        setError(error.message);
      }
    };

    getWords();
  }, []);

  useEffect(() => {
    if (currentWordIndex < words.length) {
      const interval = setInterval(() => {
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentWordIndex, words.length]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const currentWord = words[currentWordIndex] || "";

  return (
    <div>
      <h2>Word Display Game</h2>
      <div style={{ fontSize: "24px", marginTop: "20px" }}>{currentWord}</div>
    </div>
  );
};

export default Survey;
