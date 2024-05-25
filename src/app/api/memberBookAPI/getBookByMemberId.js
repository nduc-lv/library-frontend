import axios from "axios";

const getBookByIdMember = async (memberId) => {
  const token = window.localStorage.getItem("token");

  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/memberbook/users/${memberId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log("error deleting:", error);
    return null;
  }
};
export default getBookByIdMember;
