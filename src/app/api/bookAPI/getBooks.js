import axios from "axios";

const getBooks = async () => {
  const token = window.localStorage.getItem("token");
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/books/list",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    const data = response.data;
    console.log(data);
    return data;
    // setMembers(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};
export default getBooks;
