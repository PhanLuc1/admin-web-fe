import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import apiService from "../../services/api";
import {Button, Typography} from "antd";

const BillPage = () => {
    const {id} = useParams();
    const [bill, setBill] = useState(null);
    const { Title } = Typography;

    useEffect(() => {
        if(id) {
            apiService.get(`/bills/${id}`).then((res) => {
                setBill(res.data);
            }).catch(err => console.log(err));
        }
    }, [id]);

    if(!bill) return <p>Bill not found</p>;

        return <div className="container p-4">
            <Title level={3}>Bill {id}</Title>
            <div className="flex flex-col gap-2 mb-2">
                <p>Name: {bill.name}</p>
                <p>Total: {bill.total}</p>
                <p>Entity: {bill.entity3s[0].id}</p>
            </div>
            <div className="flex gap-2">
                <Link to={`/bills/${id}/edit`}>
                    <Button type="primary" htmlType="button">
                        Edit
                    </Button>
                </Link>
                <Button color="danger" variant="filled" htmlType="button">
                    Delete
                </Button>
            </div>
        </div>
}
export default BillPage;