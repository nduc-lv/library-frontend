'use client';
import React, { useEffect, useState } from 'react';
import ModalAddBook from './ModalAddBook';
import ModalUpdateBook from './ModalUpdateBook';
import ModalDeleteBook from './ModalDeleteBook';
import ModalNotification from './ModalNotification';
import { FaRegEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { IoAddSharp } from 'react-icons/io5';
import { getAllBooksAPI, addNewBookAPI, deleteBookAPI, updateBookAPI } from '../api/bookApi';
import { cx } from './page';

export const Book = () => {
  const [books, setBooks] = useState([]);

  const [notification, setNotification] = useState('');

  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [bookEdit, setBookEdit] = useState({});

  const getAllBooks = async () => {
    let response = await getAllBooksAPI();

    if (response && response.status === 200) {
      setBooks(response.data);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  const toggleNotificationModal = () => {
    setShowNotificationModal(!showNotificationModal);
  };

  const toggleAddModal = () => {
    setNotification('Sách đã được thêm thành công!');
    setShowAddModal(!showAddModal);
  };

  const toggleUpdateModal = () => {
    setNotification('Sách đã được cập nhật thành công!');
    setShowUpdateModal(!showUpdateModal);
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const createNewBook = async (data) => {
    try {
      let response = await addNewBookAPI(data);
      if (response && response.status === 200) {
        await getAllBooks();
        setShowNotificationModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBook = (book) => {
    setShowDeleteModal(true);
    setBookEdit(book);
  };

  const doDeleteBook = async (id) => {
    try {
      let response = await deleteBookAPI(id);
      if (response && response.status === 200) {
        await getAllBooks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateBook = (book) => {
    setShowUpdateModal(true);
    setBookEdit(book);
  };

  const doUpdateBook = async (updatedBook) => {
    try {
      let response = await updateBookAPI(updatedBook);
      if (response && response.status === 200) {
        await getAllBooks();
        setShowNotificationModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cx('book-container')}>
      <ModalNotification isOpen={showNotificationModal} toggleModal={toggleNotificationModal} notification={notification} />

      <ModalAddBook isOpen={showAddModal} toggleModal={toggleAddModal} createNewBook={createNewBook} />

      <ModalUpdateBook isOpen={showUpdateModal} toggleModal={toggleUpdateModal} currentBook={bookEdit} updateBook={doUpdateBook} />

      <ModalDeleteBook isOpen={showDeleteModal} toggleModal={toggleDeleteModal} currentBook={bookEdit} deleteBook={doDeleteBook} />

      <div className={cx('title')}>Quản lý sách</div>

      <div className={cx('btn-add')}>
        <button className={cx('btn', 'btn-primary')} onClick={toggleAddModal}>
          <IoAddSharp size={'24px'} className={cx('icon-add')} />
          Thêm
        </button>
      </div>

      <table className={cx('book-table')}>
        <tbody>
          <tr>
            <th>Id</th>
            <th>Tên sách</th>
            <th>Hình ảnh</th>           
            <th>Thể loại</th>            
            <th>Tác giả</th>
            <th>Đánh giá</th>
            <th>Số lượng</th>
          </tr>

          {books &&
            books.map((book, index) => {
              return (
                <tr key={index}>
                  <td>{book.id}</td>

                  <td>{book.name}</td>

                  <td>{book.image}</td>

                  <td>{book.genres}</td>

                  <td>{book.authors}</td>

                  <td>{book.review}</td>

                  <td>{book.quantity}</td>

                  <td className={cx("icon-wrapper")}>
                    <FaRegEdit size={'20px'} className={cx('icon-update')} onClick={() => handleUpdateBook(book)} />
                    <AiFillDelete size={'20px'} className={cx('icon-delete')} onClick={() => handleDeleteBook(book)} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
