'use client';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
const ModalNotification = (props) => {
  const toggle = () => {
    props.toggleModal();
  };
  return (
    <Modal isOpen={props.isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Thông báo</ModalHeader>
      <ModalBody>{props.notification}</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Đóng
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalNotification;
