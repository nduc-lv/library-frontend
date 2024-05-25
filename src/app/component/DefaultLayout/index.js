'use client'
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Siderbar from "./Sidebar/Sidebar";
import Header from "./Header/header";
import Dialog from "../Dialog/Dialog";
import { useState } from "react";
import { useRouter } from 'next/navigation';
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  const router = useRouter();
  const [dialog,setDialog] = useState({
    message:'',
    isLoading: false
})
const handleDialog = (message, isLoading) =>{
  setDialog(
      {
          message,
          isLoading,
      }
  )
}
function handleCLick(){
  handleDialog("Bạn muốn đăng xuất hay không?", true)
}
const Choosen = (chosoe) => {
  if(chosoe){
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("token");
      router.push('/login')
  } else{
      handleDialog( "", false)
  }
}

// const toggleNotificationModal = () => {
//   setDialog("", !dialog.isLoading);
// };

  return (
    <div className={cx("wrapper")}>
      <Siderbar></Siderbar>
      <div className={cx("body")}>
        <Header handleCLick={handleCLick}/>
        <div className={cx("content")}>{children}</div>
      </div>
      { dialog.isLoading && <Dialog onDialog={Choosen} message = {dialog.message} title={'Đăng xuất'} danger={'Oke'}/>}
    </div>
  );
}

export default DefaultLayout;
