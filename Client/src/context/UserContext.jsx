import React, { createContext, useEffect, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  isLoggedIn: false,
  token: "",
  isAdmin: false,
  //   studentProfile: {},
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoginTrue(token);
    } else {
      setLoginFalse();
    }
  }, []);

  const setLoginTrue = async (token) => {
    // const profile = await fetchStudentProfile(token);
    // if (profile) {
    dispatch({ type: "SET_LOGIN_TRUE", payload: token });
    //   setStudentDetails(profile);
    // localStorage.setItem("token", token);
    // } else {
    //   localStorage.clear();
    // }
  };

  const setLoginFalse = () => {
    localStorage.clear();
    dispatch({ type: "SET_LOGIN_FALSE" });
  };

  const setStudentDetails = (profile) => {
    dispatch({ type: "SET_STUDENT_PROFILE", payload: profile });
  };

  const value = {
    ...state,
    setLoginTrue,
    setLoginFalse,
    setStudentDetails,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOGIN_TRUE":
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload,
      };
    case "SET_LOGIN_FALSE":
      return {
        ...state,
        isLoggedIn: false,
        token: "",
      };
    case "SET_STUDENT_PROFILE":
      return {
        ...state,
        studentProfile: action.payload,
      };
    default:
      return { ...state };
  }
};
