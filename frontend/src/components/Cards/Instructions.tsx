import React, { useState, useEffect } from "react";
import SurveyControl from "./SurveyControl";
const Instructions: React.FC = () => {
  const [showSurveyControl, setShowSurveyControl] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === " ") {
        setShowSurveyControl(true);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      {!showSurveyControl ? (
        <>
          <h2>Instructions</h2>
          <div>
            First, you will be shown a list of words. The words will be
            displayed on the screen, one by one. Your task is trying your best
            to memorize the words
          </div>
          <div>
            Second, you will be asked to answer a series of questions. Your task
            is trying your best to recall whether the words are in the former
            list or not
          </div>
          <div>You will be notified before the real record starts</div>
          <div>
            Click <i>space</i> to move to Practice
          </div>
        </>
      ) : (
        <SurveyControl />
      )}
    </>
  );
};

export default Instructions;
