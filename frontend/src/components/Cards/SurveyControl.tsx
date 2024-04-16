import React, { useState, useEffect } from "react";
import StartScreen from "./StartScreen";
import Survey2 from "./Survey2";

interface FormData {
  id: string;
  gender: string;
  age: string;
  yearsOfEnglish: string;
}

interface SurveyControlProps {
  formData: FormData;
}

const SurveyControl: React.FC<SurveyControlProps> = ({ formData }) => {
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

  return <>{!showSurvey ? <StartScreen /> : <Survey2 formData={formData} />}</>;
};

export default SurveyControl;
