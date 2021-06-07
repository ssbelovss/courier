import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { initializeApp } from '../reducers/app/actions'
import { appMapStateToProps } from '../reducers/app'

import Footer from '../main/footer'
import Header from '../main/header'

import AppMap from '../main/map'
import AppMachine from '../main/machine'
import AppMachineAdd from '../main/machine/add'
import AppMachineChange from '../main/machine/change.js'
import Popup from '../elements/popup'

import '../css/index.scss';

class _App extends React.Component{
  componentDidMount(){
    this.props.initializeApp();
  }

  componentDidUpdate(){
    console.log('App (update) props', this.props)
  }

  render(){
    const { popup } = this.props
    const actualPage = window.location.pathname
    const pageClassName = ['page'];
    if(popup) pageClassName.push('popupShow')
    console.log('App props (render)', this.props, 'actualPage', actualPage)
    return(
      <>
        <div className={pageClassName.join(' ')}>
        <Router>
        <Crutch />
        <Header actualPage={actualPage}/>
            <Switch>
              <Route exact path='/'>
                <Redirect to='/courier'/>
              </Route>
              <Route exact path='/courier'>
                <AppMap rootPath='/courier'/>
              </Route>
              <Route exact path='/courier/machine'>
                <AppMachine rootPath='/courier/machine'/>
              </Route>
              <Route path='/courier/machine/add'>
                <AppMachineChange />
              </Route>
              <Route path='/courier/machine/remove'>
                <AppMachineChange />
              </Route>
            </Switch>
        <Footer actualPage={actualPage}/>
        </Router>
        </div>
        <Popup />
      </>
    );
  }
}

const Crutch_ = props => {
  const { history } = props
  const actualPage = history.location.pathname
  console.log(actualPage)
  const redirect = (actualPage.indexOf('index.html') !== -1) ? <Redirect to='/courier'/> : null
  return redirect
}
const Crutch = withRouter(Crutch_)

export default connect(
  appMapStateToProps,
    { initializeApp }
  )(_App)