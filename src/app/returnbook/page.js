'use client';
import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

function ReturnBookForm() {
  const [userId, setUserId] = useState('');
  const [bookIds, setBookIds] = useState([]);
  const [dateReturn, setDateReturn] = useState(new Date());
  const [showDialog, setShowDialog] = useState(false);
  const [errorDialogVisible, setErrorDialogVisible] = useState(false);

  const handleReturnBook = () => {
    if (!userId || bookIds.length === 0) {
      setErrorDialogVisible(true);
      return;
    }

    setShowDialog(true);
  };

  const handleConfirmReturn = () => {
    const token = window.localStorage.getItem('token');

    const returnPromises = bookIds.map((bookId) =>
      axios.put(
        `http://localhost:8080/api/v1/memberbook/?userId=${userId}&bookId=${bookId}`,
        { dateReturn },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    );

    Promise.all(returnPromises)
      .then((responses) => {
        console.log(responses);
        setShowDialog(false);
        setUserId('');
        setBookIds([]);
        setDateReturn('');

        const totalCost = responses.reduce((total, response) => {
          const price = response.data.price || 0;
          return total + price;
        }, 0);

        alert(`Total borrowing cost: ${totalCost}VND`);
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
    <div className="return-book-form">
      <h2>Trả sách</h2>
      <div className="form-group">
        <label htmlFor="userId">Mã khách hàng:</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
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
        <label htmlFor="dateReturn">Ngày trả sách:</label>
        <input
          type="date"
          id="dateReturn"
          value={dateReturn}
          onChange={(e) => setDateReturn(e.target.value)}
        />
      </div>
      <button className="btn-return" onClick={handleReturnBook}>
        Trả sách
      </button>

      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <h3>Xác nhận trả sách</h3>
            <p>Vui Lòng xác nhận thao tác trả sách !</p>
            <div className="dialog-actions">
              <button className="btn-confirm" onClick={handleConfirmReturn}>
                Xác Nhận
              </button>
              <button
                className="btn-cancel"
                onClick={() => setShowDialog(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

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

export default ReturnBookForm;

