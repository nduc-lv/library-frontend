'use client'

import { Button, DatePicker, Form } from "antd";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import baseURL from "../utils/baseURL";
import http from "../utils/http";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
export default function BorrowBook({record, setLoading, setIsModalOpen}) {
    const router = useRouter();
    const [timeEnd, setTimeEnd] = useState();
    const onFinish = async (value) => {
        try {
            console.log(record.id)
            console.log(value.timeEnd.toISOString());
            setLoading(true);
            // await axios.post(`${baseURL}/borrowBook`, {recordId: record.id, timeEnd: value.timeEnd.toISOString()}, {headers: {"Content-Type": "application/json"}});
            await http.postWithAccessToken(`${baseURL}/borrowBook`, {recordId: record.id, timeEnd: value.timeEnd.toISOString()});
            setLoading(false);
            setIsModalOpen(curr => false);
            toast("Mượn sách thành công", {type: "success"});
        }
        catch (e) {
            setLoading(false);
            if (e instanceof AxiosError) {
                if (e.response.status === 404) {
                    toast("Không tìm thấy đơn", {type: "error"});
                }
                else if (e.response.status === 403) {
                    router.push("/");
                } 
            }
            console.log(e);
        }
    }
    const onFinishFailed = (error) => {
        setLoading(curr => false);
        console.log(error);
    } 
    return (
        <>
            <ToastContainer></ToastContainer>
            <div>
                Khách hàng: {record.customer}
            </div>
            <div>
                Sách: {record.book}
            </div>
           <div>
                Số lượng: {record.numberOfBooks}
           </div>
            <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item name =  {"timeEnd"} label = {"Hạn"} rules={[{required: true, message: "Không được để trống phần này"}]}>
                    <DatePicker disabledDate={(current) => {
                        // Can not select days before today and today
                        return current && current.valueOf() < Date.now();
                        }} onChange = {(date) => setTimeEnd(curr => date.toISOString())}></DatePicker>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Xác nhận</Button>
                </Form.Item>
            </Form>
        </>
    )
}