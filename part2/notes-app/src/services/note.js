import axios from "axios";
const baseUrl = "api/notes";
let token = null;

function setToken(newToken) {
  token = newToken;
}
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) =>
    response.data.concat({ id: 1000, content: "This is fake", important: true })
  );
};

const create = (newObject) => {
  const authObj = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const request = axios.post(baseUrl, newObject, authObj);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default {
  getAll: getAll,
  create: create,
  update: update,
  setToken,
};
