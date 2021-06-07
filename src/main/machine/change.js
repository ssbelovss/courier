import React, { useState } from 'react'

import { connect } from 'react-redux'

import { ButtonQR } from '../map'

import { menuMapStateToProps } from '../../reducers'
import { loadMeals } from '../../reducers/menu/actions'
import { unsetActionMeals } from '../../reducers/app/actions'

class _AppMachineChange extends React.Component{
    componentDidMount(){
        this.props.loadMeals()
    }
    componentDidUpdate(pP){
        const { loadMeals, action, list } = this.props
        if(pP.action !== action && !list) loadMeals()
    }
    componentWillUnmount(){
        this.props.unsetActionMeals()
    }
    render(){
        console.log('AppMachineChange props:', this.props)
        const { activeMachine, list, loadMeals } = this.props
        const loading = <span className='loading'>Загрузка</span>
        const _list = (list) ? list.map(el=><ListItem key={el.id} item={el} />) : list
        if(_list && !_list.length) _list.push(<span className='listItem empty' key={'empty'}>Блюд нет</span>)
        return(
            <div className='page-content'>
                <div className={`machine`}>
                {!activeMachine && <div className={`noMachine`}>Не&nbsp;выбран торговый автомат. Вернитесь на&nbsp;карту и&nbsp;отсканируйте QR на&nbsp;холодильнике</div>}
                {activeMachine && <div className={`listToAdd`}>{(_list && <div className='list'>{_list}</div>) || loading}</div>}
                {activeMachine && <ButtonQR reload={loadMeals}/>}
                </div>
            </div>
        )
    }
}
const AppMachineChange = connect(
    menuMapStateToProps,{
        loadMeals,
        unsetActionMeals
    }
)(_AppMachineChange)

const ListItem = props => {
    const { name, count, img, inProgress } = props.item
    const className = ['listItem']
    if(inProgress) className.push('inProgress')
    return(
        <div className={className.join(' ')}>
            <div className='name'>{name}</div>
            <div className='count'>{count}</div>
            <div className='image'>{<Image image={img}/>}</div>
        </div>
    )
}

const Image = props => {
    const [src, setSrc] = useState(require('../../img/new/qr_pre_loader.svg').default)
    const { image } = props
    return(
        <img alt='' src={src} onLoad={()=>setSrc(image)}/>
    )
}

export {
    AppMachineChange as default
}