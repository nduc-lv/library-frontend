import classNames from "classnames/bind";

import React, { useEffect, useState } from "react";

import styles from "./detail.module.scss";




import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Modal, Table } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faClose } from "@fortawesome/free-solid-svg-icons";

import img1 from "./Avtmember/img1.jpg";

import img2 from "./Avtmember/img2.jpg";

import img3 from "./Avtmember/img3.jpg";

import img4 from "./Avtmember/img4.jpg";

import img5 from "./Avtmember/img5.jpg";

import img6 from "./Avtmember/img6.jpg";

import img7 from "./Avtmember/img7.jpg";

import img8 from "./Avtmember/img8.jpg";

const cx = classNames.bind(styles);




function ModalDetail({ isShowDetail, dataMemberdetail, dataMember }) {

  const [showModal, setShowDeleteModal] = useState(false);

  const [overTime, setOverTime] = useState();

  const [daysLeft, setDateLeft] = useState();

  const [returned, setReturned] = useState();




  const handleShowModal = () => {

    isShowDetail(false);

    console.log(dataMemberdetail);

  };

  //

  const isTimeReturn = (time) => {

    if (time === null) {

      return false;

    }

    return true;

  };




  const setDayBorowing = (time1) => {

    const now = new Date();

    const date1 = new Date(time1);

    const differenceInMillis = now.getTime() - date1.getTime();

    const millisecondsInDay = 24 * 60 * 60 * 1000; // Số milliseconds trong một ngày

    const differenceInDays = Math.floor(differenceInMillis / millisecondsInDay);

    if (differenceInDays <= 30) {

      return differenceInDays;

    } else {

      return null;

    }

  };




  const setDayOverTime = (time1) => {

    const now = new Date();

    const date1 = new Date(time1);

    const differenceInMillis = now.getTime() - date1.getTime();

    const millisecondsInDay = 24 * 60 * 60 * 1000; // Số milliseconds trong một ngày

    const differenceInDays = Math.floor(differenceInMillis / millisecondsInDay);

    if (differenceInDays > 30) {

      return differenceInDays - 30;

    } else {

      return null;

    }

  };




  const isBowrowing = (time) => {

    if (time != null) {

      return true;

    }

  };




  const getAvt = () => {

    // Đối tượng ánh xạ tên hình ảnh với đường dẫn

    const imagePaths = {

      img1: img1,

      img2: img2,

      img3: img3,

      img4: img4,

      img5: img5,

      img6: img6,

      img7: img7,

      img8: img8,

    };




    // Chuỗi tên hình ảnh

    const imageName = dataMember.memberAvt;




    // Kiểm tra xem có tồn tại đường dẫn cho tên hình ảnh hay không

    if (imageName in imagePaths) {

      const imagePath = imagePaths[imageName];

      return <img src={imagePath} />;

    } else {

      return "";

    }

  };




  return (

    <Modal

      show={handleShowModal}

      onHide={handleShowModal}

      className={cx("modal")}

      size="lg"

    >

      <div className={cx("wrapper")}>

        <div className={cx("header_modal")}>

          <h2>Thông tin thành viên</h2>

          <FontAwesomeIcon

            icon={faClose}

            className={cx("close")}

            onClick={handleShowModal}
            
          />

        </div>

        {}

        <div className={cx("body")}>

          <div className={cx("member_infor")}>

            <div className={cx("infor_avt")}>{getAvt()}</div>




            <div className={cx("infor_detail")}>

              <p>

                Mã số thẻ :<span>{dataMember.memberId}</span>

              </p>

              <p>

                Họ tên :<span>{dataMember.memberName}</span>

              </p>

              <p>

                Địa chỉ :<span>{dataMember.memberAddress}</span>

              </p>

              <p>

                Số điện thoại :<span>{dataMember.memberPhone}</span>

              </p>

              <p>

                Email :<span>{dataMember.memberEmail}</span>

              </p>

              <p>

                Ngày đăng kí :<span>{dataMember.memberDoB}</span>

              </p>

            </div>

          </div>

        </div>

        <div className={cx("footer")}>

          <div className={cx("borrowing")}>

            <h3 className={cx("title")}>Đang mượn</h3>

            <Table className={cx("table")} hover size="lg">

              <thead>

                <tr>

                  <th>Tên Sách</th>

                  <th>Tác gả</th>

                  <th>Ngày mượn</th>

                  <th>Ngày còn lại</th>

                </tr>

              </thead>

              <tbody>

                {dataMemberdetail.map((member, index) =>

                  isTimeReturn(member.dateReturn) == false &&

                  setDayBorowing(member.dateBorrow) != null ? (

                    <tr key={index}>

                      <td>{member.bookName}</td>

                      <td>{member.bookAuthor}</td>

                      <td>{member.dateBorrow}</td>

                      <td>{setDayBorowing(member.dateBorrow)} Ngày</td>

                    </tr>

                  ) : null

                )}

              </tbody>

            </Table>

          </div>

          <div className={cx("over_time")}>

            <h3 className={cx("title")}>Quá hạn</h3>

            <Table className={cx("table")} hover size="lg">

              <thead>

                <tr>

                  <th>Tên Sách</th>

                  <th>Tác gả</th>

                  <th>Ngày mượn</th>

                  <th>Quá hạn</th>

                </tr>

              </thead>

              <tbody>

                {dataMemberdetail.map((member, index) =>

                  isTimeReturn(member.dateReturn) == false &&

                  setDayOverTime(member.dateBorrow) != null ? (

                    <tr key={index}>

                      <td>{member.bookName}</td>

                      <td>{member.bookAuthor}</td>

                      <td>{member.dateBorrow}</td>

                      <td className={cx("over_timeDay")}>

                        {setDayOverTime(member.dateBorrow)} Ngày

                      </td>

                    </tr>

                  ) : null

                )}

              </tbody>

            </Table>

          </div>




          <div className={cx("returned")}>

            <h3 className={cx("title")}>Đã trả</h3>

            <Table className={cx("table")} hover size="lg">

              <thead>

                <tr>

                  <th>Tên Sách</th>

                  <th>Tác gả</th>

                  <th>Ngày mượn</th>

                  <th>Ngày trả</th>

                </tr>

              </thead>

              <tbody>

                {dataMemberdetail.map((member, index) =>

                  isTimeReturn(member.dateReturn) ? (

                    <tr key={index}>

                      <td>{member.bookName}</td>

                      <td>{member.bookAuthor}</td>

                      <td>{member.dateBorrow}</td>

                      <td>{member.dateReturn}</td>

                    </tr>

                  ) : null

                )}

              </tbody>

            </Table>

          </div>

        </div>

      </div>

    </Modal>

  );

}




export default ModalDetail;