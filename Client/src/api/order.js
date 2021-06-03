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

export const delCart = async (productId, token) => {
  let result;
  await axios
    .delete(`${process.env.REACT_APP_URL}/cart/${productId}`, {
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

export const updateCart = async (productId, data, token) => {
  let result;
  await axios
    .patch(`${process.env.REACT_APP_URL}/cart/${productId}`, data, {
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
