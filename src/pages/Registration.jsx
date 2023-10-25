import React, { useState } from "react";
import {
  Steps,
  Button,
  Form,
  Input,
  Upload,
  Select,
  Row,
  Col,
  Table,
  Image
} from "antd";
import axios from "axios";
import Swal from 'sweetalert2';
import { UploadOutlined } from "@ant-design/icons";

const { Step } = Steps;
const { Option } = Select;

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({}); // Store form data

  const nextStep = () => {
    form.validateFields().then((values) => {
      setFormData((prevData) => ({ ...prevData, ...values }));
      setCurrentStep(currentStep + 1);
    });
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const steps = [
    {
      title: "Step 1",
      content: <Step1 form={form} onNext={nextStep} />,
    },
    {
      title: "Step 2",
      content: <Step2 form={form} onPrev={prevStep} formData={formData} />,
    },
  ];

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
      <h1
        style={{ fontSize: "24px", marginBottom: "20px", textAlign: "center" }}
      >
        <h4 style={{color:"#ac2c2c"}} className="animate__animated animate__backInDown">Philippine Motorcycle Tourism Registration Form</h4>
      </h1>
      <div
      className="animate__animated animate__fadeIn"
        style={{
          width: "50%",
          padding: "20px",
          borderRadius: "20px",
          boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.5)'
        }}
      >
        <Steps current={currentStep}>
          {steps.map((step) => (
            <Step key={step.title} title={step.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[currentStep].content}</div>
      </div>
    </div>
  );
};

const Step1 = ({ form, onNext }) => {
  const onFinish = (values) => {
    console.log("Step 1 values:", values);
    onNext(); // Proceed to the next step
  };
  const [fileList, setFileList] = useState([]);
  
  const handleLogoChange = ({ fileList }) => {
    setFileList(fileList);
  };
  
  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  return (
    <Form
      form={form}
      onFinish={onFinish}
      style={{ marginTop: "20px" }}
      layout="vertical"
    >
      <Form.Item
      className="animate__animated animate__backInLeft"
        name="logo"
        label="Upload Logo of the Organization"
        rules={[{ required: true, message: "Please upload logo" }]}
      >
   
   <Upload
        customRequest={dummyRequest}
        fileList={fileList}
        onChange={handleLogoChange}
        listType="picture-card"
      >
        {fileList.length >= 1 ? null : (
          <div className="myBorderBlack" >
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>Click to Upload</div>
          </div>
        )}
      </Upload>


      </Form.Item>

      <Form.Item
      className="animate__animated animate__backInRight"
        name="organizationName"
        label="Organization Name"
        rules={[
          { required: true, message: "Please enter the organization name" },
        ]}
      >
        <Input className="myBorderBlack" size="small" />
      </Form.Item>

      <Form.Item
      className="animate__animated animate__backInLeft"
        name="eventDetails"
        label="Event Details"
        rules={[{ required: true, message: "Please enter the event details" }]}
      >
        <Input.TextArea className="myBorderBlack" size="small" />
      </Form.Item>

      <Form.Item
      className="animate__animated animate__backInRight"
        name="dateTime"
        label="Date and Time"
        rules={[{ required: true, message: "Please enter the date and time" }]}
      >
        <Input type="datetime-local" className="myBorderBlack" size="small" />
      </Form.Item>
      <Form.Item
      className="animate__animated animate__backInLeft"
        name="locationEvent"
        label="Event Location"
        rules={[{ required: true, message: "Please enter event location" }]}
      >
        <Input type="text" className="myBorderBlack" size="small" />
      </Form.Item>

      <Button type="primary" htmlType="submit" style={{background:"#2b4172"}}>
        Next
      </Button>
    </Form>
  );
};

const Step2 =  ({ form, onPrev, formData }) => {
  const onFinish = async (values) => {
    const combinedData = { ...formData, ...values };
    //console.log("Combined values:", combinedData);
    const data = {
      Name:combinedData.name,
      Email:combinedData.email,
      Religion:combinedData.religion,
      Address:combinedData.address,
      OrganizationName:combinedData.organizationName,
      ContactNumber:combinedData.contactNumber
    }
    try {
      const response = await axios.post('http://localhost:3031/listregistration', data);
      if(response.data){
        Swal.fire({
          title:'Successfully Submit Registration!',
          text:'Please click ok!',
          icon:'success',
          allowOutsideClick: false              
        }
        ).then(()=>{
        form.resetFields();
        window.location.reload()
        })
      }
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };


  return (
    <div>
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
          <Col span={12} className="gutter-row">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter your name" }]}
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

        <Form.Item name="address" label="Address">
          <Input.TextArea className="myBorderBlack" size="small" />
        </Form.Item>

        <Form.Item name="religion" label="Religion">
          <Input className="myBorderBlack" size="small" />
        </Form.Item>

        <Form.Item name="emergencyContact" label="Emergency Contact No.">
          <Input type="number" className="myBorderBlack" size="small" />
        </Form.Item>

        <Form.Item name="bloodType" label="Blood Type">
          <Input className="myBorderBlack" size="small" />
        </Form.Item>

        <Form.Item name="tshirtSize" label="T-Shirt Size">
          <Input className="myBorderBlack" size="small" />
        </Form.Item>

        <Form.Item name="driverLicense" label="Submit Driver License Photo">
          <Upload beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item name="paymentPhoto" label="Submit Payment Photo">
          <Upload beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item name="comments" label="Comment Box">
          <Input.TextArea className="myBorderBlack" size="small" />
        </Form.Item>

        <h3>
          <b>Motorcycle Details</b>
        </h3>
        <Form.Item name="motorcycleBrand" label="Motorcycle Brand">
          <Input className="myBorderBlack" size="small" />
        </Form.Item>

        <Form.Item name="motorcycleModel" label="Motorcycle Model">
          <Input className="myBorderBlack" size="small" />
        </Form.Item>

        <Form.Item name="motorcycleYear" label="Motorcycle Year">
          <Input className="myBorderBlack" size="small" />
        </Form.Item>

        <Form.Item name="motorcycleColor" label="Motorcycle Color">
          <Input className="myBorderBlack" size="small" />
        </Form.Item>

        <Form.Item name="plateNumber" label="Plate Number or MV File">
          <Input className="myBorderBlack" size="small" />
        </Form.Item>

        <Form.Item name="category" label="Choose Category">
          <Select
            className="myBorderBlack"
            size="small"
            style={{ borderRadius: "8px" }}
          >
            <Option value="single">Single</Option>
            <Option value="groupFive">Group of Five</Option>
            <Option value="groupTen">Group of Ten</Option>
          </Select>
        </Form.Item>

        <Button style={{ marginRight: 8 }} onClick={onPrev}>
          Previous
        </Button>
        <Button type="primary" htmlType="submit" style={{background:"#2b4172"}}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Registration;