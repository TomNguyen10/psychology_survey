import React from "react";
import NoticeTwo from "./NoticeTwo";

interface FormData {
  id: string;
  gender: string;
  age: string;
  yearsOfEnglish: string;
}

interface NoticeOneProps {
  formData: FormData;
}

const NoticeOne: React.FC<NoticeOneProps> = ({ formData }) => {
  const [showNoticeTwo, setShowNoticeTwo] = React.useState(false);

  React.useEffect(() => {
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
          <h5>User ID: {formData.id}</h5>
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
        <NoticeTwo formData={formData} />
      )}
    </>
  );
};

export default NoticeOne;
