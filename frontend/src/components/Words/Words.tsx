import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:1337/api/";

const Words: React.FC = () => {
  const [words, setWords] = useState<string[]>([]);
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

  return (
    <div>
      <h2>Words</h2>
      <ul>
        {words.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  );
};

export default Words;
