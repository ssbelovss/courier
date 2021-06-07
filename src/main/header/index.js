import React from 'react'
import { connect } from 'react-redux'
import {
    Redirect
} from 'react-router-dom'
import { withRouter } from 'react-router'

import {  appMapStateToProps } from '../../reducers'
import { logOut } from '../../reducers/user/actions'

class _Header extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            redirect: null
        }
        this.redirect = this.redirect.bind(this);
    }

    redirect(page){
        this.setState({
            redirect: <Redirect to={page}/>
        },()=>this.setState({redirect: null}))
    }

    render(){
        const className = ['head'];
        const { history, logOut } = this.props
        const actualPage = history.location.pathname
        const toMap = (actualPage === '/courier' || actualPage === '/courier/') ? null : 'Карта'
        const click = (actualPage === '/courier' || actualPage === '/courier/') ? null : ()=>this.redirect('/courier')
        return(
            <div className={className.join(' ')}>
                {!!this.state.redirect && this.state.redirect}
                <span className='toMap' onClick={click}>{toMap}</span>
                <span className="title">&nbsp;</span>
                <span className='exit' onClick={logOut}>Выход</span>
            </div>
        )
    }
}
const Header_ = withRouter(_Header)
const Header = connect(
    appMapStateToProps,{
        logOut
    }
)(Header_)

export { Header as default}