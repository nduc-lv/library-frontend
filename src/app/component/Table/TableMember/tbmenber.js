import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import FetchMembers from "../../../api/memberAPI/getMembers";
import styles from "./tableMember.module.scss";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import getMemberId from "../../../api/memberAPI/getMemberById";
import getMemberDetail from "../../../api/memberAPI/getMemberDetail";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import ModelDelete from "../../Modal/ModalDeleteMember/modelDelete";
import ModalDetail from "../../Modal/Modaldetail/detail";
import ModalEdit from "../../Modal/ModalEdit/edit";

const cx = classNames.bind(styles);

function TableMember() {

  const [members, setMembers] = useState([]);

  const [idMember, setIdMember] = useState(-1);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [dataMemberdetail, setDataMemberdetail] = useState([]);

  const [dataMember, setDataMember] = useState({});

  const [isDeleted, setIsDeleted] = useState(false);

  const [isShowDetail, setIsShowDetail] = useState(false);

  const [isShowEdit, setIsShowEdit] = useState(false);

  const [isShowUpdate, setIsShowUpdate] = useState(false);




  const renderTooltipUpdate = (props) => (

    <Tooltip id="button-tooltip" {...props}>

      Sửa

    </Tooltip>

  );

  const renderTooltipDelete = (props) => (

    <Tooltip id="button-tooltip" {...props}>

      Xoá

    </Tooltip>

  );

  const handleClose = () => {

    setShowDeleteModal(false);

    // console.log(showDeleteModal);

  };

  // const handeGetIdMember =(idMember)=>{

  //   return idMember

  // }

  const handleCloseUpdate = (isClose) => {

    setIsShowUpdate(isClose);

    // console.log(isClose);

  };




  const getDetail = (memberId) => {

    // getMemberDetail(memberId);

    getMemberDetail(memberId).then((data) => setDataMemberdetail(data));

    getMemberId(memberId).then((data) => setDataMember(data));

    // console.log("data Member Detail:", dataMemberdetail);

    // getBookByIdMember(memberId);

    // getMemberId(memberId);

    // getBooks();

  };

  const getIsDeleted = (isDelete) => {

    setIsDeleted(isDelete);

    FetchMembers().then((data) => setMembers(data));

    // console.log(isDelete);

  };




  const handleShowDetail = (isShow) => {

    setIsShowDetail(isShow);

  };

  useEffect(() => {

    FetchMembers().then((data) => setMembers(data));

  }, [isDeleted]);




  return (

    <div className={cx("wrapper-table")}>

      <table

        className={cx("table")}

      >

        {/* <thead>

          <tr>

            <th>ID</th>

            <th>Tên người dùng</th>

            <th>Địa chỉ</th>

            <th>Số Điện thoại</th>

            <th>Email</th>

            <th>Ngày đăng kí</th>

            <th>Thao tác</th>

          </tr>

        </thead> */}

        <tbody>
        <tr>

            <th>ID</th>

            <th>Tên người dùng</th>

            <th>Địa chỉ</th>

            <th>Số Điện thoại</th>

            <th>Email</th>

            <th>Ngày đăng kí</th>

            <th>Thao tác</th>

            </tr>

          {members && members.map((member) => (

            <tr

              key={member.memberId}

              onClick={(event) => {
                
                console.log((event.target.className))
                setIdMember(member.memberId);

                getDetail(member.memberId);

                if (event.target.className != 'iconwrapper') {

                  setIsShowDetail(true);

                }

              }}

            >

              <td>{member.memberId}</td>

              <td>{member.memberName}</td>

              <td>{member.memberAddress}</td>

              <td>{member.memberPhone}</td>

              <td>{member.memberEmail}</td>

              <td>{member.memberDoB}</td>

              <td 
                      onClick={(e) => {
      
                        e.stopPropagation();
                      }}
                      >

                <div  className={cx('icon')}>

                  <OverlayTrigger

                    // placement=""

                    delay={{ show: 250, hide: 400 }}

                    overlay={renderTooltipUpdate}

                  >


                    <FontAwesomeIcon

                      className={cx("icon","icon-update")}

                      icon={faPenToSquare}

                      onClick={(e) => {
                        getDetail(member.memberId);
                        setIsShowUpdate(true)
                      }}

                    ></FontAwesomeIcon>

                  </OverlayTrigger>




                  <OverlayTrigger

                    // placement=""

                    delay={{ show: 250, hide: 400 }}

                    overlay={renderTooltipDelete}

                  >

                    <FontAwesomeIcon

                      onClick={(e) => {
                        setIdMember(member.memberId);
                        setShowDeleteModal(true)
                      }}

                      className={cx("icon", "icon-delete")}

                      icon={faTrash}

                    ></FontAwesomeIcon>

                  </OverlayTrigger>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {showDeleteModal && (

        <ModelDelete

          className={cx("modalDelete")}

          memberId={idMember}

          showDeleteModal={showDeleteModal}

          onCloseModel={handleClose}

          isDeleted={getIsDeleted}

          title="Xoá thành viên"

        />

      )}

      {isShowDetail && (

        <ModalDetail

          isShowDetail={handleShowDetail}

          dataMemberdetail={dataMemberdetail}

          dataMember={dataMember}

        />

      )}

      {isShowUpdate && (

        <ModalEdit

          isClose={handleCloseUpdate}

          title={"Chỉnh sửa"}

          dataMember={dataMember}

          isShowUpdate={isShowUpdate}

        />

      )}

    </div>

  );

}




export default TableMember;