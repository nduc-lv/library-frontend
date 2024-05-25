import classNames from "classnames/bind";
import styles from "./HeaderStyles.css";
import Dropdown from 'react-bootstrap/Dropdown';
import {BsPerson} from 'react-icons/bs'
import {AiOutlineSetting} from 'react-icons/ai'
import {SlLogout} from 'react-icons/sl'
import Avatar from '../../../../../public/assets/avatar.png';

const cx = classNames.bind(styles);

function Header({handleCLick}) {

  const name = window.localStorage.getItem('name');

  return (
    <header className={cx('header')}>
        <div className={cx('content-header')}>
            <div className={cx('info-admin')}>
              <div className={cx('name-admin')}>{name}</div>
              <div className={cx('role-admin')}>Admin</div>
            </div>
            <img className={cx('avatar-admin')} src={Avatar} alt="avatar"></img>
            <Dropdown>
            <Dropdown.Toggle variant="none" id="">
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item><BsPerson size={'18px'}/> Thông tin</Dropdown.Item>
                <Dropdown.Item ><AiOutlineSetting size={'18px'}/> Cài đặt</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleCLick}><SlLogout size={'15px'} 
                /> Đăng xuất</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
        </div>
    </header>
  )
}

export default Header;
