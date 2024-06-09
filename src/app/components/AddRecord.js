'use client'

import axios, { AxiosError } from "axios"
import baseURL from "../utils/baseURL"
import { useEffect, useState } from "react"
import { UploadOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Space
} from 'antd';
import { AutoComplete } from 'antd';
import http from "../utils/http";
export default function AddRecord({bookId}) {
    const [selectedBookQuantity, setSelectedBookQuantity] = useState();
    const [customers, setCustomers] = useState([]);
    const [timeEnd, setTimeEnd] = useState([]);
    const onFinish = async (value) => {
        try {
            // await axios.post(`${baseURL}/addrecord`, {email: value.customer, numberOfBooks: value.numberOfBooks, timeEnd: value.timeEnd.toISOString(), bookId});
            await http.postWithAccessToken(`${baseURL}/addrecord`, {email: value.customer, numberOfBooks: value.numberOfBooks, timeEnd: value.timeEnd.toISOString(), bookId});
            toast("Thêm đơn thành công", {type: "success"});
        }
        catch (e) {
            if (e instanceof AxiosError){
                if (e.response.status === 404){
                    if (e.response.data.message == "Customer not found"){
                        toast("Không tìm thấy khách", {type: "error"})
                    }
                    else{
                        toast("Không tìm thấy sách", {type: "error"})
                    }
                }
                else if (e.response.status === 400) {
                    if (e.response.data.message == "Out of book"){
                        toast("Không đủ sách", {type: "error"});
                    }
                    else {
                        toast("Khách không đủ điều kiện", {type: "error"});
                    }
                }
            }
        }
    
    };
    const onFinishFailed = async (error) => {console.log(error)};
    const [book, setBook] = useState();
    const [selectedCustomer, setSelectedCustomer] = useState();
    const getDate = (date) => {
        setTimeEnd(curr => date.toISOString())
    }
    const getCustomers = async () => {
        try {
            // const response = await axios.get(`${baseURL}/listcustomer`, {headers: {"Content-Type": "application/json"}})
            const response = await http.getWithAccessToken(`${baseURL}/listcustomer`);
            const data = response.data;
            setCustomers([...data.customers])
        }
        catch (e) {
            console.log(e);
        }
    }
    const getBook = async () => {
        try {
            // const response = await axios.get(`${baseURL}/listbook/${bookId}`, {headers: {"Content-type": "application/json"}})
            const response = await http.getWithAccessToken(`${baseURL}/listbook/${bookId}`);
            const data = await response.data;
            setBook({...data.book});
        }
        catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getCustomers();
        getBook();
    }, [])
    const [customerOptions, setCustomerOptions] = useState([]);
    const handleSearchCustomer = async (value) => {
        setCustomerOptions(() => {
            if (!value) {
                return []
            }
            return customers.filter((customer, index) => {
                const email = value.split(' ')[0];
                console.log(email);
                if (customer.email.includes(email)){
                    return customer
                }
            }).map((customer, index) => {
                return {
                    label: customer.email,
                    value: `${customer.email}`
                }
            })
        })
    }
    const selectCustomer = async (value) => {
        const customerId = value.split(' ')[1];
        setSelectedCustomer(curr => customerId);
    }
    return (
        <>
        <ToastContainer></ToastContainer>
        {!(book) || 
            (<div>
                <div className="text-center" style={{fontWeight: "bold", fontSize: 22}}>MƯỢN SÁCH</div>
                    <p style={{marginBottom: 10, textAlign: "center"}}>
                        <span>Tên sách: </span> {book.name}
                    </p>
                <div style={{paddingLeft: "20vw", paddingRight: "20vw"}}>
                    <Form
                        labelCol={{
                            span: 4,
                            }}
                            wrapperCol={{
                                span: 18,
                            }}
                    layout="horizontal"
                    style={{
                    maxWidth: 600,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    >
                    <Form.Item name="customer" label="Khách">
                            <AutoComplete
                                style={{
                                    width: 400,
                                }}
                                placeholder="Địa chỉ email"
                                onSearch = {handleSearchCustomer}
                                options = {customerOptions}
                                onSelect={(value) => {selectCustomer(value)}}
                            >
                            </AutoComplete>
                    </Form.Item>
                    <Form.Item name="numberOfBooks" label="Số lượng">
                            <InputNumber style={{width: 400}} min={1} max={book.quantity}></InputNumber>
                            
                    </Form.Item>
                    <Form.Item name="timeEnd" label = "Hạn">
                            <DatePicker style={{width: 400}} placeholder="Chọn ngày" onChange={(getDate)} disabledDate={(current) => {
                                // Can not select days before today and today
                                return current && current.valueOf() < Date.now();
                                }}>
                                
                            </DatePicker>
                    </Form.Item>
                    <Form.Item className="flex justify-center items-center">
                        <Button htmlType="submit" type="primary">Xác nhận</Button>
                    </Form.Item>
                    </Form>
                </div>
            </div>)}
        </>
    )
}