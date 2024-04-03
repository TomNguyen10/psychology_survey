import { useState, useEffect } from "react";
import NoticeTwo from "./NoticeTwo";

const NoticeOne: React.FC = () => {
  const [showNoticeTwo, setShowNoticeTwo] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.keyCode === 32) {
        setShowNoticeTwo(true);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  return (
    <>
      {!showNoticeTwo ? (
        <>
          <h2>Notice</h2>
          <div>
            Please read the instruction <u>carefully</u> before starting the
            test.
          </div>
          <div>
            At <u>anytime</u> during the test, if you have any questions, please
            contact the conductors immediately.
          </div>
          <div>
            Click <i>space</i> to move to the next page.
          </div>
        </>
      ) : (
        <NoticeTwo />
      )}
    </>
  );
};

export default NoticeOne;
