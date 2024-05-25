'use client';
import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

function BorrowBookForm() {
  const [memberId, setMemberId] = useState('');
  const [bookIds, setBookIds] = useState([]);
  const [dateBorrow, setDateBorrow] = useState(new Date());
  const [showDialog, setShowDialog] = useState(false);
  const [errorDialogVisible, setErrorDialogVisible] = useState(false);

  const handleBorrowBook = () => {
    if (!dateBorrow || !memberId || bookIds.length === 0) {
      setErrorDialogVisible(true);
      return;
    }

    setShowDialog(true);
  };

  const handleConfirmBorrow = () => {
    const token = window.localStorage.getItem('token');

    const borrowPromises = bookIds.map((bookId) =>
      axios.post(
        'http://localhost:8080/api/v1/memberbook/add',
        {
          memberId,
          bookId,
          dateBorrow,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    );

    Promise.all(borrowPromises)
      .then((responses) => {
        console.log(responses);
        setShowDialog(false);
        setMemberId('');
        setBookIds([]);
        setDateBorrow('');
      })
      .catch((error) => {
        console.error(error);
        setShowDialog(false);
        setErrorDialogVisible(true);
      });
  };

  const handleAddBookId = () => {
    setBookIds([...bookIds, '']);
  };

  const handleBookIdChange = (index, value) => {
    const updatedBookIds = [...bookIds];
    updatedBookIds[index] = value;
    setBookIds(updatedBookIds);
  };

  return (
    <div className="borrow-book-form">
      <h2>Thông tin mượn sách</h2>
      <div className="form-group">
        <label htmlFor="memberId">Mã khách hàng:</label>
        <input
          type="text"
          id="memberId"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
        />
      </div>
      {bookIds.map((bookId, index) => (
        <div className="form-group" key={index}>
          <label htmlFor={`bookId-${index}`}>Mã sách:</label>
          <input
            type="text"
            id={`bookId-${index}`}
            value={bookId}
            onChange={(e) => handleBookIdChange(index, e.target.value)}
          />
        </div>
      ))}
      <button className="btn-add" onClick={handleAddBookId}>
        Thêm sách
      </button>
      <div className="form-group">
        <label htmlFor="dateBorrow">Ngày mượn sách:</label>
        <input
          type="date"
          id="dateBorrow"
          value={dateBorrow}
          onChange={(e) => setDateBorrow(e.target.value)}
        />
      </div>
      <button className="btn-borrow" onClick={handleBorrowBook}>
        Mượn sách
      </button>

      {/* Dialog for confirmation */}
      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <h3>Xác nhận mượn sách</h3>
            <p>Vui lòng xác nhận thao tác mượn sách !</p>
            <div className="dialog-actions">
              <button className="btn-confirm" onClick={handleConfirmBorrow}>
                Xác nhận
              </button>
              <button className="btn-cancel" onClick={() => setShowDialog(false)}>
                Hủy 
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error dialog */}
      {errorDialogVisible && (
        <div className="dialog-overlay error">
          <div className="dialog-content error">
            <h3>Thông báo lỗi !</h3>
            <p>Vui lòng kiểm tra lại thông tin khách hàng và thông tin sách !</p>
            <button className="close" onClick={() => setErrorDialogVisible(false)}>
              Thoát
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BorrowBookForm;
