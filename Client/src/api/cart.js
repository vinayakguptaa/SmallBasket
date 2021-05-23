import axios from "axios";

export const addCart = async (data, token) => {
  let result;
  await axios
    .post(`${process.env.REACT_APP_URL}/cart/add`, data, {
      headers: {
        authorization: token,
      },
    })
    .then((res) => {
      if (res.status === 200) result = res.data;
      else result = 0;
    })
    .catch((err) => {
      result = 0;
    });
  return result;
};

export const getCart = async (token) => {
  let result;
  await axios
    .get(`${process.env.REACT_APP_URL}/cart/`, {
      headers: {
        authorization: token,
      },
    })
    .then((res) => {
      if (res.status === 200) result = res.data;
      else result = 0;
    })
    .catch((err) => {
      result = 0;
    });
  return result;
};
