'use client'


import { Button, InputNumber, Modal, Form, Input, Space, Select, Image} from "antd";
import { useContext, useEffect, useReducer, useState} from "react";
import { Card } from 'antd';
import axios, { Axios, AxiosError } from "axios";
import baseURL from "@/app/utils/baseURL";
import { useForm } from "antd/es/form/Form";
import { UploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import http from "@/app/utils/http";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
});
const normFile = (e) => {
    if (Array.isArray(e)) {
      console.log(e);
      return e;
    }
    console.log(e?.fileList)
    return e?.fileList;
  };
function reducer(state, action) {
    if (action.type === 'review') {
      return 'review';
    }
    if (action.type === 'title') {
        return 'title';
    }
    if (action.type === 'quantity') {
        return 'quantity';
    }
    if (action.type === 'image') {
        return 'image';
    }
    throw Error('Unknown action.');
  }

export default function BookDetail({params}) {
    const [state, dispatch] = useReducer(reducer, "image");
    const bookId= params.bookId;
    const [bookDetail, setBookDetail] = useState();
    const [numberOfBooks, setNumberOfBooks] = useState(1);
    const [records, setRecords] = useState();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [reload, setReload] = useState(false);
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
            // const response = await axios.get(`${baseURL}/listauthor`, {headers: {"Content-Type": "application/json"}});
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
            // const response = await axios.get(`${baseURL}/listgenre`, {headers: {"Content-Type": "application/json"}});
            const response = await http.getWithAccessToken(`${baseURL}/listgenre`);
            const data = response.data;
            const options = data.genres.map((genre) => {return {label: genre.name, value: genre._id, desc: genre.name}})
            console.log(options);
            setGenres([...options]);
        }
        catch (e) {
            console.log(e);
        }
    }
    const showModal = () => {
        setOpen(true);
    };


    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    const getBookDetails = async () => {
        try {
            const response = await http.getWithAccessToken(`${baseURL}/listbook/${bookId}`)
            const data = response.data;
            console.log(data.book);
            setBookDetail({...data.book});
            
        }
        catch (e) {
            console.log(e);
        }
    }
    const getNumberOfBooks = async () => {
        try {
            const response = await http.getWithAccessToken(`${baseURL}/numberOfBooks/${bookId}`);
            const data = response.data;
            console.log(data);
            setNumberOfBooks({...data});
        }
        catch (e) {
            console.log(e);
        }
    }  
    
    useEffect(() => {
        getBookDetails();
        getNumberOfBooks();
        getAuthors();
        getGenres();
    }, [reload])
    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            router.push("/");
        } 
    }, [])
    const onFinish = async (values) => {
        try {
            setConfirmLoading(true);
            switch (state) {
                case "review":
                    // await axios.post(`${baseURL}/updateBookSingle/${bookId}/review`, {review: values.review}, {headers: {"Content-type": "application/json"}})
                    await http.postWithAccessToken(`${baseURL}/updateBookSingle/${bookId}/review`, {review: values.review})
                    break;
                case "title":
                    // await axios.post(`${baseURL}/updateBookSingle/${bookId}/title`, {name: values.name, genres: values.genres, authors: values.authors}, {headers: {"Content-Type": "application/json"}})
                    await http.postWithAccessToken(`${baseURL}/updateBookSingle/${bookId}/title`, {name: values.name, genres: values.genres, authors: values.authors})
                    break;
                case "quantity":
                    // await axios.post(`${baseURL}/updateBookSIngle/${bookId}/quantity`, {quantity: values.quantity}, {headers: {"Content-Type": "application/json"}})
                    await http.postWithAccessToken(`${baseURL}/updateBookSingle/${bookId}/quantity`, {quantity: values.quantity});
                    break;
                case "image":
                    // await axios.post(`${baseURL}/updatebook/${bookId}`, { bookcover: values.bookcover[0].originFileObj}, {headers: {"Content-Type": "multipart/form-data"}})
                    await http.postWithAccessTokenMultipart(`${baseURL}/updatebook/${bookId}`, { bookcover: values.bookcover[0].originFileObj});
                    break;
                default:
                    break;
            }
            toast("Cập nhật thành công", {type: "success"});
            setConfirmLoading(false)
            setOpen(false)
            setReload(curr => !curr);
        }
        catch (e) {
            console.log(e);
            if (e instanceof AxiosError) {
                if (e.response.status === 403) {
                    router.push("/");
                }
                else if (e.response.status === 404) {
                    toast("Sách không tồn tại", {type: "error"});
                }
                else if (e.response.status === 400) {
                    toast("Tên sách bị trùng", {type: "error"})
                }
                else {
                    toast('Lỗi', {type: "error"});
                }
            }
            setConfirmLoading(false);
        }
      };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [form] = useForm();
    const Title = ({title}) => {
        return (
            <div className="flex flex-row justify-between">
                <div>
                    {title}
                </div>
                <Button type ={"primary"}onClick={() => {dispatch({type: "review"}); form.setFieldValue("review", bookDetail.review);showModal()}}>Chỉnh sửa</Button>
            </div>
        )
    }
    const NameTitle = () => {
        return (
            <div className="flex flex-row justify-between">
                <div>
                    Thông tin cơ bản
                </div>
                <Button type ={"primary"}onClick = {() => {dispatch({type: "title"}); form.setFieldValue("name", bookDetail.name); form.setFieldValue("genres", bookDetail.genres.map((genre) => genre._id)); form.setFieldValue("authors", bookDetail.authors.map((author) => author._id)); showModal()}}>
                    Chỉnh sửa
                </Button>
            </div>
        )
    }
    const QuantityTitle = () => {
        return (
            <div className="flex flex-row justify-between">
                <div>
                    Số lượng
                </div>
                <Button type ={"primary"} onClick={() => {dispatch({type: "quantity"}); form.setFieldValue("quantity", bookDetail.quantity); showModal()}}>
                    Chỉnh sửa
                </Button>
            </div>
        )
    }
    const ImageTitle = () => {
        return (
            <div className="flex flex-row justify-between">
                <div>
                    Ảnh bìa
                </div>
                <Button type ={"primary"}onClick = {() => {dispatch({type: "image"}); showModal()}}>
                    Chỉnh sửa
                </Button>
            </div>
        )
    }
    const { TextArea } = Input;
    return (
        <>
            {bookDetail === undefined ? (
                <div className="text-center">
                    Loading
                </div>
            ) :
        <div style={{paddingLeft: 30, paddingRight: 30}}>
            <ToastContainer></ToastContainer>
            <div className="grid grid-cols-3 gap-4 auto-rows-max">
                {/* <div>{bookDetail.name}</div> */}
                
                <Card title={<ImageTitle></ImageTitle>}>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Image alt="book's cover" src={`https://library-back-425902.df.r.appspot.com/images/${bookDetail.image}`} width={368} height={368} fallback="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ_4drL9dKEWM3Xp5Fcn5mEBTD7aXG6g1D17KEIg8wKJI0tIU7Z"
                        ></Image>
                    </div>
                </Card>
                <div className="flex flex-col gap-4">
                    <Card title={<NameTitle></NameTitle>} style={{whiteSpace: "normal"}}>
                            <p><span style={{fontWeight: "bold"}}>Tác giả: </span> {bookDetail.authors.map((author) => author.name).join(", ")}</p>
                            <p><span style={{fontWeight: "bold"}}>Thể loại: </span> {bookDetail.genres.map((genre) => genre.name).join(", ")}</p>
                            <p className="text-ellipsis"><span style={{fontWeight: "bold"}}>Tên sách: </span> {bookDetail.name}</p>
                    </Card>
                    <Card title={<Title title = {"Mô tả sách"}></Title>} style={{}}>
                        <pre className="w-full text-wrap overflow-y-auto overflow-x-hidden no-scrollbar" style={{height: 300}}>
                            {bookDetail.review}
                        </pre>
                    </Card>
                </div>
                <div>
                    <Card title={<QuantityTitle></QuantityTitle>}>
                        <p style={{marginBottom: 10}}>Còn: {bookDetail.quantity} cuốn</p>
                        <p style={{marginBottom: 10}}>Đang được mượn: {numberOfBooks.borrowedBooks} cuốn</p>
                        <p style={{marginBottom: 10}}>Đang được đặt trước: {numberOfBooks.reservedBooks} cuốn</p>
                        <p style={{marginBottom: 10}}>Quá hạn trả: {numberOfBooks.outdatedBooks} cuốn</p>
                        <p style={{marginBottom: 10}}>Tổng: {bookDetail.quantity + numberOfBooks.borrowedBooks + numberOfBooks.outdatedBooks + numberOfBooks.reservedBooks} cuốn</p>
                        {/* <InputNumber type="number" onChange={onChange} defaultValue={1} min={1} max = {bookDetail?.quantity}></InputNumber> */}
                    </Card>
                </div>
                {/* <div>{bookDetail.quantity}</div>
                <div>{bookDetail.authors.map((author) => {return author.name})}</div>
                <div>{bookDetail.genres.map((genre) => {return genre.name})}</div> */}
            </div>
        </div> 
            }
            <Modal
            title="Title"
            open={open}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={[
                <Button type ={"primary"}loading={confirmLoading} form="myForm" key="submit" htmlType="submit">
                    Submit
                </Button>
            ]}
            >
                <Form
                labelCol={{
                span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        id="myForm"
        form={form}
      >
        {!(state === "review") || 
            <Form.Item label="Review" name={"review"} rules={[{required: true}]}>
                <TextArea rows={4} />
            </Form.Item>   
        }
        {!(state === "title") || 
            <>
                <Form.Item label="Name" name={"name"} rules={[{required: true}]}>
                        <Input />
                </Form.Item>
                <Form.Item label="Authors" name={"authors"} rules={[{required: true}]}>
                <Select
                    mode="multiple"
                    style={{
                    width: '100%',
                    }}
                    placeholder="select one country"
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
        <Form.Item label="Genre" name={"genres"} rules={[{required: true}]}>
        <Select
            mode="multiple"
            style={{
            width: '100%',
            }}
            placeholder="select one country"
           
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
        </>
        }
        {!(state === "quantity") || 
             <Form.Item label="Quantity" name={"quantity"} rules={[{required: true}]}>
             <InputNumber min={1}/>
           </Form.Item>      
        }

        {!(state == "image") || (!bookDetail) || 
            <Form.Item label="Upload" name="bookcover" getValueFromEvent={normFile} rules={[{required: true}]}>
            <Upload
                listType="picture-card"
                maxCount={1}
                defaultFileList={[
                    {
                        uid: '1',
                        name: bookDetail.image,
                        status: "done",
                        url: `https://library-back-425902.df.r.appspot.com/images/${bookDetail.image}`,
                    },
                ]}
                onPreview={handlePreview}
            >
                <Button type ={"primary"}icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            </Form.Item>
        }
        </Form>
            </Modal>
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
             alt="bookCover"
             src={previewImage}
             style={{zIndex: 9999}}
             />
            )} 
        </>
    )
}