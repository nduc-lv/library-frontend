// import axios from 'axios';
// const getAllBooksAPI = () => {
//   const token = window.localStorage.getItem('token');
//   return axios.get('http://localhost:8080/api/v1/books/list', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };
// const addNewBookAPI = (data) => {
//   const token = window.localStorage.getItem('token');
//   return axios.post('http://localhost:8080/api/v1/books/add', data, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };
// const deleteBookAPI = (bookId) => {
//   const token = window.localStorage.getItem('token');
//   return axios.delete('http://localhost:8080/api/v1/books/delete', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     params: {
//       bookId: bookId,
//     },
//   });
// };
// const updateBookAPI = (data) => {
//   const token = window.localStorage.getItem('token');
//   return axios.put('http://localhost:8080/api/v1/books/update', data, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     params: {
//       bookId: data.bookId,
//     },
//   });
// };
// export { getAllBooksAPI, addNewBookAPI, deleteBookAPI, updateBookAPI };
//sua
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const getAllBooksAPI = (limit, page) => {
  const token = window.localStorage.getItem('token');
  return axios.get(`${BASE_URL}/books`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      limit: limit,
      page: page,
    },
  });
};

const addNewBookAPI = (data) => {
  const token = window.localStorage.getItem('token');
  return axios.post(`${BASE_URL}/books`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteBookAPI = (bookId) => {
  const token = window.localStorage.getItem('token');
  return axios.delete(`${BASE_URL}/books`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      bookId: bookId,
    },
  });
};

const updateBookAPI = (bookId, data) => {
  const token = window.localStorage.getItem('token');
  return axios.put(`${BASE_URL}/books/${bookId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { getAllBooksAPI, addNewBookAPI, deleteBookAPI, updateBookAPI };
