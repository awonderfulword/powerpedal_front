import { Card, Button, Form, Input, Table, Modal, message } from "antd"
import { PlusOutlined, SearchOutlined} from '@ant-design/icons';
import { useState } from "react";
import MyUpLoad from "../components/MyUpLoad";


export default function StudentType(){

    const [isShow, setIsShow] = useState(false)
    //[]包着变量的写法是ES6的数组解构赋值
    const [myForm] = Form.useForm()
    /*
     从数组中提取值，按照对应的位置， 对变量赋值
     let [a, ...x] = ['aaa', 'bbb', 'ccc', 'ddd']
     console.log(a,x)   //打印结果：aaa 和  ['bbb', 'ccc', 'ddd']
    
    */

    return(
        <div>
             <Card 
        title="学生分类"
        extra={
            <div>
                <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={()=>{
                    setIsShow(true)

                }}
                ></Button>

            </div>
            
        }
        >
            <Form layout="inline">
                <Form.Item label="姓名">
                    <Input placeholder="请输入要查询的姓名" />
                </Form.Item>
                <Form.Item label="姓名">
                    <Button type="primary" icon={<SearchOutlined />}></Button>
                </Form.Item>
            </Form>

            <Table columns={[{
                title:'序号',
                width: 80
            }, {
                title: '姓名'
            },{
                title: '照片',
                width: 120
            },{
                title: '成绩'
            },{
                title: '操作',
                width: 80
            }]}>

            </Table>

        </Card>

        <Modal
            title="编辑输入框"
            open={isShow}
            maskClosable={false}
            onCancel={()=> setIsShow(false)}
            onOk={()=>{
                // message.success('添加成功')
                myForm.submit()
            }}
        >
            {/* 这里写form表单的内容 */}
            <Form
                form={myForm}
                labelCol={{span:3}}
                onFinish={(n)=>{
                    message.success('添加成功')
                    console.log(n)

                }}
            >
                <Form.Item 
                label='姓名' 
                name='name' 
                rules={[{
                    required:true,
                    message:'请输入姓名'

                }]}>
                    <Input placeholder="请输入你的姓名" />
                </Form.Item>
                <Form.Item label='照片'>
                    <MyUpLoad />
                </Form.Item>
                <Form.Item label='简介' name='desc'>
                    <Input.TextArea placeholder="请输入介绍" />
                </Form.Item>
            </Form>

        </Modal>
        </div>
       
    )
}