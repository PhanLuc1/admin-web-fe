import React, { useState } from "react";
import { ProTable } from "@ant-design/pro-table";
import axios from "axios";
import apiService from "../../services/api";

const Users = () => {
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
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            valueType: "digit", // Sử dụng trong form search
        },
    ];

    const buildJHipsterFilters = (params) => {
        const filters = {};

        // Nếu có "name", thêm bộ lọc chứa "contains"
        if (params.name) {
            filters["name.contains"] = params.name;
        }

        if (params.id) {
            filters["id.equals"] = params.id;
        }

        // Nếu có "amount", thêm bộ lọc equals
        if (params.amount) {
            filters["amount.equals"] = params.amount;
        }

        // Thêm các bộ lọc khác nếu cần
        return filters;
    };

    return (
        <ProTable
            columns={columns}
            request={async (params) => {
                try {
                    // Xây dựng bộ lọc JHipster
                    const filters = buildJHipsterFilters(params);

                    const response = await apiService.get("products", {
                        page: params.current - 1,
                        size: params.pageSize,
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
            headerTitle="Product List"
        />
    );
};

export default Users;
