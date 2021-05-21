import axios from "axios";

export const add = async (data, token) => {
  let result;
  console.log(data);
  let form = new FormData();
  form.append("name", data.name);
  form.append("price", data.price);
  form.append("image", data.image[0]);

  await axios
    .post(`${process.env.REACT_APP_URL}/product/add`, form, {
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

export const getProfile = async (token) => {
  let result;
  await axios
    .get(`${process.env.REACT_APP_URL}/user/getProfile`, {
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
