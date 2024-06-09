'use client'

import axios, { Axios, AxiosError } from "axios";
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
export default function Genre() {
    const [genres, setgenres] = useState();
    const [reload, setReload] = useState(true);
    const [form] = Form.useForm()
    const [dataSource, setDataSource] = useState([]);
    const router = useRouter();
    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            router.push("/");
        } 
    }, []);
    const deleteGenre = async (genreName) => {
        try {
            // await axios.post(`${baseURL}/deletegenre`, {name: genreName}, {headers: {"Content-Type": "application/json"}});
            await http.postWithAccessToken(`${baseURL}/deletegenre`, {name: genreName})
            toast("Xóa thành công", {type: "success"});
            setReload(curr => !curr);
        }
        catch (e) {
            if (e instanceof AxiosError) {
                if (e.response.status === 404){
                    toast("Không tìm thấy thể loại", {type: "error"})
                }
                else if (e.response.status === 403) {
                    router.push("/");
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
                <Button type = {"primary"} onClick={() => {deleteGenre(record.name)}}>Xóa</Button>
                <Button type = {"primary"} onClick={() => {setGenreId(curr => record.id); form.setFieldValue("name", record.name); showModalUpdate();}}>Chỉnh sửa</Button>
              </Space>
            ),
        },
    ]
    const getgenres = async () => {
        try {
            // const response = await axios.get(`${baseURL}/listgenre`)
            const response = await http.getWithAccessToken(`${baseURL}/listgenre`)
            const data = response.data
            const datagenres = data.genres.filter((genre) => {
                console.log(genre._id != "663e4e3dde29fd6a43f8d6af")
                return (genre._id != "663e4e3dde29fd6a43f8d6af")
            }).map((genre, index) => {
                return {
                    key: genre._id,
                    name: genre.name,
                    id: genre._id,
                }
            })
            setgenres([...datagenres])
            setDataSource([...datagenres]);
            console.log(datagenres);
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
            await http.postWithAccessToken(`${baseURL}/addgenre`, {name: values.name})
            toast("Thêm thành công", {type: "success"});
            setConfirmLoading(false)
            setOpen(false)
            setReload(curr => !curr);
        }
        catch (e) {
            if (e instanceof AxiosError){
                if (e.response.status === 403){
                    router.push("/");
                }
                else if (e.response.status === 400) {
                    toast("Thể loại đã tồn tại", {type: "error"});
                }
            }
            setConfirmLoading(false);
        }
      };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [genreId, setGenreId] = useState("");
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
            // await axios.post(`${baseURL}/updategenre/${genreId}`, {name: values.name}, {headers: {"Content-Type": "application/json"}})
            await http.postWithAccessToken(`${baseURL}/updategenre/${genreId}`, {name: values.name})
            toast("Cập nhật thành công", {type: "success"});
            setConfirmLoadingUpdate(false)
            setOpenUpdate(false)
            setReload(curr => !curr);
        }
        catch (e) {
            if (e instanceof AxiosError){
                if (e.response.status === 404){
                    toast("Không tìm thấy thể loại", {type: "error"});
                }
                else if (e.response.status === 400) {
                    toast("Thể loại đã tồn tại", {type: "error"});
                }
                else if (e.response.status === 403) {
                    router.push("/");
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
          return genres.filter((genre, index) => {
            if (genre.name.toLowerCase().includes(value.toLowerCase())) {
                return genre
            }
        }).map((genre, index) => {
            return {
                label: genre.name,
                value: genre.name
            }
        })
        });
      };
    const selectGenre = (value) => {
        const newgenres = genres.filter((genre, index) => {
            if (genre.name.toLowerCase().includes(value.toLowerCase())) {
                return genre
            }
        })
        setDataSource([...newgenres]);
    }
    useEffect(() => {
        getgenres();
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
            {/* add new genres */}
            <ToastContainer></ToastContainer>
            <div style={{fontWeight: "bold", fontSize: 22, marginBottom: 10}} className="flex justify-center items-center">QUẢN LÝ THỂ LOẠI</div>
            <div className="flex justify-center items-center gap-4">
                <AutoComplete
                    style={{
                        width: 300,
                    }}
                    onSearch={handleSearch}
                    placeholder="Tên thể loại"
                    options={options}
                    onSelect={(value) => {selectGenre(value)}}
                />
                <Button type = {"primary"}  onClick={() => {setReload(curr => !curr)}}>Tải lại</Button>
                <Button type = {"primary"} onClick={showModal}>
                        Thêm thể loại
                </Button>
            </div>
            <Modal
                title="Thêm thể loại"
                open={open}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={[
                    <Button type = {"primary"} loading={confirmLoading} form="myForm" key="submit" htmlType="submit">
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
                    label="Tên thể loại"
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
                    <Button type = {"primary"} loading={confirmLoadingUpdate} form="myFormUpdate" key="submit" htmlType="submit">
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
                    label="Tên thể loại"
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
            {/* genres */}
        </>
    )
}