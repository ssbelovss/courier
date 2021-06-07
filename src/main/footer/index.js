import React from 'react'
import {
    Redirect
} from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { appMapStateToProps } from '../../reducers'
import { setAddMeals, setRemoveMeals } from '../../reducers/app/actions'

class _Footer extends React.Component{
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
        })
    }

    render(){
        const { history, setAddMeals, setRemoveMeals } = this.props
        const actualPage = history.location.pathname
        const click_add = (actualPage !== '/courier/machine/add') ? ()=>{ setAddMeals(); this.redirect('/courier/machine/add') } : null
        const click_access = (actualPage !== '/courier/machine') ? ()=>this.redirect('/courier/machine') : null
        const click_remove = (actualPage !== '/courier/machine/remove') ? ()=>{ setRemoveMeals(); this.redirect('/courier/machine/remove') } : null
        const access_class = (actualPage === '/courier/machine') ? 'item selected' : 'item'
        const add_class = (actualPage === '/courier/machine/add') ? 'item selected' : 'item'
        const remove_class = (actualPage === '/courier/machine/remove') ? 'item selected' : 'item'
        const hide = (actualPage === '/courier' || actualPage === '/courier/') ? true : false
        return(
            <>
            {!hide && <div className='footer-menu'>
                {this.state.redirect}
                <div className={access_class} onClick={click_access}>Доступ</div>
                <div className='terminator'></div>
                <div className={add_class} onClick={click_add}>Перемещение</div>
                <div className='terminator'></div>
                <div className={remove_class} onClick={click_remove}>Изъятие</div>
            </div>}
            </>
        )
    }
}
const Footer_ = withRouter(_Footer)
const Footer = connect(
    appMapStateToProps,{
        setAddMeals,
        setRemoveMeals
    }
)(Footer_)


export { Footer as default }