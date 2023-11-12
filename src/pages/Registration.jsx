//import React, { useState } from "react";
import { Button, Form, Input, Upload, Row, Col, Image } from "antd";
import { useNavigate } from "react-router-dom";
import UserService from "../services/user.service";
import axios from "axios";
import Swal from "sweetalert2";
import { UploadOutlined } from "@ant-design/icons";

//const { Step } = Steps;
//const { Option } = Select;

const Registration = () => {
  //const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  // const [formData, setFormData] = useState({}); // Store form data

  const navigate = useNavigate();
  const { Register } = UserService();
  const onFinish = async (values) => {
    const formDatax = new FormData();
    console.log(values);

    //const combinedData = { ...formData, ...values };

    // formDatax.append(
    //   "Register.OrganizationLogo",
    //   combinedData.logo.fileList[0].originFileObj
    // );
    // formDatax.append(
    //   "Register.OrganizationName",
    //   combinedData.organizationName
    // );
    // formDatax.append("Register.EventDetail", combinedData.eventDetails);
    // formDatax.append("Register.EventDateTime", combinedData.dateTime);
    // formDatax.append("Register.EventLocation", combinedData.locationEvent);

    formDatax.append("Register.ClubName", values.clubName);
    formDatax.append("Register.ClubAddress", values.clubAddress);
    formDatax.append("Register.SocialMediaChannel", values.mediaChannel);
    formDatax.append("Register.FullName", values.name);
    formDatax.append("Register.Email", values.email);
    formDatax.append("Register.Contact", values.contactNumber);
    formDatax.append("Register.Address", values.address);
    formDatax.append("Register.Religion", values.religion);
    formDatax.append("Register.EmergencyContact", values.emergencyContact);
    formDatax.append("Register.BloodType", values.bloodType);
    formDatax.append("Register.ShirtSize", values.tshirtSize);
    formDatax.append("Register.Category", values.category);
    formDatax.append(
      "Register.DriverLicencePhoto",
      values.driverLicense.fileList[0].originFileObj
    );
    formDatax.append(
      "Register.PaymentPhoto",
      values.paymentPhoto.fileList[0].originFileObj
    );
    formDatax.append("Register.Comment", values.comments);
    formDatax.append("Register.MotorcycleBrand", values.motorcycleBrand);
    formDatax.append("Register.MotorcycleModel", values.motorcycleModel);
    formDatax.append("Register.MotorcycleYear", values.motorcycleYear);
    formDatax.append("Register.MotorcycleColor", values.motorcycleColor);
    formDatax.append("Register.PlateNumber", values.plateNumber);

    try {
      Swal.fire({
        title: "Please Wait !",
        text: "This is Automatically Close",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const response = await Register(formDatax);
      if (response.status === 200) {
        Swal.fire({
          title: "Successfully Submit Registration!",
          text: "Please click ok!",
          icon: "success",
          allowOutsideClick: false,
        }).then(() => {
          form.resetFields();
          navigate("/Registration");
        });
      } else {
        Swal.fire({
          title: "Ooops!",
          text: "something went wrong",
          icon: "waring",
          allowOutsideClick: false,
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        //console.log(error.response.data.status);
        Swal.close();
        console.log(error.response.data.errors);
        if (error.response.data.status === 400) {
          alert("Please Fill Up All Fields");
        }
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{ fontSize: "24px", marginBottom: "20px", textAlign: "center" }}
      >
        <div className="imageContainer">
          <Image className="imgResponsive" src="pmtlogo.png"></Image>
          <Image className="imgResponsive" src="sot.png"></Image>
        </div>

        <br></br>
        <br></br>
        <h4
          style={{ color: "black" }}
          className="animate__animated animate__backInDown"
        >
          Registration Form
        </h4>
        <div>
          <b>
            <h5>WHAT: Support our Troops - 3rd Edition</h5>
            <h5>WHEN: December 2, 2023 Saturday 08:00 AM</h5>
            <h5>WHERE: Philippine Military Academy (PMA) Baguio City</h5>
          </b>
        </div>
      </div>

      <div
        className="animate__animated animate__fadeIn"
        style={{
          width: "100%",
          padding: "20px",
          borderRadius: "20px",
          boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Form
          form={form}
          onFinish={onFinish}
          style={{ marginTop: "20px" }}
          layout="vertical"
        >
          <h3>
            <b>Personal Information</b>
          </h3>
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
          >
            <Col span={24} className="gutter-row">
              <Form.Item
                name="clubName"
                label="Club Name"
                rules={[
                  { required: true, message: "Please enter your club name" },
                ]}
              >
                <Input className="myBorderBlack" size="small" />
              </Form.Item>
            </Col>
            <Col span={12} className="gutter-row">
              <Form.Item
                name="clubAddress"
                label="Chapter / Club Address"
                rules={[
                  {
                    required: true,
                    message: "Please enter your chapter / club address",
                  },
                ]}
              >
                <Input className="myBorderBlack" size="small" />
              </Form.Item>
            </Col>
            <Col span={12} className="gutter-row">
              <Form.Item
                name="mediaChannel"
                label="Social Media Name/Channel"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Social Media Name/Channel",
                  },
                ]}
              >
                <Input className="myBorderBlack" size="small" />
              </Form.Item>
            </Col>
            <Col span={12} className="gutter-row">
              <Form.Item
                name="name"
                label="Full Name"
                rules={[
                  { required: true, message: "Please enter your full name" },
                ]}
              >
                <Input className="myBorderBlack" size="small" />
              </Form.Item>
            </Col>
            <Col span={12} className="gutter-row">
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input className="myBorderBlack" size="small" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="contactNumber"
            label="Contact Number"
            rules={[
              { required: true, message: "Please enter your contact number" },
            ]}
          >
            <Input type="number" className="myBorderBlack" size="small" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input.TextArea className="myBorderBlack" size="small" />
          </Form.Item>

          <Form.Item
            name="religion"
            label="Religion"
            rules={[{ required: true, message: "Please enter your religion" }]}
          >
            <Input className="myBorderBlack" size="small" />
          </Form.Item>

          <Form.Item
            name="emergencyContact"
            label="Emergency Contact No."
            rules={[
              {
                required: true,
                message: "Please enter your Emergency Contact No.",
              },
            ]}
          >
            
            <Input type="number" className="myBorderBlack" size="small" />
          </Form.Item>

          <Form.Item
            name="bloodType"
            label="Blood Type"
            rules={[{ required: true, message: "Please enter your bloodType" }]}
          >
            <Input className="myBorderBlack" size="small" />
          </Form.Item>

          <Form.Item
            name="tshirtSize"
            label="T-Shirt Size"
            rules={[
              { required: true, message: "Please enter your tshirtSize" },
            ]}
          >
            <Input className="myBorderBlack" size="small" />
          </Form.Item>

          <Form.Item
            name="driverLicense"
            label="Submit Driver License Photo"
            rules={[
              { required: true, message: "Please enter your driverLicense" },
            ]}
          >
            <Upload beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="paymentPhoto"
            label="Submit Payment Photo"
            rules={[
              { required: true, message: "Please enter your paymentPhoto" },
            ]}
          >
            <Upload beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item name="comments" label="Note for Payment">
            <Input.TextArea className="myBorderBlack" size="small" />
          </Form.Item>

          <h3>
            <b>Motorcycle Details</b>
          </h3>
          <Form.Item
            name="motorcycleBrand"
            label="Motorcycle Brand"
            rules={[
              { required: true, message: "Please enter your motorcycleBrand" },
            ]}
          >
            <Input className="myBorderBlack" size="small" />
          </Form.Item>

          <Form.Item
            name="motorcycleModel"
            label="Motorcycle Model"
            rules={[
              { required: true, message: "Please enter your motorcycleModel" },
            ]}
          >
            <Input className="myBorderBlack" size="small" />
          </Form.Item>

          <Form.Item
            name="motorcycleYear"
            label="Motorcycle Year"
            rules={[
              { required: true, message: "Please enter your motorcycleYear" },
            ]}
          >
            <Input className="myBorderBlack" size="small" />
          </Form.Item>

          <Form.Item
            name="motorcycleColor"
            label="Motorcycle Color"
            rules={[
              { required: true, message: "Please enter your motorcycleColor" },
            ]}
          >
            <Input className="myBorderBlack" size="small" />
          </Form.Item>

          <Form.Item
            name="plateNumber"
            label="Plate Number or MV File"
            rules={[
              { required: true, message: "Please enter your plateNumber" },
            ]}
          >
            <Input className="myBorderBlack" size="small" />
          </Form.Item>

          <Form.Item name="category" label="Other Details">
            <Input className="myBorderBlack" size="small" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            style={{ background: "#2b4172" }}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Registration;
