import React, { useContext } from 'react';
import { Button, Form, Input } from 'antd';
import apiService from "../../services/api";
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';  // Import AuthContext

const Login = () => {
    const navigate = useNavigate();
    const { setIsAuth, setAuthorities } = useContext(AuthContext);  // Access setIsAuth and setAuthorities

    // Handle the form submission
    const onFinish = (values) => {
        apiService.post('authenticate', { ...values }).then((res) => {
            // Store the token in local storage
            localStorage.setItem("token", res.data.id_token);

            // Fetch user details after successful login
            apiService.get('account').then((userRes) => {
                // Set authentication state in context
                setIsAuth(true);
                setAuthorities(userRes.authorities || []);  // Ensure the authorities are an array

                // Navigate to the home page
                navigate('/home');
            }).catch((err) => {
                // Handle any errors fetching user data
                console.error("Failed to fetch user details", err);
            });
        }).catch((err) => {
            // Handle login failure
            console.error("Login failed", err);
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
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
                    }
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;
