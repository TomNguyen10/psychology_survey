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

const Survey: React.FC<SurveyProps> = ({ formData }) => {
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [userInput, setUserInput] = useState<string | null>(null);
  const [userInputAllowed, setUserInputAllowed] = useState<boolean>(true);
  const [wordDisplayTime, setWordDisplayTime] = useState<number | null>(null);
  const [responseTimes, setResponseTimes] = useState<{
    [word: string]: number;
  }>({});

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
      if (userInputAllowed && (event.key === "f" || event.key === "j")) {
        setUserInput(event.key);
        setUserInputAllowed(false);
        const responseTime = Date.now() - (wordDisplayTime || 0);
        const word = words[currentWordIndex];
        setResponseTimes((prevState) => ({
          ...prevState,
          [word]: responseTime,
        }));
        console.log(
          `User pressed: ${event.key}, Response Time: ${responseTime}ms`
        );
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [userInputAllowed]);

  useEffect(() => {
    if (currentWordIndex < words.length) {
      const interval = setInterval(() => {
        const wordStartTime = Date.now();
        console.log(words[currentWordIndex]);
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
        setUserInput(null);
        setUserInputAllowed(true);
        setWordDisplayTime(wordStartTime);
      }, 1000);

      return () => {
        console.log(responseTimes);
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
    </div>
  );
};

export default Survey;
