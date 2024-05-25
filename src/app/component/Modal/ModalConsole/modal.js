import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalConsole({ contentModal, isClose }) {
  const handleClose = () => {
    isClose(false);
  };
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{contentModal}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              //   window.location.reload();
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalConsole;
