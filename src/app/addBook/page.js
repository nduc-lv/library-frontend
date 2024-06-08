'use client'

import axios, { AxiosError } from "axios"
import baseURL from "../utils/baseURL"
import { useEffect, useState } from "react"
import { UploadOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from "next/navigation";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Space,
  Image
} from 'antd';
import http from "../utils/http";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    console.log(e);
    return e;
  }
  console.log(e?.fileList)
  return e?.fileList;
};
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
export default function AddBook() {
    const [authors, setAuthors] = useState();
    const [genres, setGenres] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
      };
    const getAuthors = async () => {
        try {
            const response = await http.getWithAccessToken(`${baseURL}/listauthor`);
            const data = response.data;
            const options = data.authors.map((author) => {return {label: author.name, value: author._id, desc: author.name}})
            setAuthors([...options]);
        }
        catch (e) {
            console.log(e);
        }
    }
    const getGenres = async () => {
        try {
            const response = await http.getWithAccessToken(`${baseURL}/listgenre`)
            const data = response.data;
            const options = data.genres.map((genre) => {return {label: genre.name, value: genre._id, desc: genre.name}})
            console.log(options);
            setGenres([...options]);
        }
        catch (e) {
            console.log(e);
        }
    }
    const router = useRouter();
    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
          router.push("/");
        }
        getAuthors();
        getGenres();
    }, [])
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onFinish = async (values) => {
        console.log('Success:', values);
        try {
            await http.postWithAccessTokenMultipart(`${baseURL}/addbook`, {name: values.name, genres: values.genres, authors: values.authors, quantity: values.quantity, review: values.review, bookcover: values.bookcover[0].originFileObj})
            toast("Thêm sách thành công", {type:"success"})
            // await axios.post(`${baseURL}/addbook`, {name: values.name, genres: values.genres, authors: values.authors, quantity: values.quantity, review: values.review, bookcover: values.bookcover[0].originFileObj}, {headers: {"Content-Type": "multipart/form-data"}})
        }
        catch (e) {
            if (e instanceof AxiosError){
              if (e.response.status === 400) {
                toast("Sách đã tồn tại", {type: "error"});
              }
              else if (e.response.status === 403) {
                router.push("/");
              }
              else {
                toast("Lỗi", {type: "error"});
              }
            }
            console.log(e);
        }
    };
      
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div style={{}}>
          <ToastContainer></ToastContainer>
        <div className="text-center" style={{fontWeight: "bold", fontSize: 22}}>THÊM SÁCH</div>
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
            <Form.Item label="Tên sách" name={"name"} rules={[{required: true}]}>
              <Input />
            </Form.Item>
            <Form.Item label="Số lượng" name={"quantity"} rules={[{required: true}]}>
              <InputNumber min={1}/>
            </Form.Item>
            <Form.Item label="Mô tả" name={"review"} rules={[{required: true}]}>
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Tác giả" name={"authors"} rules={[{required: true}]}>
            <Select
                mode="multiple"
                style={{
                width: '100%',
                }}
                placeholder="Chọn tác giả"
                onChange={handleChange}
                options={authors}
                optionFilterProp="label" 
                optionRender={(option) => (
                <Space>
                    <span role="img" aria-label={option.data.label}>
                    </span>
                            {option.data.desc}
                </Space>
                )}
      />
            </Form.Item>
            <Form.Item label="Thể loại" name={"genres"} rules={[{required: true}]}>
            <Select
                mode="multiple"
                style={{
                width: '100%',
                }}
                placeholder="Chọn thể loại"
                onChange={handleChange}
                options={genres}
                optionFilterProp="label" 
                optionRender={(option) => (
                <Space>
                    <span role="img" aria-label={option.data.label}>
                    </span>
                            {option.data.desc}
                </Space>
                )}
      />
            </Form.Item>
            <Form.Item label="Ảnh bìa" name="bookcover" getValueFromEvent={normFile} rules={[{required: true}]}>
                <Upload
                    listType="picture-card"
                    maxCount={1}
                    onPreview={handlePreview}
                >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
                  </Form.Item>
                {previewImage && (
                  <Image
                    wrapperStyle={{
                      display: 'none',
                    }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                    alt = {"Bookcover"}
                  />
                )}
            <Form.Item className="flex justify-center items-center">
                <Button type="primary" htmlType="submit" style={{marginTop: 10}}>Xác nhận</Button>
            </Form.Item>
            </Form>
        </div>
        </div>
    )
}