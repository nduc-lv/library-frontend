
'use client';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const ModalDeleteBook = (props) => {
  const toggle = () => {
    props.toggleModal();
  };

  const confirmDeleteBook = () => {
    props.deleteBook(props.currentBook.id);
    toggle();
  };
  return (
    <Modal isOpen={props.isOpen} toggle={toggle}>
      <ModalHeader>Xác nhận xóa sách</ModalHeader>
      <ModalBody>Bạn có chắc chắn muốn xóa cuốn sách "{props.currentBook.name}"?</ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={confirmDeleteBook}>
          Xóa
        </Button>
        <Button color="secondary" onClick={toggle}>
          Hủy
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalDeleteBook;
