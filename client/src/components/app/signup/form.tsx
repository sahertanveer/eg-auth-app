import React, { useState } from 'react';
import { Form, Row, Col } from 'antd';
import { SignupFormProps } from './types';
import CustomInput from '../../global/input';
import CustomButton from '../../global/button';
import { inputFields } from './fields';

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Form onFinish={onSubmit}>
      {inputFields?.map((field) => (
        <Row className={`auth_form_item`} key={field.name}>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <h6
              className={`required-label ${
                field.rules ? 'required-field' : ''
              }`}
            >
              {field.label}
            </h6>
          </Col>
          <Col xs={24} sm={24} md={17} lg={17} xl={17}>
            <Form.Item
              name={field.name}
              rules={field.rules.map((rule: any) => rule)}
              key={field.name}
            >
              <CustomInput {...field} onChange={(e) => handleChange(e)} />
            </Form.Item>
          </Col>
        </Row>
      ))}
      <Row className="auth_form_item">
        <Col xs={24} sm={24} md={8} lg={8} xl={8} offset={8}>
          <Form.Item>
            <CustomButton
              type="primary"
              htmlType="submit"
              className="btn btn-primary"
            >
              Sign Up
            </CustomButton>
          </Form.Item>
        </Col>
      </Row>
      <Row className="auth_form_item">
        <Col xs={24} sm={24} md={16} lg={12} xl={12} offset={12}>
          <a className="justify-content-end text-white" href="/">
            Already have an account?
          </a>
        </Col>
      </Row>
    </Form>
  );
};

export default SignupForm;
