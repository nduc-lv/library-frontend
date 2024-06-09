'use client'

import axios, { AxiosError } from "axios";
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
import BorrowBook from "../components/BorrowBook";
import http from "../utils/http";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Record() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [records, setRecords] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState();
    const [dataSource, setDataSource] = useState([]);
    const [reload, setReload] = useState(true);
    const [form] = Form.useForm()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const returnBook  = async (record) => {
        try {
            // await axios.post(`${baseURL}/returnBook`, {recordId: record.id}, {headers: {"Content-Type": "application/json"}})
            await http.postWithAccessToken(`${baseURL}/returnBook`, {recordId: record.id});
            setReload(curr => !curr);
            toast("Trả sách thành công", {type: "success"});
        }
        catch (e) {
            if (e instanceof AxiosError){
                if (e.response.status === 403) {
                    router.push("/");
                }
                else if (e.response.status === 404) {
                    toast("Không tìm thấy đơn", {type: "error"});
                }
            }
            console.log(e);
        }
    }
    const borrowBook = async (record) => {
        setSelectedRecord(curr => record);
        showModal();
    }
    const deleteRecord = async (recordId) => {
        try {
            // await axios.post(`${baseURL}/deleterecord`, {recordId}, {headers: {"Content-Type": "application/json"}});
            await http.postWithAccessToken(`${baseURL}/deleterecord`, {recordId});
            toast("Xoá thành công", {type: "success"});
            setReload(curr => !curr);
            alert("Thành công");
        }
        catch (e) {
            if (e instanceof AxiosError) {
                if (e.response.status === 404) {
                    toast("Không tìm thấy đơn", {type: "error"});
                }
                else if (e.response.status === 403) {
                    router.push("/")
                }
            }
            console.log(e);
        }
    }
    const renderButton = (record) => {
        switch (record.status) {
            case "Đang mượn":
                return <Button type="primary" onClick={() => {returnBook(record)}}>Trả sách</Button>
            case "Đặt trước": 
                return <Button type="primary"  onClick={() => {borrowBook(record)}}>Mượn sách</Button>
            case "Đã trả":
                return <Button type="primary" onClick={() => deleteRecord(record.id)}>Xóa đơn</Button>
            case "Quá hạn":
                return <Button type="primary"  onClick = {() => {returnBook(record)}}>Trả sách</Button>
            default:
                break;
        }
    }
    const [options, setOptions] = useState([]);
    const handleSearch = (value) => {
        setOptions(() => {
          if (!value) {
            setReload(curr => !curr);
            return [];
          }
          return records.filter((record, index) => {
            if (record.email.includes(value)) {
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
        const newRecords = records.filter((record, index) => {
            
            if (record.email.includes(value)) {
                return record
            }
        })
        setDataSource([...newRecords]);
    }
    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            width: "14%"
            // specify how to display data
            // render: (text) => <a>{text}</a>
        },
        {
            title: 'Khách hàng',
            dataIndex: "customer",
            key: 'customer',
            width:"14%",
            // record -> current row
            render: (_, record) => (
              <Space size="middle">
                    {record.customer}
              </Space>
            ),
        },
        {
            title: 'Tên sách',
            dataIndex: "book",
            key: 'book',
            width:"16%",
            // record -> current row
            render: (_, record) => (
              <Space size="middle">
                    <Link href={`/books/${record.bookId}`}>{record.book}</Link>
              </Space>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: "status",
            key: 'status',
            width:"14%",
            // record -> current row
            filters: [
                {
                  text: 'Đang mượn',
                  value: 'Đang mượn',
                },
                {
                  text: 'Đã trả',
                  value: 'Đã trả',
                },
                {
                    text: 'Đặt trước',
                    value: 'Đặt trước',
                },
                {
                    text: 'Quá hạn',
                    value: 'Quá hạn',
                },
            ],
            render: (_, record) => (
              <Space size="middle">
                    {record.status}
              </Space>
            ),
            onFilter: (value, record) => record.status.indexOf(value) === 0,
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: "timestart",
            key: 'timestart',
            width:"14%",
            // record -> current row
            render: (_, record) => (
              <Space size="middle">
                    {new Date(record.timeStart).toLocaleDateString()}
              </Space>
            ),
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: "timeend",
            key: 'timeend',
            width:"14%",
            // record -> current row
            render: (_, record) => (
              <Space size="middle">
                    {new Date(record.timeEnd).toLocaleDateString()}
              </Space>
            ),
        },
        {
            title: 'Thao tác',
            dataIndex: "action",
            key: 'action',
            width:"14%",
            // record -> current row
            render: (_, record) => (
              <Space size="middle">
                    {renderButton(record)}
              </Space>
            ),
        },
    ];
    const getRecords = async () => {
        try {
            // const response = await axios.get(`${baseURL}/getAllRecords`)
            const response = await http.getWithAccessToken(`${baseURL}/getAllRecords`)
            const data = response.data;
            console.log(data)
            const dataRecords = data.records.map((record, index) => {
                console.log(record)
                console.log(record.customer.name);
                return ({
                    key: record._id,
                    id: record._id,
                    customer: record.customer.name,
                    email: record.customer.email,
                    book: record.book.name,
                    customerId: record.customer._id,
                    bookId: record.book._id,
                    status: record.status,
                    timeStart: record.timeStart,
                    timeEnd: record.timeEnd,
                    numberOfBooks: record.numberOfBooks,
                })
            })
            setDataSource([...dataRecords]);
            setRecords([...dataRecords])
        }
        catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getRecords()
    }, [reload, loading])
    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            router.push("/");
        } 
    }, [])
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
            <div style={{fontWeight: "bold", fontSize: 22, marginBottom: 10}} className="flex justify-center items-center">QUẢN LÝ ĐƠN</div>
            <div className="flex justify-center items-center gap-4">
                <AutoComplete
                    style={{
                        width: 300,
                    }}
                    onSearch={handleSearch}
                    placeholder="Nhập địa chỉ email"
                    options={options}
                    onSelect={(value) => {selectRecord(value)}}
                    notFoundContent={<>Khong tim thay nguoi dung</>}
                />
           
                <Button type="primary" onClick={() => {setReload(curr => !curr)}}>Tải lại</Button>
            </div>
            {!dataSource ? <Table style={{height: "100vh"}} dataSource={dataSource} loading={true} columns={columns} size={"middle"}></Table> : <Table id={"projectsTable"} dataSource={dataSource} size={"middle"} columns={columns}  pagination={{position: ["bottomCenter"], pageSize: 5}}></Table>}
            <Modal
                open={isModalOpen}
                title="Title"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel} loading={loading}>
                            Quay lại
                    </Button>
                ]}
            >
                <BorrowBook setIsModalOpen={setIsModalOpen} setLoading={setLoading} record={selectedRecord}></BorrowBook>
            </Modal>
        </>
    )
}