import React, { useEffect, useState } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import qs from 'query-string';

import { Layout, Menu, Icon } from 'antd';
const { Content, Footer, Sider } = Layout;

import { Get } from 'src/libs/api';
import { setStatusAuth } from 'src/redux/actions/main';

import HeaderBlock from './header';

import LoginForm from './login';

import MenuPage from './admin/menu';
import Home from './home';

const App = ({ status_auth, setStatusAuth }) => {

  useEffect(() => {
    if(status_auth !== 2 ) {
      Get('/auth/checkout').then( result => {
        setStatusAuth(2, result.data.data);
      }).catch( error => {
        setStatusAuth(1, {});
      })
    }
  }, [status_auth])

  switch (status_auth) {
    case 1:
      return <LoginForm />
      break;
    case 2:
      return <Layout>
          <Sider
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
            }}
          > 
            <Menu
              mode="inline"
              theme="dark"
            >
              <Menu.Item>
                Главная
              </Menu.Item>
              <Menu.Item>
                <Link to='/menu'>Настройка меню</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <HeaderBlock />
            <Content className='content-portal-admin'>
              <Switch>
                <Route path='/' component={Home} exact />
                {/* admin routes */}
                <Route path='/menu' component={MenuPage} exact />
                <Redirect to='/' />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      break;
    default:
      return <>Loading</>;
      break;
  }
};

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    status_auth: state.main.status_auth
  }
}

const mapDispatchToProps = { setStatusAuth }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);