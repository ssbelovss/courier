import React, { useState } from 'react'

import { connect } from 'react-redux'
import { machineStateToProps } from '../../reducers'
import { thunkOpenLockMachine as openMachine, thunkCloseLockMachine as closeMachine, thunkGetLockMachine as getLockMachine } from '../../reducers/app/actions'

class _AppMachine extends React.Component{
    componentDidMount(){
        const { activeMachine, getLockMachine } = this.props
        if(activeMachine) getLockMachine()
    }
    render(){
        const { activeMachine, machines, openMachine, closeMachine } = this.props
        console.log('AppMachine props:', this.props)
        const machine = (machines) ? machines.filter(item=>+activeMachine===+item.id) : []
        const { address, name } = (activeMachine && machine.length) ? machine[0] : {}
        const _name = (activeMachine && !name) ? 'Не указано' : name
        const _address = (activeMachine && !address) ? 'Не указано' : address
        const accessClassName = ['access']
        let open = openMachine
        let close = closeMachine
        if(machine.length && machine[0].opened !== undefined){
            if(machine[0].opened){
                open = null
                accessClassName.push('opened')
            }else{
                close = null
                accessClassName.push('closed')
            }
        }
        return(
            <div className='page-content'>
                <div className={`machine`}>
                    {activeMachine && <div className={`name`}>{_name}</div>}
                    {activeMachine && <div className={`address`}>{_address}</div>}
                    {!activeMachine && <div className={`noMachine`}>Не&nbsp;выбран торговый автомат. Вернитесь на&nbsp;карту и&nbsp;отсканируйте QR на&nbsp;холодильнике</div>}
                    {activeMachine && <div className={accessClassName.join(' ')}>
                        <ButtonDo onClick={open} className={`open`}/>
                        <ButtonDo onClick={close} className={`close`}/>
                    </div>}
                </div>
            </div>
        )
    }
}
const AppMachine = connect(
    machineStateToProps,{
        openMachine,
        closeMachine,
        getLockMachine
    }
)(_AppMachine)

const textDo = {
    'open': 'Открыть замок',
    'close': 'Закрыть замок'
}

const ButtonDo = (props)=>{
    const { className, onClick } = props
    const [isPushed, setPushed] = useState(false)
    const _className = (isPushed) ? `${className} on` : className

    return(
        <div
            className={_className}
            onClick={onClick}
            onTouchStart={()=>setPushed(true)}
            onTouchEnd={()=>setTimeout(setPushed, 200, false)}
            onTouchCancel={()=>setTimeout(setPushed, 200, false)}
        >
            <div className={`icon`}></div>
            <div className={`do`}>{textDo[className]}</div>
        </div>
    )
}

export {
    AppMachine as default
}