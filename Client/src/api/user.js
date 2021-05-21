import axios from "axios";

export const login = async (data) => {
  let result;
  await axios
    .post(`${process.env.REACT_APP_URL}/user/login`, data)
    .then((res) => {
      if (res.status === 200) result = res.data;
      else result = 0;
    })
    .catch((err) => {
      result = 0;
    });
  return result;
};

export const signup = async (data) => {
  let result;
  await axios
    .post(`${process.env.REACT_APP_URL}/user/register`, data)
    .then((res) => {
      if (res.status === 200) result = res.data;
      else result = 0;
    })
    .catch((err) => {
      result = 0;
    });
  return result;
};