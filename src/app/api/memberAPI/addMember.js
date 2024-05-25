import axios from "axios";

const addMember = (dataMember) => {
  const token = window.localStorage.getItem("token");
  
  axios
    .post("http://localhost:8080/member/add", dataMember, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("Yêu cầu thành công", response.data);
    })
    .catch((error) => {
      console.error("Lỗi khi gửi yêu cầu", error);
    });
};

export default addMember;
