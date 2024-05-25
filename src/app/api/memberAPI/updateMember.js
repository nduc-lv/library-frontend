import axios from "axios";

const updateMember = async (memberId, updatedData) => {
  const token = window.localStorage.getItem("token");

  try {
    const url = `http://localhost:8080/member/update/${memberId}`;
    const response = await axios.put(url, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data); // Xử lý dữ liệu phản hồi từ API (tuỳ theo API của bạn)
  } catch (error) {
    console.error(error);
  }
};
export default updateMember;
