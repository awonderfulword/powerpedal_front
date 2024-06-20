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
    label: (<a>Mes données</a>)
  },
  {
    key: 'logOut',
    label: (<a>Me déconnecter</a>)
  },
  
];

//side 的数据
const itemsMenuData = [
  {
    key: '/management/info',
    icon: <UserOutlined />,
    label: 'Informations',
    children:[{
      label: 'Fournisseurs',
      key: '/management/info/supplier'
    },
    {
      label: 'Clients',
      key: '/management/info/client'
    },
    {
      label: 'Produits',
      key: '/management/info/product'
    }
  ]
  },
  {
    key: '/management/procurement',
    icon: <FileSearchOutlined />,
    label: 'Gestion des achats',
    children:[{
      label: 'Achats',
      key: '/management/procurement/purchase'
    },
    {
      label: 'Retours',
      key: '/management/procurement/purchaseReturn'
    },
  ]
  },
  {
    key: '/management/sales',
    icon: <FileSearchOutlined />,
    label: 'Gestion des ventes',
    children:[{
      label: 'Ventes',
      key: '/management/sales/sales'
    },
    {
      label: 'Retours de ventes',
      key: '/management/sales/sales_returns'
    },
  ] 
  },
  {
    key: '/management/admin',
    icon: <FileSearchOutlined />,
    label: 'Administration',
    children:[{
      label: 'Administrateur',
      key: '/management/admin/administrator'
    },
    {
      label: 'Employés',
      key: '/management/admin/employee'
    },
    {
      label: 'Départements',
      key: '/management/admin/departement'
    }
  ] 
  },
]

//生成面包屑导航
const createNavFn =(key)=>{
  // console.log(key)
  let arrObj = []

  const demoFn = (arr) =>{
    arr.forEach(n =>{
   
      const{children, ...info} = n
      // console.log(children)
      arrObj.push(info)

    
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
  return [{label:'Accueil', key:'/admin/student_menu/student_type'},...temp]
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
          <span className='titleDiv'>Power Pedal</span>
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