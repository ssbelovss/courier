import React from 'react'

export default class Loading extends React.Component{
    render(){
        return (
            <div className='loader'>
                <div>
                    <img alt='' src={require('../img/1x1.png')}/>
                </div>
                <div>Загрузка</div>
            </div>
        )
    }
}