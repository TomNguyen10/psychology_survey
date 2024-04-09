import React, { useState, useEffect } from "react";
import Instructions from "./Instructions";
interface FormData {
  id: string;
  gender: string;
  age: string;
  yearsOfEnglish: string;
}

interface NoticeTwoProps {
  formData: FormData;
}

const NoticeTwo: React.FC<NoticeTwoProps> = ({ formData }) => {
  const [showInstruction, setShowInstruction] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.keyCode === 32) {
        setShowInstruction(true);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      {!showInstruction ? (
        <>
          <h5>User ID: {formData.id}</h5>
          <h2>Notice</h2>
          <div>Upon finish reading the instruction</div>
          <div>
            You will participate in a 2-min practice. This practice result will
            not be recorded, just to make sure that you understand the process
            correctly.
          </div>
          <div>
            Completing the practice will lead you to the real record. You will
            be informed before it starts. Feel free to take a break in the
            middle if needed to.
          </div>
          <div>
            Click <i>space</i> to move the instruction
          </div>
        </>
      ) : (
        <Instructions formData={formData} />
      )}
    </>
  );
};

export default NoticeTwo;
