import axios from "axios";

const getMemberId = async (memberId) => {
  try {
    // Gọi yêu cầu API xóa thành viên và truyền memberId vào URL
  const token = window.localStorage.getItem("token");

    const response = await axios.get(
      `http://localhost:8080/member/getMemberById/${memberId}`,
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
export default getMemberId;
