'use client'

import { useContext, useEffect, useRef, useState } from "react";

import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    BookOutlined,
    FileTextOutlined,
    ReadOutlined,
    LogoutOutlined
  } from '@ant-design/icons';
  import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/router";
  const { Header, Content, Footer, Sider } = Layout;
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
 
export default function MenuComp({children}){
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);
    const {state, setReload} = useContext(UserContext);
    const items = [
        getItem(<Link href={'/books'}>Sách</Link>, '1', <ReadOutlined />),
        getItem(<Link href={'/records'}>Đơn</Link>, '2',<FileTextOutlined />),
        getItem(<Link href={'/author'}>Tác giả</Link>, '3',<TeamOutlined />),
        getItem(<Link href={'/genre'}>Thể loại</Link>, '4', <BookOutlined></BookOutlined>),
        getItem(<Link href={'/customers'}>Khách hàng</Link>, '5', <UserOutlined />),
        // getItem('User', 'sub1', <UserOutlined />, [
        //   getItem('Tom', '3'),
        //   getItem('Bill', '4'),
        //   getItem('Alex', '5'),
        // ]),
    
        getItem(<Link href={"/"} onClick={() => {localStorage.clear(); setReload(curr => !curr)}}>Đăng xuất</Link>, '6', <LogoutOutlined />)
    ]
    const items2 = [
        getItem(<Link href={'/books'}>Sách</Link>, '1', <ReadOutlined />),
        getItem(<Link href={'/records'}>Đơn</Link>, '2',<FileTextOutlined />),
        getItem(<Link href={'/author'}>Tác giả</Link>, '3',<TeamOutlined />),
        getItem(<Link href={'/genre'}>Thể loại</Link>, '4', <BookOutlined></BookOutlined>),
        getItem(<Link href={'/customers'}>Khách hàng</Link>, '5', <UserOutlined />),
    ]
    const location = usePathname();
    const [selectted, setSelected] = useState();
    console.log(location);
    useEffect(() => {
        switch (location.split('/')[1]) {
            case 'books':
                setSelected(curr => '1');
                break;
            case 'records':
                setSelected(curr => '2');
                break;
            case 'genre':
                setSelected(curr => '4');
                break;
            case 'author':
                setSelected(curr => '3');
                break;
            case 'customers':
                setSelected(curr => '5');
                break;
            default:
                setSelected(curr => '0');
                break;
        }
    }, [location])
    return (
        <Layout>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        {state ?<Menu theme="dark" mode="inline" selectedKeys={[selectted]} items={items} /> : <Menu selectedKeys= {[]} theme="dark" mode="inline" items={items2} />}
      </Sider>
      <Layout>
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              height: "85vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            className="overflow-y-scroll"
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center'
          }}
        >
          Hust Library ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
    )
}