import React, { useState, useEffect } from "react";
import StartScreen from "./StartScreen";
import Survey from "./Survey";

const SurveyControl: React.FC = () => {
  const [showSurvey, setShowSurvey] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.keyCode === 32) {
        setShowSurvey(true);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return <>{!showSurvey ? <StartScreen /> : <Survey />}</>;
};

export default SurveyControl;
