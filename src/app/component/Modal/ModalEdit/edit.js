import classNames from "classnames/bind";

import styles from "./edit.module.scss";

import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useEffect, useState } from "react";

import ModalConsole from "../ModalConsole/modal";

import addMember from "../../../api/memberAPI/addMember";

import updateMember from "../../../api/memberAPI/updateMember";




//




const cx = classNames.bind(styles);

function ModalEdit({ isClose, title, dataMember, isShowUpdate = false }) {

  const [inputName, setInputName] = useState("");

  const [inputAvt, setInputAvt] = useState("");

  const [inputPhone, setInputPhone] = useState("");

  const [inputEmail, setInputEmail] = useState("");

  const [inputAddress, setInputAddress] = useState("");

  const [currentDate, setCurrentDate] = useState("");

  const [isOpenModalConsole, setIsOpenModalConsole] = useState(false);

  const [modalContent, setModalContent] = useState("");




  const handleClose = () => {

    isClose(false);

  };

  //

  const handleCloseModalConsole = (close) => {

    setIsOpenModalConsole(close);

  };

  // const handleClose = (isClose)=>{




  // }




  const handleGetName = (e) => {

    setInputName(e.target.value);

  };

  const handleGetAvt = (e) => {

    setInputAvt(e.target.value);

  };

  const handleGetPhone = (e) => {

    setInputPhone(e.target.value);

  };

  const handleGetEmail = (e) => {

    setInputEmail(e.target.value);

  };

  const handleGetAddress = (e) => {

    setInputAddress(e.target.value);

  };

  const getAvt = (img) => {

    const imgAvt = img.substring(

      img.lastIndexOf("\\") + 1,

      img.lastIndexOf(".")

    );

    return imgAvt;

  };




  const getCurentDate = () => {

    const currentDate = new Date();

    const year = currentDate.getFullYear();

    const month = currentDate.getMonth() + 1;

    const day = currentDate.getDate();




    const curentRes = `${year}-${month < 10 ? "0" + month : month}-${

      day < 10 ? "0" + day : day

    }`;

    console.log(curentRes);

    setCurrentDate(curentRes);

  };

  useEffect(() => {

    getCurentDate();

    console.log(isShowUpdate);

    console.log("data member :", dataMember);




    //

    if (isShowUpdate) {

      setInputName(dataMember.memberName);

      // setInputAvt(dataMember.memberAvt);

      setInputPhone(dataMember.memberPhone);

      setInputEmail(dataMember.memberEmail);

      setInputAddress(dataMember.memberAddress);

    }

  }, [isShowUpdate, dataMember]);




  const setData = () => {

    const dataMember = {

      memberAddress: inputAddress,

      memberAvt: getAvt(inputAvt),

      memberEmail: inputEmail,

      memberName: inputName,

      memberPhone: inputPhone,

      memberDoB: currentDate,

    };

    return dataMember;

  };

  const addData = () => {

    getCurentDate();

    setIsOpenModalConsole(true);

    const dataMember = {

      memberAddress: inputAddress,

      memberAvt: getAvt(inputAvt),

      memberEmail: inputEmail,

      memberName: inputName,

      memberPhone: inputPhone,

      memberDoB: currentDate,

    };

    if (

      dataMember.memberAddress === "" ||

      dataMember.memberAvt === "" ||

      dataMember.memberName === "" ||

      dataMember.memberPhone === "" ||

      dataMember.memberEmail === ""

    ) {

      setModalContent("Vui lòng điền đầy đủ thông tin");

    } else {

      addMember(dataMember);

      setModalContent("Thêm thành công");

    }

  };




  return (

    <div className={cx("wrapper")}>

      <div className={cx("header")}>

        <h3>{title}</h3>

        <FontAwesomeIcon

          icon={faXmark}

          className={cx("iconClose")}

          onClick={handleClose}

        />

      </div>

      <form className={cx("form")}>

        <div className={cx("flex")}>

          <label className={cx("label_name")}>

            <input

              required=""

              placeholder=""

              type="text"

              value={inputName}

              className={cx("input", "input-name")}

              onChange={handleGetName}

            />

            <span>Nhập tên:</span>

          </label>




          <label className={cx("label-input")}>

            <input

              required=""

              placeholder=""

              type="file"

              value={inputAvt}

              className={cx("input", "input-avt")}

              onChange={handleGetAvt}

            />

            <span>Chọn ảnh thẻ:</span>

          </label>

        </div>




        <label>

          <input

            required=""

            placeholder=""

            type="email"

            value={inputEmail}

            className={cx("input")}

            onChange={handleGetEmail}

          />

          <span> Nhập email:</span>

        </label>




        <label>

          <input

            required=""

            type="text"

            value={inputPhone}

            placeholder=""

            className={cx("input", "input-phone")}

            onChange={handleGetPhone}

          />

          <span>Nhập SDT:</span>

        </label>

        <label className={cx("label_address")}>

          <textarea

            required=""

            rows="3"

            placeholder=""

            value={inputAddress}

            className={cx("input01", "input-address")}

            onChange={handleGetAddress}

          ></textarea>

          <span>Nhập địa chỉ:</span>

        </label>




        <button

          className={cx("fancy")}

          onClick={() => {

            if (isShowUpdate == false) {

              addData();

            } else {

              updateMember(dataMember.memberId, setData());

              alert("Cập nhật thành công!");

            }

            // event.preventDefault();

            window.location.reload();

            // handleClose();

            // setIsOpenModalConsole(true);

            // setIsOpenModalConsole(true);

          }}

        >

          <span className={cx("top-key")}></span>

          <span className={cx("text")}>Xác nhận</span>

          <span className={cx("bottom-key-1")}></span>

          <span className={cx("bottom-key-2")}></span>

        </button>

      </form>

      {isOpenModalConsole && (

        <ModalConsole

          contentModal={modalContent}

          isClose={handleCloseModalConsole}

        />

      )}

    </div>

  );

}




export default ModalEdit;