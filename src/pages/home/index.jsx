import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import qs from 'query-string';


const HomePage = () => {
  return <>Home page</>
};

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    cur_page: state.main.cur_page
  }
}

const mapDispatchToProps = {  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);