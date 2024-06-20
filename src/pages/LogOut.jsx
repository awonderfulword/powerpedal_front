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

             <Card title='Bienvenue sur votre espace personnel' >
                    <Form 
                        labelCol={{
                             md: {
                                span: 4
                            }
                    }}
                    onFinish={(n)=>{
                        console.log(n)
                        message.success('Bienvenue')
                        navigate('/management/info/product')
                    }}
                    
                    >
                        <Form.Item label='Identifiant' name='userName' rules={[
                            {
                                required: true,
                                message: 'Vous devez renseigner votre identifiant'
                            }]}>
                            <Input placeholder='Votre identifiant'/>
                        </Form.Item>
                        <Form.Item label='mot de passe' name='password' rules={[
                            {
                                required: true,
                                message: 'Vous devez renseigner votre mot de passe'
                            }]}>
                        <Input.Password placeholder='Votre mot de passe'/>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType='submit' type='primary' style={{margin:'0 auto', display: 'block'}}
                            >
                             SE CONNECTER
                            </Button>
                        </Form.Item>
                    </Form>
             </Card>

            </Col>
        </Row>
    )
}