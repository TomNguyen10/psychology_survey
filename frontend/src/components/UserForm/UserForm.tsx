import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import NoticeOne from "../Cards/NoticeOne";
import axios from "axios";

const BASE_URL = "http://localhost:1337/api/";
interface FormData {
  id: string;
  gender: string;
  age: string;
  yearsOfEnglish: string;
}

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    id: "",
    gender: "",
    age: "",
    yearsOfEnglish: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const addInfo = async (formData) => {
      try {
        const response = await axios.post(`${BASE_URL}add-info`, formData);
        console.log(response.data);
      } catch (error: Error) {
        console.error(error.message);
      }
    };
    addInfo(formData);
    setIsSubmitted(true);
    console.log(formData);
  };

  const validateForm = (): void => {
    const { id, gender, age, yearsOfEnglish } = formData;
    if (
      id.trim() !== "" &&
      gender !== "" &&
      !isNaN(Number(age)) &&
      !isNaN(Number(yearsOfEnglish))
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  return (
    <div>
      {!isSubmitted ? (
        <>
          <h1>Request</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="id">id</label>
              <input
                type="text"
                name="id"
                id="id"
                value={formData.id}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="gender">gender</label>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
              </select>
            </div>
            <div>
              <label htmlFor="age">age</label>
              <input
                type="text"
                name="age"
                id="age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="yearsOfEnglish">Years Of English</label>
              <input
                type="text"
                name="yearsOfEnglish"
                id="yearsOfEnglish"
                value={formData.yearsOfEnglish}
                onChange={handleChange}
              />
            </div>
            <button type="submit" disabled={!isFormValid}>
              Submit
            </button>
          </form>
        </>
      ) : (
        <NoticeOne id={formData.id} />
      )}
    </div>
  );
};

export default UserForm;
