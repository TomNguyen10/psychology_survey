import React, { useState, ChangeEvent, FormEvent } from "react";

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log(formData); // Replace with your logic to handle form submission
  };

  return (
    <div>
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
          <input
            type="text"
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
          />
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
