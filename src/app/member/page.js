'use client';
import classNames from "classnames/bind";
import ModalEdit from "../component/Modal/ModalEdit/edit";
import TableMember from "../component/Table/TableMember/tbmenber";
import styles from "./member.module.scss";
import { useState } from "react";
import {IoAdd} from 'react-icons/io5'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function Member() {
  const [isShow, setIsShow] = useState(false);
  const getIsClose = (isClose) => {
    setIsShow(isClose);
  };
  return (
    <div className={cx("wraper")}>
       <h3 className={cx("title")}>Danh sách người dùng</h3>
       <div className={cx('btn-add')}>
        <button className={cx('btn', 'btn-primary')} onClick={() => setIsShow(true)}>
          <IoAdd size={'24px'} className={cx('icon-add')} />
          Thêm
        </button>
      </div>
      <TableMember />
    {isShow && <ModalEdit isClose={getIsClose}  title={"Thêm Thành viên"}/>}
      {/* <div className={cx("header-member")}>
        <h3 className={cx("title")}>Danh sách người dùng</h3>
      </div>
      <div className={cx("body")}>
        <div className={cx("btn_wrap")}>
          <button className={cx("btn-add")} onClick={() => setIsShow(true)}>
            <FontAwesomeIcon className={cx("fontAdd_Icon")} icon={faAdd} />
            Thêm
          </button>
        </div>
        <TableMember />
      </div>
      {isShow && <ModalEdit isClose={getIsClose}  title={"Thêm Thành viên"}/>} */}
    </div>
  );
}

export default Member;
