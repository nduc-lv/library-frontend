'use client'
import Image from "next/image";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import baseURL from "./utils/baseURL";
import { Form, Input, Button } from "antd";
import { UserContext } from "./context/UserContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
  const {setReload} = useContext(UserContext);
  const onFinish = async (values) => {
    try {
      const response = await axios.post(`${baseURL}/login`, {username: values.username, password: values.password});
      const data = response.data;
      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setReload(curr => !curr);
      router.push("/books")
    }
    catch (e) {
      if (e instanceof AxiosError) {
        if (e.response.response.status == 400) {
          toast("Sai mật khẩu", {type: "error"});
        }
        else if (e.response.response.status == 404) {
          toast("Tài khoản không tồn tại", {type: "error"});
        }
      }
      console.log(e instanceof AxiosError);
    }
  }
  const onFinishFailed  = (err) => {
    console.log(err);
  }
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      router.push("/books");
    }
    else {
      localStorage.clear();
      setReload(false);
    }
  }, [])


  return (
      <div className='flex flex-col items-center justify-center' style={{padding: 100}}>
            <ToastContainer></ToastContainer>
            <div style={{fontWeight: "bold", marginBottom: 10, fontSize: 22}}>
                ĐĂNG NHẬP
            </div>
            <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
            >
            <Form.Item
                    label="Username"
                    name="username"
                    rules={[{required: true, message: 'Tên người dùng không được để trống' }]}
            >
                    <Input />
            </Form.Item>

            <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: 'Mật khẩu không được để trống' }]}
            >
                <Input.Password />
            </Form.Item>

   

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{marginTop: 10}}>
                    Đăng nhập
            </Button>
            {/* <Button type='primary' onCLick = {() => {}}>
                Quên mật khẩu
            </Button> */}
            </Form.Item>   
    </Form>
   </div>
  );
}
