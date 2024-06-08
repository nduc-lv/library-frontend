'use client'

import axios, { Axios, AxiosError } from "axios";
import { useState, useEffect } from "react"
import baseURL from "../utils/baseURL";
import {Table, Form, Input} from 'antd';
import {Space} from "antd";
import { Button, Modal } from 'antd';
import { AutoComplete } from 'antd';
import Link from "next/link";
import AddRecord from "../components/AddRecord";
import { useRouter } from "next/navigation";
import {StopOutlined} from '@ant-design/icons'
import http from "../utils/http";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Record() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [customers, setCustomers] = useState();
    const [dataSource, setDataSource] = useState([]);
    const [reload, setReload] = useState(true);
    const [form] = Form.useForm()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState();
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const [options, setOptions] = useState([]);
    const unLock = async (record) => {
        try {
            await http.postWithAccessToken(`${baseURL}/unlock`, {customerId: record.id});
            toast("Mở khóa thành công", {type: "success"});
            setReload(curr => !curr);
        }
        catch (e) {
            if (e instanceof AxiosError) {
                if (e.response.status === 404) {
                    toast("Tài khoản không tồn tại", {type: "error"});
                }
                else if (e.response.status === 403){
                    router.push("/");
                }
                else{
                    toast("Lỗi", {type: "error"});
                }
            }
            console.log(e);
        }
    }
    const generateStatus = (reputation) => {
        if (reputation > 79) {
            return (
                <div>
                    Tốt
                </div>
            )
        }
        if (reputation > 49 && reputation <= 79){
            return (
                <div>
                    Khá
                </div>
            )
        }
        if (10 < reputation && reputation <= 49){
            return (
                <div>
                    Trung bình
                </div>
            )
        }
        if (reputation <= 10) {
            return (
                <div>
                    Đã khóa
                </div>
            )
        }
    }
    const handleSearch = (value) => {
        setOptions(() => {
          if (!value) {
            setReload(curr => !curr);
            return [];
          }
          return customers.filter((record, index) => {
            if (record.email.toLowerCase().includes(value.toLowerCase())) {
                return record;
            }
        }).map((record, index) => {
            return {
                label: record.email,
                value: record.email,
            }
        })
        });
      };
      const selectRecord = (value) => {
        const newCustomers = customers.filter((customer, index) => {
            if (customer.email.toLowerCase().includes(value.toLowerCase())) {
                return customer
            }
        })
        setDataSource([...newCustomers]);
    }
    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            width: "20%"
            // specify how to display data
            // render: (text) => <a>{text}</a>
        },
        {
            title: 'Họ tên',
            dataIndex: "name",
            key: 'name',
            width:"20%",
            // record -> current row
            render: (_, record) => (
              <Space size="middle">
                    {/* <Link href={`/customerDetail/${record.customerId}`}>{record.customer}</Link> */}
                    {record.name}
              </Space>
            ),
        },
        {
            title: 'Email',
            dataIndex: "email",
            key: 'email',
            width:"20%",
            // record -> current row
            render: (_, record) => (
              <Space size="middle">
                    {record.email}
              </Space>
            ),
        },
        {
            title: 'Uy tín',
            dataIndex: "reptuation",
            key: "reputation",
            width: "20%",
            render: (_, record) => (
                <Space size="middle">
                      {/* <Link href={`/customerDetail/${record.customerId}`}>{record.customer}</Link> */}
                      {generateStatus(record.reputation)}
                </Space>
            ),
        },
        {
            title: 'Action',
            dataIndex: "action",
            key: 'action',
            width:"20%",
            // record -> current row
            render: (_, record) => (
              <Space size="middle">
                    <Button type="primary" onClick={() => {setSelectedCustomer(curr => record); showModal(); console.log(record.phonenumber)}}>Chi tiết</Button> 
                    {record.reputation <= 10 ? <Button type="primary" onClick={() => {unLock(record)}}>Mở khóa tài khoản</Button> : <></>}
              </Space>
            ),
        },
    ]
    const getRecords = async () => {
        try {
            // const response = await axios.get(`${baseURL}/listcustomer`)
            const response = await http.getWithAccessToken(`${baseURL}/listcustomer`)
            const data = response.data;
            const dataRecords = data.customers.map((customer, index) => {
                return ({
                    key: customer._id,
                    id: customer._id,
                    name: customer.name,
                    email: customer.email,
                    reputation: customer.reputation,
                    phonenumber: customer.phone,
                    dateOfBirth: customer.dateOfBirth,
                    address: customer.address
                })
            })
            setDataSource([...dataRecords]);
            setCustomers([...dataRecords])
        }
        catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            router.push("/");
        } 
    }, [])
    useEffect(() => {
        getRecords()
    }, [reload, loading])
    const setWindowDimensions = () => {
        document.getElementById('projectsTable').lastElementChild.setAttribute("style", `min-height:${window.innerHeight - 240}px`);
      }
      useEffect(() => {
        document.getElementById('projectsTable').lastElementChild.setAttribute("style", `min-height:${window.innerHeight - 240}px`);
        window.addEventListener('resize', setWindowDimensions);
        return () => {
          window.removeEventListener('resize', setWindowDimensions);
        }
    }, []);
    return (
        <>
            <ToastContainer></ToastContainer>
            <div style={{fontWeight: "bold", fontSize: 22, marginBottom: 10}} className="flex justify-center items-center">QUẢN LÝ KHÁCH HÀNG</div>
            <div className="flex justify-center items-center gap-4">
                <AutoComplete
                    style={{
                        width: 300,
                    }}
                    onSearch={handleSearch}
                    placeholder="Nhập email"
                    options={options}
                    onSelect={(value) => {selectRecord(value)}}
                    notFoundContent={<>Khong tim thay nguoi dung</>}
                />
                <Button type="primary" onClick={() => {setReload(curr => !curr)}}>Tải lại</Button>
            </div>
            {!dataSource ? <Table style={{height: "100vh"}} dataSource={dataSource} loading={true} columns={columns} size={"middle"}></Table> : <Table id={"projectsTable"} dataSource={dataSource} size={"middle"} columns={columns}  pagination={{position: ["bottomCenter"], pageSize: 5}}></Table>}
            <Modal
                open={isModalOpen}
                title="Thông tin khách hàng"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel} loading={loading}>
                            Quay lại
                    </Button>
                ]}
            >
                
                    
                        {/* // <div><span>Ten: </span>{selectedCustomer.name}</div>
                        // <div><span>Email: </span>{selectedCustomer.email}</div>
                        // <div><span>So dien thoai: </span>{selectedCustomer.phonenumer}</div>
                        // <div><span>Ngay: </span>{selectedCustomer.dateOfBirth}</div>
                        // <div><span>Dia chi: </span>{selectedCustomer.address}</div> */}
                    
                {selectedCustomer ? 
                <div style={{paddingLeft: 30}}>
                    <div><span>Tên: </span>{selectedCustomer.name}</div>
                    <div><span>Email: </span>{selectedCustomer.email}</div>
                    <div><span>Số điện thoại: </span>{selectedCustomer.phonenumber}</div>
                    <div><span>Ngày sinh: </span>{new Date(selectedCustomer.dateOfBirth).toLocaleDateString()}</div>
                    <div><span>Địa chỉ: </span>{selectedCustomer.address}</div>
                </div> : <></>}
            </Modal>
        </>
    )
}