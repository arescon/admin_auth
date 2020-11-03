import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import { Col, Table, Button, Divider, Popconfirm } from 'antd';

const DataMenu = [
  {
    func_name: "menusettings",
    id: 19,
    parent: 20,
    title: "Меню",
    url: "/setting_menu",
    order_by: 0
  },
  {
    func_name: "menusettings",
    id: 18,
    parent: null,
    title: "Менюs",
    url: "/setting_menu",
    order_by: 0
  },
  {
    func_name: "menusettings",
    id: 20,
    parent: null,
    title: "Меню",
    url: "/setting_menu",
    order_by: 0
  }
];

const AdminPage = () => {
  const [menuData, setMenuData] = useState([])
  const handleDelete = () => {
    alert('delete')
  };
  const setOne = () => {
    alert('set one')
  };

  useEffect(()=> {
    if(_.isEmpty(menuData)) {
      let menu = DataMenu, _menu;
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
      _menu = child(null);
      console.log(_menu)
      setMenuData(_menu);
    };
  }, [menuData]);
  
  return <>
    <Col span={24}>
      <h3>Настройка меню</h3>
    </Col>
    <Col span={24}>
      <Button className='new-btn-pages'>Добавить</Button>
    </Col>
    <Col span={24}>
      <Table
        size='small'
        dataSource={_.filter(menuData, x => x.parent === null)}
        scroll={{ x: 1 }}
        columns={
          [
            {
              title: 'Название',
              dataIndex: 'title',
              key: 'id',
            },
            {
              title: 'Ссылка',
              dataIndex: 'url',
            },
            {
              title: 'Action',
              render: (text, record) => (
                <span>
                  <a onClick={() => setOne(record, record) }>Ред.</a>
                  <Divider type="vertical" />
                  <Popconfirm
                    title="Вы уверены?"
                    okText="Да"
                    cancelText="Нет"
                    onConfirm={() => handleDelete(record)}
                  >
                    <a style={{ color: 'red' }}>Удалить</a>
                  </Popconfirm>
                </span>
              ),
            },
          ]
        }
      />
    </Col>
  </>
};

export default AdminPage;