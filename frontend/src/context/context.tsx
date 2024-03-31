import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:1337/api/";

const Context = React.createContext({});

export const Provider = ({ children }) => {
  const [userForm, setUserForm] = useState([]);
  const [resultForm, setResultForm] = useState([]);
  const [error, setError] = useState(null);

  const addInfo = async (info) => {
    const response = await axios
      .post(`${BASE_URL}add-info`, info)
      .catch((err) => {
        setError(err.response.data.message);
      });
  };
};
