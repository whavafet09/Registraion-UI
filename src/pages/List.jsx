import { Button, Table } from "antd";
import { useState,useEffect } from "react";
import axios from "axios";
export default function List() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
      }, []);
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3031/listregistration');
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  const columns = [
    {
      title: "Organization Name",
      dataIndex: "OrganizationName",
      key: "organizationName",
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Contact Number",
      dataIndex: "ContactNumber",
      key: "ContactNumber",
    },
    {
      title: "Religion",
      dataIndex: "Religion",
      key: "Religion",
    },
    {
      title: "Address",
      dataIndex: "Address",
      key: "Address",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => <Button type="link">View Details</Button>,
    },
  ];
  return (
    <>
      <h3>List Registration Here</h3>
      <div>
        <div>
          <br></br>
          <Table columns={columns} dataSource={data} rowKey="id" />
        </div>
      </div>
    </>
  );
}
