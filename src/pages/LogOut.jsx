import { Col, Row, Card, Form, Input, Button, message } from 'antd';
import logo from '../assets/powerpedal.png'
import { useNavigate } from 'react-router-dom';

export default function LogOut(){

    const navigate = useNavigate()

    return(
        <Row>
            <Col md={{
                span:8,
                push:8
            }}
            xs={{
                span:22,
                push:1
            }} 
            >
             <img src={logo} style={{
                width: '230px', 
                display:'block',
                borderRadius:'15px',
                margin: '40px auto'
             }}/>   

             <Card title='管理系统' >
                    <Form 
                        labelCol={{
                             md: {
                                span: 4
                            }
                    }}
                    onFinish={(n)=>{
                        console.log(n)
                        message.success('登录成功')
                        navigate('/admin/student_menu/student_type')
                    }}
                    
                    >
                        <Form.Item label='用户名' name='userName' rules={[
                            {
                                required: true,
                                message: '请输入用户名'
                            }]}>
                            <Input placeholder='请输入用户名'/>
                        </Form.Item>
                        <Form.Item label='密码' name='password' rules={[
                            {
                                required: true,
                                message: '请输入密码'
                            }]}>
                        <Input.Password placeholder='请输入密码'/>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType='submit' type='primary' style={{margin:'0 auto', display: 'block'}}
                            >
                             登录
                            </Button>
                        </Form.Item>
                    </Form>
             </Card>

            </Col>
        </Row>
    )
}