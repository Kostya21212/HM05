import axios from "axios";
const API = "https://66e75ad417055714e58c11a2.mockapi.io/todos";

const services = {
  get: (id) =>
    axios(id ? `${API}/${id}` : API)
      .then(({ data }) => data)
      .catch((err) => console.log(err)),
  delete: (id) => axios.delete(`${API}/${id}`).then(({ data }) => data),
  put: (id, item) => axios.put(`${API}/${id}`, item).then(({ data }) => data),
  post: (item) => axios.post(API, item).then(({ data }) => data),
};

export default services;
