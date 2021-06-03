import axios from "axios";

export const placeOrder = async (token) => {
  let result;
  await axios
    .post(`${process.env.REACT_APP_URL}/order`, null, {
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

export const getAll = async (token) => {
  let result;
  await axios
    .get(`${process.env.REACT_APP_URL}/order`, {
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
}