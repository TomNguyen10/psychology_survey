import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:1337/api/";

interface FormData {
  id: string;
  gender: string;
  age: string;
  yearsOfEnglish: string;
}

interface SurveyProps {
  formData: FormData;
}

interface WordWithTime {
  word: string;
  displayTime: Date;
}

const Survey: React.FC<SurveyProps> = ({ formData }) => {
  const [words, setWords] = useState<string[]>([]);
  const [wordTimes, setWordTimes] = useState<WordWithTime[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await axios.get<string[]>(`${BASE_URL}get-words`);
        setWords(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (words.length === 0) {
      fetchWords();
    }
  }, [words]);

  useEffect(() => {
    if (currentWordIndex < words.length) {
      const interval = setInterval(() => {
        const currentWord = words[currentWordIndex];
        const displayTime = new Date();
        setWordTimes((prevWordTimes) => [
          ...prevWordTimes,
          { word: currentWord, displayTime },
        ]);
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [currentWordIndex, words]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const currentWord = words[currentWordIndex] || "";

  return (
    <div>
      <h5>ID: {formData.id}</h5>
      <h2>Word Display Game</h2>
      <div style={{ fontSize: "24px", marginTop: "20px" }}>{currentWord}</div>
      <div>
        <h3>Word Display Times</h3>
        <ul>
          {wordTimes.map((wordTime, index) => (
            <li key={index}>
              {wordTime.word} - {wordTime.displayTime.toLocaleTimeString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Survey;
