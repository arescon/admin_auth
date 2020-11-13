import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import {
  Col, Spin, Menu, Dropdown,
  Form, Input, Typography,
  Table, Modal, Button, Divider,
  Popconfirm, notification, Row, Select
} from 'antd';

const { Title } = Typography;

import { Get, Put, Post, Delete } from 'src/libs/api';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const AdminPage = () => {
  const [ready, setReady] = useState(false);
  const [readyOne, setReadyOne] = useState(false);
  
  const [menuData, setMenuData] = useState([]);
  const [one, setOne] = useState({});
  const [openOne, setOpenOne] = useState(false);
  const [loadingOne, setLoadingOne] = useState(false);

  const [menuItems, setMenuItems] = useState([]);
  const [oneItem, setOneItem] = useState({});
  const [openOneItem, setOpenOneItem] = useState(false);
  const [loadingOneItem, setLoadingOneItem] = useState(false);

  const [formOne] = Form.useForm();
  const [formOneItem] = Form.useForm();

  const handleSetOne = (dataOne) => {
    setLoadingOne(false);
    setOne(dataOne);
    setMenuItems([]);
    setOpenOne(!openOne);
  };

  const handleNewOne = () => {
    setLoadingOne(false);
    setOne({});
    setOpenOne(!openOne);
  };

  const handleDeleteOne = (id_menu) => {
    Delete('/menu', id_menu).then( res => {
      setMenuData([]);
      setReady(false)
    }).catch( err => {
      notification['error']({
        message: 'Ошибка',
        description:
          'Ошибка на стороне сервера: menuDelSrvError',
      });
    });
  };

  const handleOk = () => {
    let updOne = formOne.getFieldsValue();
    if(one.id) {
      updOne.id = one.id;

      setLoadingOne(true);
      
      Put('/menu', updOne ).then( res => {
        setMenuData([]);
        setReady(false);
        setOpenOne(!openOne);
      }).catch( err => {
        notification['error']({
          message: 'Ошибка',
          description:
            'Ошибка на стороне сервера: menuUpdSrvError',
        });
      }).finally( () => {
        setLoadingOne(false);
      });
    } else {
      setLoadingOne(true);
      
      Post('/menu', updOne ).then( res => {
        setMenuData([]);
        setReady(false);
        setOpenOne(!openOne);
      }).catch( err => {
        notification['error']({
          message: 'Ошибка',
          description:
            'Ошибка на стороне сервера: menuNewSrvError',
        });
      }).finally( () => {
        setLoadingOne(false);
      });
    }
  };

  const handleCancel = () => {
    setOpenOne(!openOne);
    setOne({});
  };

  // внутри модалки, ссылки (форма, модалка, таблица)

  const handleSetOneItem = (dataOneItem) => {
    setOneItem(dataOneItem);
    setOpenOneItem(!openOneItem);
    setLoadingOneItem(false);
  };

  const handleNewChildItem = (one_item) => {
    let newItem = {};
    newItem.parent = one_item.id
    setOneItem(newItem);
    setLoadingOneItem(false);
    setOpenOneItem(true);
  };

  const handleNewOneItem = () => {
    setLoadingOneItem(false);
    setOneItem({});
    setOpenOneItem(true);
  };

  const handleDeleteOneItem = (id_menu_item) => {
    Delete('/menu-items', id_menu_item).then( () => {
      setMenuItems([]);
      setReadyOne(!readyOne)
    }).catch( () => {
      notification['error']({
        message: 'Ошибка',
        description:
          'Ошибка на стороне сервера: menuDelItemsSrvError',
      });
    }).finally( () => {
      setLoadingOne(false);
    });;
  };

  const handleOkItem = () => {
    let updOneItem = formOneItem.getFieldsValue();
    updOneItem.menu = one.name;
    if(oneItem.id) {
      updOneItem.id = oneItem.id;

      setLoadingOneItem(true);
      
      Put('/menu-items', updOneItem ).then( res => {
        setMenuItems([]);
        setReadyOne(!readyOne);
        setOpenOneItem(!openOneItem);
      }).catch( err => {
        notification['error']({
          message: 'Ошибка',
          description:
            'Ошибка на стороне сервера: menuItemUpdSrvError',
        });
      }).finally( () => {
        setLoadingOneItem(false);
      });
    } else {
      setLoadingOneItem(true);
      
      Post('/menu-items', updOneItem ).then( res => {
        setMenuItems([]);
        setReadyOne(!readyOne);
        setOpenOneItem(!openOneItem);
      }).catch( () => {
        notification['error']({
          message: 'Ошибка',
          description:
            'Ошибка на стороне сервера: menuItemNewSrvError',
        });
      }).finally( () => {
        setLoadingOneItem(false);
      });
    }
  };

  const handleCancelItem = () => {
    setOneItem({});
    setOpenOneItem(!openOneItem);
  };

  useEffect(()=> {
    if(_.isEmpty(menuData)) {
      Get('/menu').then( result => {
        let menu = result.data.data;
        setMenuData(menu);
      }).finally( () => {
        setReady(true);
      });
    };
  }, [ready]);

  useEffect(()=> {
    formOne.resetFields();
    if(_.isEmpty(menuItems) && !_.isEmpty(one)) {
      Get('/menu-items', {
        menu: one.name
      }).then( result => {
        let menu = result.data.data, _menu;
        function child(parent) {
          return _.filter(menu, x => {
            if(x.parent === parent) {
              let _t = child(x.id);
              x.key = x.id;
              !_.isEmpty(_t) ? x.children = _t : null;
              return x;
            }
          });
        };
        _menu = child(0);
        setMenuItems(_menu);
      });
    };
  }, [one, readyOne]);

  useEffect(() => {
    formOneItem.resetFields();
  }, [oneItem]);

  return <>
    <Col span={24}>
      <h3>Настройка меню</h3>
    </Col>
    <Col span={24}>
      <Button onClick={handleNewOne} className='new-btn-pages'>Добавить</Button>
    </Col>
    <Col span={24}>
      <Table
        size='small'
        dataSource={menuData}
        scroll={{ x: 1 }}
        rowKey='id'
        columns={
          [
            {
              title: 'Название',
              dataIndex: 'title',
              key: 'title',
            },
            {
              title: 'Кодовое слово',
              dataIndex: 'name',
            },
            {
              title: 'Приложение',
              dataIndex: 'pril',
            },
            {
              title: 'Действия',
              render: (text, record) => (
                <span>
                  <a style={{ color: '#1890ff' }} onClick={() => handleSetOne(record) }>Ред.</a>
                  <Divider type="vertical" />
                  <Popconfirm
                    title="Вы уверены?"
                    okText="Да"
                    cancelText="Нет"
                    onConfirm={() => handleDeleteOne(record)}
                  >
                    <a style={{ color: 'red' }}>Удалить</a>
                  </Popconfirm>
                </span>
              ),
            },
          ]
        }
      />
    {
      openOne ?
      <Modal
        title="Редактирование меню"
        width={1024}
        visible={openOne}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {
          loadingOne ? <Spin className='spin-loader-modal' size="large" /> : null
        }
        <Form
          {...layout}
          form={formOne}
          initialValues={_.isEmpty(one) ? {} : one}
        >
          <Form.Item label='Название' name='title' >
            <Input type='text' placeholder="Название" />
          </Form.Item>

          <Form.Item type='text' label='Кодовое слово' name='name' >
            <Input type='text' disabled={!_.isEmpty(one)} placeholder="Кодовое слово"/>
          </Form.Item>

          <Form.Item label='Приложение' name='pril' >
            <Input disabled={!_.isEmpty(one)} placeholder="Приложение"/>
          </Form.Item>
        </Form>
        <Divider/>
        {
          one.id ? <Row>
            <Col span={24}>
              <Row>
                <Col span={12}>
                  <Title level={4}>Ссылки</Title>
                </Col>
                <Col span={12}>
                  <Button
                    style={{ float: 'right' }}
                    className='new-btn-pages'
                    onClick={handleNewOneItem}
                  >Добавить</Button>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Table
                size='small'
                dataSource={_.sortBy(_.filter(menuItems, x => x.parent === 0), ['orderby'])}
                scroll={{ x: 1 }}
                rowKey='id'
                columns={
                  [
                    {
                      title: '#',
                      dataIndex: 'id',
                      key: 'id',
                    },
                    {
                      title: 'Название',
                      dataIndex: 'title',
                      key: 'title',
                    },
                    {
                      title: 'Ссылка',
                      dataIndex: 'url',
                    },
                    {
                      title: 'Действия',
                      align: 'right',
                      render: (text, record) => (
                        <>
                          <a style={{ color: '#1890ff' }} onClick={() => handleNewChildItem(record)}>Новый подпункт</a>
                          <Divider type="vertical" />
                          <a style={{ color: '#1890ff' }} onClick={() => handleSetOneItem(record) }>Ред.</a>
                          <Divider type="vertical" />
                          <Popconfirm
                            title="Вы уверены?"
                            okText="Да"
                            cancelText="Нет"
                            onConfirm={() => handleDeleteOneItem(record)}
                          >
                            <a style={{ color: 'red' }}>Удалить</a>
                          </Popconfirm>
                        </>                     
                      ),
                    },
                  ]
                }
              />
            </Col>
          </Row> : null
        }
        
        {
          openOneItem ?
            <Modal
              title="Редактирование пункта меню"
              visible={openOneItem}
              onOk={handleOkItem}
              onCancel={handleCancelItem}
            >
              {
                loadingOneItem ? <Spin className='spin-loader-modal' size="large" /> : null
              }
              <Form
                {...layout}
                form={formOneItem}
                initialValues={_.isEmpty(oneItem) ? {} : oneItem}
              >
                <Form.Item label='Название' name='title' >
                  <Input type='text' placeholder="Название" />
                </Form.Item>

                <Form.Item type='text' label='Ссылка' name='url' >
                  <Input
                    type='text'
                    // disabled={!!oneItem.id}
                    placeholder="Ссылка"
                  />
                </Form.Item>

                <Form.Item type='text' label='Родитель' name='parent' >
                  <Select
                    allowClear
                    placeholder="Родитель"
                    onChange={(el) => console.log(el)}
                  >
                    <option key='s' value={0}>Корневой</option>
                    {
                      menuItems.map((el, i) => {
                        if(el.children) {
                          const childRender = (childItems, separator) => {
                            return childItems.map((el_child, i_child) => {
                              if(el_child.children) {
                                return [
                                  <option
                                    key={i+separator+i_child}
                                    value={el_child.id}>{separator + ' ' + el_child.title}</option>,
                                  childRender(el_child.children, '-' + separator)
                                ]
                              } else {
                                return <option key={i+separator+i_child} value={el_child.id}>{
                                  separator + ' ' + el_child.title
                                }</option>
                              }
                            });
                          }
                          return <>
                            <option
                              style={{
                                borderTop: '1px solid #dcdcdc'
                              }}
                              key={i}
                              value={el.id}
                            >{el.title}</option>
                            { childRender(el.children, '-') }
                          </>
                        } else {
                          return <option
                            style={{
                              borderTop: '1px solid #dcdcdc'
                            }}
                            key={i}
                            value={el.id}
                          >{el.title}</option>
                        }
                      })
                    }
                  </Select>
                </Form.Item>
              </Form>
            </Modal>
          : null }
      </Modal>
    : null }
    </Col>
  </>
};

export default AdminPage;