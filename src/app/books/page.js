'use client'

import axios from "axios";
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
    const [books, setBooks] = useState();
    const [dataSource, setDataSource] = useState([]);
    const [reload, setReload] = useState(true);
    const [form] = Form.useForm()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState();
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
    const handleSearch = (value) => {
        setOptions(() => {
          if (!value) {
            setReload(curr => !curr);
            return [];
          }
          return books.filter((record, index) => {
            if (record.name.toLowerCase().includes(value.toLowerCase())) {
                return record;
            }
        }).map((record, index) => {
            return {
                label: record.name,
                value: record.name,
            }
        })
        });
      };
      const selectRecord = (value) => {
        const newBooks = books.filter((book, index) => {
            if (book.name.toLowerCase().includes(value.toLowerCase())) {
                return book
            }
        })
        setDataSource([...newBooks]);
    }
    const deleteBook = async (bookId) => {
        try {
            // await axios.post(`${baseURL}/deletebook`, {bookId}, {headers: {"Content-Type": "application/json"}});
            await http.postWithAccessToken(`${baseURL}/deletebook`, {bookId})
            
            toast("Xóa thành công", {type: "success"});
            setReload(curr => !curr);
        }
        catch (e) {
            console.log(e);
        }
    }
    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            width: "16%"
            // specify how to display data
            // render: (text) => <a>{text}</a>
        },
        {
            title: 'Tên sách',
            dataIndex: "name",
            key: 'name',
            width:"16%",
            // record -> current row
            render: (_, record) => (
              <Space size="middle">
                    {/* <Link href={`/bookDetail/${record.bookId}`}>{record.book}</Link> */}
                    {record.name}
              </Space>
            ),
        },
        {
            title: 'Tác giả',
            dataIndex: "authors",
            key: 'authors',
            width:"18%",
            // record -> current row
            render: (_, record) => (
              <Space size="middle">
                    {record.authors.map((author) => {return author.name}).join(', ')}
              </Space>
            ),
        },
        {
            title: 'Thể loại',
            dataIndex: "genres",
            key: "genres",
            width: "18%",
            render: (_, record) => (
                <Space size="middle">
                      {/* <Link href={`/bookDetail/${record.bookId}`}>{record.book}</Link> */}
                      {record.genres.map((genres) => {return genres.name}).join(', ')}
                </Space>
            ),
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            width: "16%",
            // render: (_, record) => {
                
            //     <Space size="middle">
            //           {/* <Link href={`/bookDetail/${record.bookId}`}>{record.book}</Link> */}
            //           Hi
            //     </Space>
            // }
        },
        {
            title: 'Thao tác',
            dataIndex: "action",
            key: 'action',
            width:"16%",
            // record -> current row
            render: (_, record) => (
              <Space size="middle">
                    <Button type="primary" onClick = {() => router.push(`/books/${record.id}`)}>Chi tiết</Button> 
                    <Button type="primary" onClick={() => {router.push(`/addRecord/${record.id}`)}}>Mượn Sách</Button>
                    <Button type="primary" onClick={() => {deleteBook(record.id)}}>Xóa sách</Button>
              </Space>
            ),
        },
    ]
    const getRecords = async () => {
        try {
            const response = await http.getWithAccessToken(`${baseURL}/listbook`)
            const data = response.data;
            const dataRecords = data.books.map((book, index) => {
                
                return ({
                    key: book._id,
                    id: book._id,
                    name: book.name,
                    genres: book.genres,
                    authors: book.authors,
                    quantity: book.quantity
                })
            })
            setDataSource([...dataRecords]);
            setBooks([...dataRecords])
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
            <div style={{fontWeight: "bold", fontSize: 22, marginBottom: 10}} className="flex justify-center items-center">QUẢN LÝ SÁCH</div>
            <div className="flex justify-center items-center gap-4">
            <AutoComplete
                style={{
                    width: 400,
                }}
                onSearch={handleSearch}
                placeholder="Tìm kiếm sách"
                options={options}
                onSelect={(value) => {selectRecord(value)}}
                notFoundContent={<>Không tìm thấy sách</>}
            />
            <Button type="primary" onClick={() => {setReload(curr => !curr)}}>Tải lại</Button>
            <Button type="primary" onClick={() => {router.push("/addBook")}}>Thêm sách</Button>
            </div>
            {!dataSource ? <Table style={{height: "100vh"}} dataSource={dataSource} loading={true} columns={columns} size={"middle"}></Table> : <Table id={"projectsTable"} dataSource={dataSource} size={"middle"} columns={columns}  pagination={{position: ["bottomCenter"], pageSize: 5}}></Table>}
        </>
    )
}