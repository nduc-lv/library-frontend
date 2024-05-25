import getBookByIdMember from "../memberBookAPI/getBookByMemberId";
import getBooks from "../bookAPI/getBooks";
import getMemberId from "./getMemberById";

const getMemberDetail = async (memberId) => {
  try {
    let listBookByMemberId = await getBookByIdMember(memberId);
    let getMemberById = await getMemberId(memberId);
    let listBook = await getBooks();

    if (!Array.isArray(listBookByMemberId)) {
      listBookByMemberId = [];
    }

    if (!Array.isArray(listBook)) {
      listBook = [];
    }
    const memberInfo = { ...getMemberById };

    const result = listBookByMemberId
      .filter((record) => record.memberId === memberId)
      .map((record) => {
        const book = listBook.find((book) => book.bookId === record.bookId);
        return {
          ...record,
          ...book,
        };
      });
    return result;

    // console.log(result);
  } catch (error) {
    console.log("Lỗi:", error);
    return [];
  }
};

export default getMemberDetail;
