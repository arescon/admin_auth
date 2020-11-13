import React, { useEffect, useState } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import qs from 'query-string';
import _ from 'lodash';

import { Layout, Menu, Icon } from 'antd';
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

import { Get } from 'src/libs/api';
import { setStatusAuth, setMenuUser } from 'src/redux/actions/main';

import HeaderBlock from './header';

import LoginForm from './login';

import MenuPage from './admin/menu';
import Home from './home';

const App = ({
  status_auth, root_menu,
  setStatusAuth, setMenuUser
}) => {

  useEffect(() => {
    if(status_auth !== 2 ) {
      Get('/auth/checkout').then( result => {
        setStatusAuth(2, result.data.data);
      }).catch( error => {
        setStatusAuth(1, {});
      })
    }
  }, [status_auth])

  useEffect(() => {
    if(_.isEmpty(root_menu)) {
      console.log('tut')
      Get('/menu-items', {
        menu: 'osnovnoe_menu_adminki'
      }).then( result => {
        setMenuUser(result.data.data);
      });
    }
  }, [root_menu])

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
                <Link to='/'>Главная</Link>
              </Menu.Item>
              {
                (() => {
                  function renderMenu(parent, separator) {
                    return root_menu.filter(fe => fe.parent === parent).map((el_menu, i_item) => {
                      let child = root_menu.filter(fe => fe.parent === el_menu.id);
                      if(_.isEmpty(child)) {
                        return <Menu.Item key={i_item+separator}>
                            <Link to={'/' + el_menu.url}>{el_menu.title}</Link>
                          </Menu.Item>
                      } else {
                        return <SubMenu
                            key={i_item+separator}
                            title={el_menu.title}
                          >
                            {renderMenu(el_menu.id, separator + '-' )}
                          </SubMenu>
                      }
                    })
                  };
                  return renderMenu(0, '-');
                })()
              }
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
    status_auth: state.main.status_auth,
    root_menu: state.main.root_menu
  }
}

const mapDispatchToProps = { setStatusAuth, setMenuUser }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);