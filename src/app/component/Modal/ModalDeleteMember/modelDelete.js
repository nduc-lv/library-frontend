import { Button, Modal } from "react-bootstrap";

import handleDeleteMember from "../../../api/memberAPI/deleteMember";

import { useState } from "react";

//

import classNames from "classnames/bind";

import styles from "./model.module.scss";




import "bootstrap/dist/css/bootstrap.min.css";

// import { Button } from "react-bootstrap";

// import Modal from "react-bootstrap/Modal";




const cx = classNames.bind(styles);




function ModelDelete({

  memberId,

  showDeleteModal,

  onCloseModel,

  className,

  isDeleted,

  title,

}) {

  const [showModal, setShowModal] = useState(showDeleteModal);

  // const [isDelete, setIsDelete] = useState(false);

  const handleDelete = () => {

    // Thực hiện việc xoá thành viên

    handleDeleteMember(memberId);

    setShowModal(false);

    isDeleted(true);

  };

  const handleClose = () => {

    onCloseModel();

    setShowModal(false);

    //

    // setIsDelete(true);

    isDeleted(false);

  };

  return (

    <div className={`modal show ${className}`} style={{ display: "block" }}>

      <Modal show={showModal} onHide={handleClose}>

        <Modal.Header closeButton>

          <Modal.Title>{title}</Modal.Title>

        </Modal.Header>




        <Modal.Body>

          <p> Bạn có chắc chắn muốn xoá thành viên có ID {memberId} không?</p>

        </Modal.Body>




        <Modal.Footer>

          <Button variant="secondary" onClick={handleClose} size="lg">

            Close

          </Button>

          <Button

            size="lg"

            variant="danger"

            onClick={() => {

              handleDelete();

              // event.preventDefault();

              alert("Xoá thành công!");

              window.location.reload();

            }}

          >

            Ok

          </Button>

        </Modal.Footer>

      </Modal>

    </div>

  );

}




export default ModelDelete;