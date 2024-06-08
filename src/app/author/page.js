'use client'

import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react"
import baseURL from "../utils/baseURL";
import {Table, Form, Input} from 'antd';
import {Space} from "antd";
import { Button, Modal } from 'antd';
import { AutoComplete } from 'antd';
import { useRouter } from "next/navigation";
import http from "../utils/http";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { Search } = Input;
export default function Author() {
    const [authors, setAuthors] = useState();
    const [reload, setReload] = useState(true);
    const [form] = Form.useForm()
    const [dataSource, setDataSource] = useState([]);
    const router = useRouter();
    const deleteAuthor = async (authorName) => {
        try {
            // await axios.post(`${baseURL}/deleteauthor`, {name: authorName}, {headers: {"Content-Type": "application/json"}});
            await http.postWithAccessToken(`${baseURL}/deleteauthor`, {name: authorName});
            toast("Xóa thành công", {type: "success"})
            setReload(curr => !curr);
        }
        catch (e) {
            if (e instanceof AxiosError) {
                if (e.response.status === 403){
                    router.push("/");
                }
                else if (e.response.status === 404){
                    toast("Tác giả không tồn tại", {type: "error"});
                }
            }
            console.log(e);
        }
    }
    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            width: "30%"
            // specify how to display data
            // render: (text) => <a>{text}</a>
        },
        {   title: "Tên",
            dataIndex: "name",
            key: "name",
            width: "30%"
        },
        {
            title: 'Thao tác',
            key: 'action',
            width:"30%",
            // record -> current row
            render: (_, record) => (
              <Space size="middle">
                <Button type="primary" onClick={() => {deleteAuthor(record.name)}}>Xóa tác giả</Button>
                <Button type="primary" onClick={() => {setAuthorId(curr => record.id); form.setFieldValue("name", record.name); showModalUpdate();}}>Chỉnh sửa</Button>
              </Space>
            ),
        },
    ]
    const getAuthors = async () => {
        try {
            const response = await http.getWithAccessToken(`${baseURL}/listauthor`)
            const data = response.data;
            const dataAuthors = data.authors.map((author, index) => {
                return {
                    key: author._id,
                    name: author.name,
                    id: author._id,
                }
            })
            setAuthors([...dataAuthors])
            setDataSource([...dataAuthors]);
            console.log(dataAuthors);
        }
        catch (e) {
            console.log(e);
        }
    }
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = () => {
      setOpen(true);
    };
    const handleCancel = () => {
      setOpen(false);
    };
    const onFinish = async (values) => {
        try {
            setConfirmLoading(true);
            // await axios.post(`${baseURL}/addauthor`, {name: values.name}, {headers: {"Content-Type": "application/json"}})
            await http.postWithAccessToken(`${baseURL}/addauthor`, {name: values.name})
            toast("Thêm tác giả thành công", {type: "success"});
            setConfirmLoading(false)
            setOpen(false)
            setReload(curr => !curr);
        }
        catch (e) {
            if (e instanceof AxiosError){
                if (e.response.status === 400){
                    toast("Tác giả đã tồn tại", {type: "error"});
                }
                else if (e.response.status === 403){
                    router.push("/");
                }
                else{
                    toast("Lỗi", {type: "error"});
                }
            }
            setConfirmLoading(false);
        }
      };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [authorId, setAuthorId] = useState("");
    const [openUpdate, setOpenUpdate] = useState(false);
    const [confirmLoadingUpdate, setConfirmLoadingUpdate] = useState(false);
    const showModalUpdate = () => {
      setOpenUpdate(true);
    };
    const handleCancelUpdate = () => {
      setOpenUpdate(false);
    };
    const onFinishUpdate = async (values) => {
        try {
            setConfirmLoadingUpdate(true);
            // await axios.post(`${baseURL}/updateauthor/${authorId}`, {name: values.name}, {headers: {"Content-Type": "application/json"}})
            await http.postWithAccessToken(`${baseURL}/updateauthor/${authorId}`, {name: values.name})
            toast("Cập nhật thành công", {type: "success"});
            setConfirmLoadingUpdate(false)
            setOpenUpdate(false)
            setReload(curr => !curr);
        }
        catch (e) {
            if (e instanceof AxiosError){
                if (e.response.status === 403) {
                    router.push("/");
                }
                else if (e.response.status === 404) {
                    toast("Không tìm thấy tác giả", {type: "error"});
                }
                else if (e.response.status === 400) {
                    toast("Tác giả đã tồn tại", {type: "error"});
                }
                else {
                    toast("Lỗi", {type: "error"});
                }
            }
            setConfirmLoadingUpdate(false);
        }
      };
    const onFinishFailedUpdate = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    const [options, setOptions] = useState([]);
    const handleSearch = (value) => {
        setOptions(() => {
          if (!value) {
            setReload(curr => !curr);
            return [];
          }
          return authors.filter((author, index) => {
            if (author.name.toLowerCase().includes(value.toLowerCase())) {
                return author
            }
        }).map((author, index) => {
            return {
                label: author.name,
                value: author.name
            }
        })
        });
      };
    const selectAuthor = (value) => {
        const newAuthors = authors.filter((author, index) => {
            if (author.name.toLowerCase().includes(value.toLowerCase())) {
                return author
            }
        })
        setDataSource([...newAuthors]);
    }
    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            router.push("/");
        } 
    }, [])
    useEffect(() => {
        getAuthors();
    }, [reload]);
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
            {/* add new authors */}
            <ToastContainer></ToastContainer>
            <div style={{fontWeight: "bold", fontSize: 22, marginBottom: 10}} className="flex justify-center items-center">QUẢN LÝ TÁC GIẢ</div>
            <div className="flex justify-center items-center gap-4">
                <AutoComplete
                    style={{
                        width: 300,
                    }}
                    onSearch={handleSearch}
                    placeholder="Nhập tên tác giả"
                    options={options}
                    onSelect={(value) => {selectAuthor(value)}}
                />
                <Button type="primary" onClick={() => {setReload(curr => !curr)}}>Tải lại</Button>
                <Button type="primary" onClick={showModal}>
                        Thêm tác giả
                </Button>
            </div>
            <Modal
                title="Thêm tác giả"
                open={open}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={[
                    <Button loading={confirmLoading} form="myForm" key="submit" htmlType="submit" type={"primary"}>
                        Xác nhận
                    </Button>
                    ]}
            >
                <Form
                    id = "myForm"
                    name="basic"
                    labelCol={{
                        span: 5,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                <Form.Item
                    label="Tên tác giả"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                    >
                <Input />
                </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Chỉnh sửa"
                open={openUpdate}
                confirmLoading={confirmLoadingUpdate}
                onCancel={handleCancelUpdate}
                footer={[
                    <Button loading={confirmLoadingUpdate} form="myFormUpdate" key="submit" htmlType="submit" type="primary">
                        Xác nhận
                    </Button>
                    ]}
                    >
                <Form
                    form = {form}
                    id = "myFormUpdate"
                    name="basic"
                    labelCol={{
                        span: 5,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}s
                    style={{
                        maxWidth: 600,
                    }}
                    onFinish={onFinishUpdate}
                    onFinishFailed={onFinishFailedUpdate}
                    autoComplete="off"
                >
                <Form.Item
                    label="Tên tác giả"
                    name="name"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                    ]}
                >
                <Input/>
                </Form.Item>
                </Form>
            </Modal>
            {!dataSource ? <Table style={{height: "100vh"}} dataSource={dataSource} loading={true} columns={columns} size={"middle"}></Table> : <Table id={"projectsTable"} dataSource={dataSource} size={"middle"} columns={columns}  pagination={{position: ["bottomCenter"], pageSize: 5}}></Table>}
            {/* authors */}
        </>
    )
}