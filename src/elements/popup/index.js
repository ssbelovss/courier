import React, { Component } from 'react'
import { connect } from 'react-redux'

import { popupMapStateToProps } from '../../reducers'
import { hidePopup, showPopup } from '../../reducers/popup/actions'

import '../../css/popup.scss'

class _Popup extends Component{
  constructor(props){
    super(props)
    this.state = {
      show: false
    }
    this.hide = this.hide.bind(this)
    this._hide = this._hide.bind(this)
  }
  componentDidMount(){
    if(this.props.show) this.setState(state=>({...state, show: true}))
  }

  componentDidUpdate(pP, pS){
    const { show } = this.props
    if(show !== pP.show && show !== this.state.show) this.setState(state=>({...state, show: show}))
  }

  hide(e){
    this.setState(state=>({...state, show: false}), this._hide)  
  }

  _hide(){
    setTimeout(this.props.hidePopup, 300)
  }

  render(){
    console.log('Popup props', this.props, 'Popup state', this.state)
    const { show, canClose, content, title } = this.props
    const click = (canClose) ? {onClick:this.hide} : {}
    const showClass = (this.state.show) ? 'show' : ''
    return(<>
      {(show || this.state.show) &&
      <div id="popupDom">
        <div className="popupBack" {...click}>
          <div className={`popupWindow ${showClass}`} onClick={(e)=>e.stopPropagation()}>
            <span className="message">{content}</span>
            {canClose && <span className="close" {...click}>Закрыть</span>}
          </div>
        </div>
      </div>}
      </>);
  }
}

const Popup = connect(
  popupMapStateToProps,
  {
      showPopup,
      hidePopup
  }
  )(_Popup);

export { Popup as default};