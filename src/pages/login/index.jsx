import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Layout, Card, Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;

const { Title } = Typography;

import { setCurPage } from 'src/redux/actions/main';

import { Post } from 'src/libs/api';

const LoginForm = () => {

  const handleSubmit = (values) => {
    // http://localhost:3000/auth/login
    console.log(values)
    Post('/auth/login', values).then(result => {
      console.log(result);
    }).catch(error => {
      console.log(error)
    })
  };

  const handleChange = (changedValues, allValues) => {
    // console.log(changedValues, allValues)
  };

  return <div className='login-form'>
  <Row gutter={4}>
    <Col span={6}>
      <Card>
        Logo
      </Card>
    </Col>
    <Col span={18}>
      <Card>
        Единая система авторизации ТувГУ
      </Card>
    </Col>
  </Row>
  <Row gutter={4} style={{ marginTop: '3px' }}>
    <Col span={24}>
      <Card>
        <Row gutter={15}>
          <Col span={24}>
            <Form
              onValuesChange={handleChange}
              onFinish={handleSubmit}
            >
              <Form.Item>
                <Title level={4}>Войти</Title>
              </Form.Item>
              <Form.Item
                name='login'
                hasFeedback
                rules={[{
                  required: true,
                  message: 'Пожалуйста введите логин'
                }]}
              >
                <Row>
                  <Col span={6}>
                    <Title level={5}>Логин</Title>
                  </Col>
                  <Col span={18}>
                    <Input
                      prefix={
                        <UserOutlined />
                      }
                      placeholder="Логин"
                    />
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item
                name='password'
                hasFeedback
                rules={[{
                  required: true,
                  message: 'Пожалуйста введите пароль'
                }]}
              >
                <Row>
                  <Col span={6}>
                    <Title level={5}>Пароль</Title>
                  </Col>
                  <Col span={18}>
                    <Input
                      type='password'
                      prefix={
                        <LockOutlined />
                      }
                      placeholder="Пароль"
                    />
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item>
                <Row>
                  <Col span={12}>
                    <Checkbox style={{ marginLeft: '25px' }}>
                      Запомнить меня
                    </Checkbox>
                  </Col>
                  <Col span={12}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: '100%' }}
                    >
                      Войти
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </Col>
  </Row>
</div>
};

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    cur_page: state.main.cur_page
  }
};

const mapDispatchToProps = { setCurPage };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);