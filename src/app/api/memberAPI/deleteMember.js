import axios from "axios";



const handleDeleteMember = async (idMember) => {
  const token = window.localStorage.getItem("token");
  
  try {
    // Gọi yêu cầu API xóa thành viên và truyền memberId vào URL
    await axios.delete(`http://localhost:8080/member/delete/${idMember}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("error deleting:", error);
  }
};
export default handleDeleteMember;
