'use client';
import { useState } from 'react';
import axios from 'axios';
import classNames from "classnames/bind";
import styles from "./login.module.scss";
import { useRouter } from 'next/navigation';
const cx = classNames.bind(styles);
import LoginLayout from "../component/LoginLayout";

function Login() {
    
    const [err,setErr] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = "http://localhost:8080/api/v1/auth/authenticate"
        const data = {
            "email": email,
            "password": password
        }
        try {
          await axios.post(url, data)
          .then(function (resp) {
                if (resp.status === 200) {
                    window.localStorage.setItem("name", resp.data['fullName']);
                    window.localStorage.setItem("token", resp.data['token']);
                    setErr(false);
                    router.push('/member')
                } else{
                   
                    router.push('/login')
                }
          })
          .catch(function (error) {
            setErr(true)
            console.log(error);
          });
          
        } catch (error) {
            setErr(false)
          console.log(error);
        }
      };



    return (
        <div className={cx('login-wrapper')}>
            <div className={cx("container-login")}>
                <div className={cx("form-container sign-in-container")}>
                    <form className={cx('login-form')} action="#"  onSubmit={(e) => {
                        handleSubmit(e);
                    }}> 
                        <h1 className={cx("singin")}>Sign in</h1>
                        <div className={cx("social-container")}>
                            
                        </div>

                        
                        <input className={cx("login-input")} type="email" placeholder="Email" 
                            onChange={(e) => setEmail(e.target.value)}/>


                        <input className={cx("login-input")} type="password" placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)}/>



                        <a className={cx("forgot")} href="#">Forgot your password?</a>
                        <button className={cx('btn-signin')}>Sign In</button>
                        {(
                            err && <div className={cx('login-error')}>Đăng nhập thất bại!</div>
                        )}
                    </form>
                </div>
                <div className={cx("overlay-container")}>
                    <div className={cx("overlay")}>
                        <div className={cx("overlay-panel overlay-right")}>
                            <h1 className={cx("singin")}>Hello, Friend!</h1>
                            <p className={cx("para")}>Welcome to Smart Library</p>   
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Login;