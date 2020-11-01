import React, { useState } from 'react';
import { connect } from 'react-redux';

import { setCurPage } from 'src/redux/actions/main';

const Head = ({ cur_page, setCurPage }) => {

  const butts = [
    {
      status: 0,
      title: 'To read'
    },
    {
      status: 1,
      title: 'In progress'
    },
    {
      status: 2,
      title: 'Done'
    }
  ];

  let count = 0;

  return <div className='head-container'>
    {
      butts.map((el,i) => {
        return <div key={i + 'item'} onClick={(ev) => {
          ev.preventDefault();
          setCurPage(el.status)
        }} className={`head-item ${ el.status === cur_page ? 'current' : ''}`}><span>{el.title} ({count})</span></div>
      })
    }

  </div>
};

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    cur_page: state.main.cur_page
  }
}

const mapDispatchToProps = { setCurPage }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Head);