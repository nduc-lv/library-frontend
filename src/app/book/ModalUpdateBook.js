'use client';
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

const ModalUpdateBook = (props) => {
  const [updateBook, setUpdateBook] = useState({
    id: '',
    name: '',
    image: null,
    genres: '',
    authors: '',
    review: '',
    quantity: '',
  });

  useEffect(() => {
    setUpdateBook(props.currentBook);
  }, [props.currentBook]);

  const toggle = () => {
    props.toggleModal();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'image') {
      const file = event.target.files[0];
      setUpdateBook((prevBookInfo) => ({
        ...prevBookInfo,
        image: file,
      }));
    } else if (name === 'quantity') {
      const numberValue = parseInt(value);
      setUpdateBook((prevBookInfo) => ({
        ...prevBookInfo,
        [name]: numberValue,
      }));
    } else {
      setUpdateBook((prevBookInfo) => ({
        ...prevBookInfo,
        [name]: value,
      }));
    }
  };

  const handleSaveBook = () => {
    const formData = new FormData();
    formData.append('name', updateBook.name);
    if (updateBook.image) {
      formData.append('image', updateBook.image);
    }
    formData.append('genres', updateBook.genres);
    formData.append('authors', updateBook.authors);
    formData.append('review', updateBook.review);
    formData.append('quantity', updateBook.quantity);

    props.updateBook(props.currentBook.id, formData);
    toggle();
  };

  return (
    <Modal isOpen={props.isOpen} toggle={toggle} size="lg" centered>
      <ModalHeader toggle={toggle}>Cập nhật sách</ModalHeader>
      <ModalBody>
        <Form>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="name">Tên sách</Label>
                <Input type="text" name="name" id="name" value={updateBook.name} onChange={handleInputChange} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="image">Hình ảnh</Label>
                <Input type="file" name="image" id="image" onChange={handleInputChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="genres">Thể loại</Label>
                <Input type="text" name="genres" id="genres" value={updateBook.genres} onChange={handleInputChange} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="authors">Tác giả</Label>
                <Input type="text" name="authors" id="authors" value={updateBook.authors} onChange={handleInputChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Label for="review">Đánh giá</Label>
                <Input type="textarea" name="review" id="review" value={updateBook.review} onChange={handleInputChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="quantity">Số lượng</Label>
                <Input type="number" name="quantity" id="quantity" min="1" value={updateBook.quantity} onChange={handleInputChange} />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSaveBook}>
          Lưu
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Đóng
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalUpdateBook;
