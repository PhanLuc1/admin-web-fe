import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apiService from "../../services/api";
import { Form, Input, Button, InputNumber } from 'antd';

const EditBillPage = () => {
    const { id } = useParams();
    const [bill, setBill] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            apiService.get(`/bills/${id}`).then((res) => {
                setBill(res.data);
            }).catch(err => console.log(err));
        }
    }, [id]);


    const [form] = Form.useForm();

    const onFinish = (values) => {
        apiService.put(`/bills/${id}`, {...values, entity3s: bill.entity3s, locations: bill.locations, id: id })
            .then(() => {
                // Navigate back to list or detail view after successful update
                navigate(`/bills/${id}`);
            })
            .catch(err => console.error("Failed to update bill:", err));
    };

    if (!bill) return <p>Bill not found</p>;

    // Initialize form with current bill data
    form.setFieldsValue({
        name: bill.name,
        total: bill.total,
        entity3sId: bill.entity3s[0].id
    });

    return <div className="container p-4">
            <h2>Edit Bill {id}</h2>
            <Form
                form={form}
                name="edit_bill"
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input the bill name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Total"
                    name="total"
                    rules={[{ required: true, message: 'Please input the total!' }]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        step={0.01}
                        min={0}
                    />
                </Form.Item>

                {/*<Form.Item*/}
                {/*    label="Entity"*/}
                {/*    name="entity3sId"*/}
                {/*    rules={[{ required: true, message: 'Please select an entity!' }]}*/}
                {/*>*/}
                {/*    <Input readOnly value={bill.entity3s[0].id} />*/}
                {/*</Form.Item>*/}

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>
        </div>
}

export default EditBillPage;