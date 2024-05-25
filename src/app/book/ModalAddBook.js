'use client';
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

const ModalAddBook = (props) => {
  const [bookInfo, setBookInfo] = useState({
    name: '',
    image: '',
    genres: '',
    authors: '',
    review: '',
    quantity: 1
  });

  const toggle = () => {
    props.toggleModal();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setBookInfo((prevBookInfo) => ({
      ...prevBookInfo,
      [name]: value
    }));
  };

  const handleAddBook = () => {
    // Create a FormData object to handle file upload
    const formData = new FormData();
    formData.append('name', bookInfo.name);
    formData.append('image', bookInfo.image);
    formData.append('genres', bookInfo.genres);
    formData.append('authors', bookInfo.authors);
    formData.append('review', bookInfo.review);
    formData.append('quantity', bookInfo.quantity);

    // Call the parent function to create a new book with the form data
    props.createNewBook(formData);
    toggle();
  };

  const handleFileChange = (event) => {
    setBookInfo((prevBookInfo) => ({
      ...prevBookInfo,
      image: event.target.files[0]
    }));
  };

  return (
    <Modal isOpen={props.isOpen} toggle={toggle} size="lg" centered>
      <ModalHeader toggle={toggle}>Thêm sách mới</ModalHeader>
      <ModalBody>
        <Form>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="name">Tên sách</Label>
                <Input type="text" name="name" id="name" onChange={handleInputChange} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="authors">Tác giả</Label>
                <Input type="text" name="authors" id="authors" onChange={handleInputChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="genres">Thể loại</Label>
                <Input type="text" name="genres" id="genres" onChange={handleInputChange} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="quantity">Số lượng</Label>
                <Input type="number" name="quantity" id="quantity" min="1" onChange={handleInputChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Label for="review">Đánh giá</Label>
                <Input type="textarea" name="review" id="review" onChange={handleInputChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Label for="image">Ảnh bìa</Label>
                <Input type="file" name="image" id="image" onChange={handleFileChange} />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleAddBook}>
          Thêm sách
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Đóng
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalAddBook;
