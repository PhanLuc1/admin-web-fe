import React, { useState } from "react";
import { ProTable } from "@ant-design/pro-table";
import axios from "axios";
import apiService from "../../services/api";
import {Link} from "react-router-dom";
import {Button, Popconfirm} from "antd";

const Bills = () => {
    const [pageSize, setPageSize] = useState(20);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            valueType: "text",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            valueType: "text", // Sử dụng trong form search
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            valueType: "money",
            sorter: true,
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            valueType: "digit", // Sử dụng trong form search
            sorter: true,
        },
        {
            title: "",
            dataIndex: "action",
            key: "action",
            render: (text, record) => <div className="flex gap-2">
                <Link to={`/bills/${record.id}`}>
                    <Button color="primary" variant="outlined" htmlType="button">
                        View
                    </Button>
                </Link>
                <Link to={`/bills/${record.id}/edit`}>
                    <Button type="primary" htmlType="button">
                        Edit
                    </Button>
                </Link>
                <Popconfirm
                    title="Are you sure to delete this bill?"
                    onConfirm={() => handleDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button color="danger" variant="filled" htmlType="button">
                        Delete
                    </Button>
                </Popconfirm>
            </div>
        },
    ];

    const handleDelete = async (id) => {
        try {
            await apiService.delete(`/bills/${id}`);
        } catch (error) {
            console.error("Error deleting bill:", error);
        }
    };

    const buildJHipsterFilters = (params) => {
        const filters = {};

        if (params.name) {
            filters["name.contains"] = params.name;
        }

        if (params.id) {
            filters["id.equals"] = params.id;
        }

        if (params.amount) {
            filters["amount.equals"] = params.amount;
        }

        return filters;
    };

    return (
        <ProTable
            columns={columns}
            request={async (params) => {
                try {
                    // Xây dựng bộ lọc JHipster
                    const filters = buildJHipsterFilters(params);
                    let sort = '';
                    if (params.sort && params.order) {
                        sort = `${params.sort},${params.order === 'ascend' ? 'asc' : 'desc'}`;
                    }

                    const response = await apiService.get("bills", {
                        page: params.current - 1,
                        size: params.pageSize,
                        sort: sort,
                        ...filters, // Thêm bộ lọc vào query params
                    });

                    return {
                        data: response.data,
                        total: parseInt(response.headers["x-total-count"], 10),
                        success: true,
                    };
                } catch (error) {
                    console.error("Error fetching data:", error);
                    return {
                        data: [],
                        total: 0,
                        success: false,
                    };
                }
            }}
            rowKey="id"
            pagination={{
                pageSize: pageSize,
                showSizeChanger: true,
                showQuickJumper: true,
                onShowSizeChange: (_, size) => {
                    setPageSize(size);
                },
            }}
            search={{
                labelWidth: "auto",
            }}
            dateFormatter="string"
            headerTitle="Bill List"
        />
    );
};

export default Bills;
