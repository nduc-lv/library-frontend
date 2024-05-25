import axios from "axios";

const FetchMembers = async () => {
  const token = window.localStorage.getItem("token");
  try {
    const response = await axios.get("http://localhost:8080/member/allMember", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    console.log(data);
    return data;
    // setMembers(data);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
  return null;
};
export default FetchMembers;
