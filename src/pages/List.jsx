import { Button, Table, Modal, Image, Row, Col } from "antd";
import { useState, useEffect } from "react";
import UserService from "../services/user.service";
import axios from "axios";
export default function List() {
  const { GetAllRegister } = UserService();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await GetAllRegister();
      setData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response.data.status);
        console.log(error.response.data.errors);
      }
    }
  };
  const columns = [
    {
      title: "Organization Name",
      dataIndex: "OrganizationName",
      key: "organizationName",
      render: (_, record) => record.user.event.organization.name,
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      render: (_, record) => record.user.fullName,
    },
    {
      title: "Contact Number",
      dataIndex: "ContactNumber",
      key: "ContactNumber",
      render: (_, record) => record.user.contact,
    },
    {
      title: "Religion",
      dataIndex: "Religion",
      key: "Religion",
      render: (_, record) => record.user.religion,
    },
    {
      title: "Address",
      dataIndex: "Address",
      key: "Address",
      render: (_, record) => record.user.address,
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      render: (_, record) => record.user.email,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => ViewDetailsHandler(record)}>
          View Details
        </Button>
      ),
    },
  ];

  const ViewDetailsHandler = (value) => {
    setOpen(true);
    console.log(value);
    setDetails(value);
  };
  return (
    <>
      <h3>List Registration Here</h3>
      <div>
        <div>
          <br></br>
          <Table columns={columns} dataSource={data} rowKey="id" />
        </div>
        <div>
          <Modal
            title="Details"
            centered={false}
            open={open}
            onCancel={() => setOpen(false)}
            width={1000}
            maskClosable={false}
            okText={""}
            cancelText="close"
          >
            {/* <label>Full Name:</label> {details && details.user && details.user.fullName} */}
            <Row>
              <Col span={12} className="gutter-row">
                <h3>Basic Information</h3>

                <p>
                  <label>Full Name:</label>{" "}
                  {details && details.user && details.user.fullName}
                </p>
                <p>
                  <label>Address:</label>{" "}
                  {details && details.user && details.user.address}
                </p>
                <p>
                  <label>Contact Number:</label>{" "}
                  {details && details.user && details.user.contact}
                </p>
                <p>
                  <label>Emegency Contact Number:</label>{" "}
                  {details && details.user && details.user.emergencyContact}
                </p>
                <p>
                  <label>Email:</label>{" "}
                  {details && details.user && details.user.email}
                </p>
                <p>
                  <label>Religion:</label>{" "}
                  {details && details.user && details.user.religion}
                </p>
                <p>
                  <label>Shirt Size:</label>{" "}
                  {details && details.user && details.user.shirtSize}
                </p>
                <br></br>
              </Col>
              <Col span={12} className="gutter-row">
                <h4>Driver License</h4>
                <Image
                  width={200}
                  src={
                    details && details.user && details.user.driverLicensePhoto
                  }
                ></Image>
                <br></br>
                <br></br>
                <h4>Payment Photo</h4>
                <Image
                  width={200}
                  src={details && details.user && details.user.paymentPhoto}
                ></Image>
                <br></br>
              </Col>
            </Row>
            <br></br>
            <hr></hr>

            <h3>Oragnization Info.</h3>
            <p>
              <label>Organization Name:</label>
              {details &&
                details.user &&
                details.user.event &&
                details.user.event.organization.name}
            </p>
            <h4>Organization Logo</h4>
            <Image
              width={200}
              src={
                details &&
                details.user &&
                details.user.event &&
                details.user.event.organization.logo
              }
            ></Image>
            <br></br>
            <hr></hr>
            <h3>Motorcyle Info.</h3>
            <p>
              <label>Brand:</label> {details && details.brand}
            </p>
            <p>
              <label>Color:</label> {details && details.color}
            </p>
            <p>
              <label>Model:</label> {details && details.model}
            </p>
            <p>
              <label>Plate Number:</label> {details && details.plateNumber}
            </p>
            <br></br>
            <hr></hr>
            <h3>Event Info.</h3>
            <p>
              <label>Event Date and Time:</label>{" "}
              {details &&
                details.user &&
                details.user.event &&
                details.user.event.dateTime}
            </p>
            <p>
              <label>Event Details:</label>{" "}
              {details &&
                details.user &&
                details.user.event &&
                details.user.event.detail}
            </p>
            <p>
              <label>Event Location:</label>{" "}
              {details &&
                details.user &&
                details.user.event &&
                details.user.event.location}
            </p>
          </Modal>
        </div>
      </div>
    </>
  );
}
