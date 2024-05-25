'use client';
import classNames from "classnames/bind";
import styles from "./SidebarStyles.css";
import {FaListUl, FaBook, FaShare, FaReply, FaBuffer,FaRegChartBar} from 'react-icons/fa'
import { useEffect } from "react";
import { useRouter } from 'next/navigation';

const cx = classNames.bind(styles);
function Siderbar() {
  const router = useRouter()
  useEffect(() => {
    const activePage = window.location.pathname;
    const jwt = window.localStorage.getItem('token');
    // if (!jwt){navigation('/login')}
    const navLinks = document.querySelectorAll('a')
    navLinks.forEach(link => {
        if (link.href.includes(`${activePage}`)){
            link.parentElement.classList.add('sidebar-active');
        }
    console.log(link)
  });
  });

  return (
    <div className={cx('sidebar-wrapper')}>
      <div className={cx('sidebar-inner')}>
        <div className={cx('head-sidebar')}>
            <FaBuffer size={'32px'}/>
            <div className={cx('branch-name')}>Library Smart</div>
        </div>
        <nav className={cx('sidebar-content')}>
          <div className={cx('title-sidebar')}>Menu</div>
          <ul className={cx('sidebar-menu')}>
            <li className={cx('sidebar-item')}>
                <a href="/member"><FaListUl/> Quản lý thành viên</a>
            </li>
            <li className={cx('sidebar-item')}>
                <a href="/book"><FaBook/> Quản lý sách</a>
            </li>
            <li className={cx('sidebar-item')}>
                <a href="/borrowbook"><FaShare/> Mượn sách</a>
            </li>
            <li className={cx('sidebar-item')}>
                <a href="/returnbook"><FaReply/> Trả sách</a>
            </li>
            <li className={cx('sidebar-item')}>
                <a href="/home"><FaRegChartBar/> Thống kê</a>
            </li >
            {/* <li className={cx('sidebar-item')}>
                <a>Đăng xuất</a>
            </li> */}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Siderbar;
