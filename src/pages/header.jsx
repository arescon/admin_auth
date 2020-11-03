import React from 'react';
import { connect } from 'react-redux';
import { Layout, Button, Popconfirm, PageHeader } from 'antd';
import { PoweroffOutlined, SettingOutlined } from '@ant-design/icons';
import _ from 'lodash';

const { Header, Content, Footer } = Layout;

import { setStatusAuth } from 'src/redux/actions/main';

import { Post } from 'src/libs/api';

const HeaderBlock = ({ user, setStatusAuth }) => {
  const handleLogOut = () => {
    Post('/auth/logout').then((res) => setStatusAuth(false))
  };
  console.log(user);
  return <PageHeader style={{
      padding: '0px 10px 7px 0px',
      height: 'auto',
      borderBottom: '4px solid rgb(76 76 76)',
      background: 'white'
    }}
    extra={[
      <span style={{
        marginTop: '1px',
        color: '#4e4e4e',
        verticalAlign: '-2px'
      }} key='ex_1'>{
        !_.isEmpty(user) ? `${user.fam} ${user.im}` : ''
      }</span>,
      <Button
        key='ex_2'
        icon={<SettingOutlined />}
        type='link'
        placeholder='Log out'
      />,
      <Popconfirm
        key='ex_3'
        placement="bottomRight"
        title="Вы хотите выйти？"
        okText="Да"
        onConfirm={handleLogOut}
        cancelText="Нет"
      >
        <Button
          icon={<PoweroffOutlined/>}
          className='log-out-button'
          type='link'
          placeholder='Log out'
        />
      </Popconfirm>
    ]}
  />
};


const mapStateToProps = (state /*, ownProps*/) => {
  return {
    status_auth: state.main.status_auth,
    user: state.main.user,
  }
}

const mapDispatchToProps = { setStatusAuth }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderBlock);