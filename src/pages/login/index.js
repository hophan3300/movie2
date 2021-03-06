import { useHistory } from "react-router-dom";
import React, { useState} from 'react';
import {Row, Col, Form, Input, Button} from 'antd';
import {api} from '../../services/api';
import {helper} from '../../helper/common';


const LoginMovie =()=>{
   const history = useHistory();
   const [errorLogin, setErrorLogin] = useState(null)

   const onFinish = (values) => {
      const {username, password} = values
      const token = api.checkLogin(username, password)
      
      if(token !== null){
         setErrorLogin(null)
         // luu token vao localStorage - cookie browser
         helper.saveTokenLocalStorage(token)
         // quay vao trang tuy y ( chon trang tim kiem)
         history.push('/search-movies');
      }else{
         setErrorLogin('account invalid')
      }
    };
  
   const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
   return(
      <Row>
         <Col span={12} offset={6}>
            <h1 style={{textAlign: 'center'}}>Login</h1>
            {errorLogin!== null && <p style={{textAlign: 'center',color:'red'}}>{errorLogin}</p>}
            <Form
               name="basic"
               labelCol={{
               span: 8,
               }}
               wrapperCol={{
               span: 16,
               }}
               initialValues={{
               remember: true,
               }}
               onFinish={onFinish}
               onFinishFailed={onFinishFailed}
            >
               <Form.Item
               label="Username"
               name="username"
               rules={[
                  {
                     required: true,
                     message: 'Please input your username!',
                  },
               ]}
               >
               <Input />
               </Form.Item>

               <Form.Item
               label="Password"
               name="password"
               rules={[
                  {
                     required: true,
                     message: 'Please input your password!',
                  },
               ]}
               >
               <Input.Password />
               </Form.Item>
               <Form.Item
               wrapperCol={{
                  offset: 8,
                  span: 16,
               }}
               >
               <Button type="primary" htmlType="submit">
                  Submit
               </Button>
               </Form.Item>
            </Form>
         </Col>
      </Row>
   )
}
export default React.memo(LoginMovie)