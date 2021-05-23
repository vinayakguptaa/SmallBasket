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

export const getAll = async () => {
  let result;
  await axios
    .get(`${process.env.REACT_APP_URL}/product/all`)
    .then((res) => {
      if (res.status === 200) result = res.data;
      else result = 0;
    })
    .catch((err) => {
      result = 0;
    });
  return result;
};

export const getProduct = async (id) => {
  let result;
  await axios
    .get(`${process.env.REACT_APP_URL}/product/${id}`)
    .then((res) => {
      if (res.status === 200) result = res.data[0];
      else result = 0;
    })
    .catch((err) => {
      result = 0;
    });
  return result;
};

export const addReview = async (data, token) => {
  let result;
  await axios
    .post(`${process.env.REACT_APP_URL}/product/addRev`, data, {
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

export const delReview = async (data, token) => {
  let result;
  await axios
    .post(`${process.env.REACT_APP_URL}/product/delRev`, data, {
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