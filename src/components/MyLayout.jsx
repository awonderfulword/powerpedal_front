import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  FileSearchOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Dropdown, message, Breadcrumb } from 'antd';
import logo from '../assets/IdPhoto.jpg'
import { useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

//下拉菜单的menu数据
const items = [
  {
    key: 'userCenter',
    label: (<a>个人中心</a>)
  },
  {
    key: 'logOut',
    label: (<a>退出</a>)
  },
  
];

//side 的数据
const itemsMenuData = [
  {
    key: '/admin/student_menu',
    icon: <UserOutlined />,
    label: '学生管理',
    children:[{
      label: '学生分类',
      key: '/admin/student_menu/student_type'
    },
    {
      label: '学生列表',
      key: '/admin/student_menu/student_list'
    },
  ]
  },
  {
    key: '/admin/class_menu',
    icon: <FileSearchOutlined />,
    label: '班级管理',
    children:[{
      label: '班级分类',
      key: '/admin/class_menu/class_type'
    },
    {
      label: '班级列表',
      key: '/admin/class_menu/class_list'
    },
  ]
  },
  {
    key: '/admin/course_menu',
    icon: <FileSearchOutlined />,
    label: '课程管理',
  
  }
]

//生成面包屑导航
const createNavFn =(key)=>{
  // console.log(key)
  let arrObj = []

  const demoFn = (arr) =>{
    arr.forEach(n =>{
      // console.log(n)
      //在函数调用/数组构造时, 将数组表达式或者string在语法层面展开
      //...扩展运算符， 对多层嵌套数组、对象、无能为力

      //例如
      //数组， var number = [1,2,3,4,5,6]; console.log(...number) //1 2 3 4 5 6
      //对象 var man = {name: 'chuichui', height: 176};
      //console.log({...man}) //{name: 'chuichui', height:176}
      //此行代码中，children, info 都是变量名

      //n中有children子节点时，为嵌套，把值给到变量children
      //n中没有children时，children为undefined
      //无论n中有没有children子节点, n中的键值对节点，都以自己自带的键值名，赋值给info
       
      const{children, ...info} = n
      // console.log(children)
      arrObj.push(info)

      //如果有子节点
      if(children){
        demoFn(children)
      }
    })

  }
  demoFn(itemsMenuData)

  //过滤数据
  const temp = arrObj.filter(m => key.includes(m.key))
 // console.log(temp)
 if(temp.length >0 ){
  return [{label:'首页', key:'/admin/student_menu/student_type'},...temp]
 }else{
  return[]
 }

  return arrObj
}

//查找对应的地址
const searchUrlKey = (key)=>{
  let arrObj = []

  const demoFn = (_arr) =>{
    _arr.forEach(n =>{
      // console.log(n)
      if(key.includes(n.key)){
        arrObj.push(n.key)
        //判断当前的节点有没有子节点
        if(n.children){
          demoFn(n.children)
        }
      }
     
    })
  }
  demoFn(itemsMenuData)

  return arrObj

}

const MyLayout = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  //路由跳转
  const navigate = useNavigate()

  //下拉菜单的点击事件
  const onClick = ({key})=>{
    // console.log(key)
    if(key ==='logOut'){
      navigate('/')
    }else{
        message.info('还没开通')
    }
  }

  let { pathname } = useLocation()
  // console.log(pathname)
  let demoItemsArr = searchUrlKey(pathname)

  //面包屑导航条
  const [navurl, setNavurl] = useState([])

  //面包屑导航的回调、监听
  // createNavFn
  useEffect(()=>{
      // console.log(pathname)
      setNavurl(createNavFn(pathname)) 
  },[pathname])

  return (
    <Layout style={{width:'100vw', height:'100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="profilePhoto">
            <img src={logo} />   
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={demoItemsArr}
          defaultSelectedKeys={demoItemsArr}
          onClick={({key})=>{
            // console.log(key)
            navigate(key)
          }}
          items={itemsMenuData}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <span className='titleDiv'>学生管理系统</span>
          <Dropdown menu={{items, onClick }} >
                <a onClick={(e) => e.preventDefault()} style={{float:'right', margin:'0 30px 0 0'}}>
                  {<UserOutlined style={{fontSize:'30px'}} />} 
                </a>
          </Dropdown>

        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* 面包屑 */}
          <Breadcrumb style={{margin: '0 0 20px 0'}}>
                {
                  navurl.map(n =>{
                    return <Breadcrumb.Item key={n.key}>{n.label}</Breadcrumb.Item>
                  })
                }        
          </Breadcrumb>

          {children}

        </Content>
      </Layout>
    </Layout>
  );
};
export default MyLayout;