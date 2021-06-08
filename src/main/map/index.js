import React, { useState } from 'react'
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux'

import { machineStateToProps, appMapStateToProps } from '../../reducers'
import { goToScan, unsetActiveMachine, getListMachines } from '../../reducers/app/actions'

import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css'
import '../../css/map.scss'

class _AppMap extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            redirect: null
        }
        this.fitBounds = false
        this.map = {}
        this.userPoint = undefined
        this.machines = {points:[], bounds:null}
        this.setMarkers = this.setMarkers.bind(this)
        this.bounds = this.bounds.bind(this)
        this.setUserMarker = this.setUserMarker.bind(this)
    }
    componentDidMount(){
        const { props } = this
        const { longtitude, latitude, machines, activeMachine, unsetActiveMachine } = props
        if(activeMachine) unsetActiveMachine()
        console.log('MapContainer (render) props', props)
        this.map = new mapboxgl.Map({
            accessToken: 'pk.eyJ1IjoiY3RhY2xpcnUiLCJhIjoiY2tpc3M1OHJtMG50MTJxc2M3bXkwa2FreiJ9.2H4ZzQKjvfRHv3iwolsdkg',
            container: this.container,
            style: 'https://api.maptiler.com/maps/21ea9e3f-91b5-4d78-a2f7-694e92ec8af1/style.json?key=6CzEZUCMVZYO3TvAxszk',
            center: [longtitude ? longtitude : 44.005959, latitude ? latitude : 56.326887],
            zoom: 13,
            minZoom: 8,
            maxZoom: 17,
            zoomControl: false
        });
        if(machines) this.map.on('load', ()=>this.setMarkers())
        if(!machines && longtitude && latitude) this.map.on('load', ()=>this.setUserMarker())
        window.L = mapboxgl
        window.map = this.map
    }
    componentDidUpdate(pP){
        console.log('MapContainer [update]', this.props)
        const { longtitude, latitude, machines, activeMachine } = this.props
        if(machines && (!longtitude || !latitude)){
            this.setMarkers()
        }else if(longtitude && latitude && (!machines || !machines.length)){
            this.setUserMarker()
        }else if(!pP.machines || !pP.machines.length){
            this.setMarkers()
        }else if((!pP.longtitude || !pP.latitude) && longtitude && latitude){
            this.setUserMarker()
        }else if(pP.longtitude && pP.latitude && longtitude && latitude && (pP.longtitude!==longtitude || pP.latitude!==latitude)){
            this.setUserMarker()
        }
        if(activeMachine){
            if(!pP.activeMachine){
                this.setState({redirect: true})
            }else if(pP.activeMachine !== activeMachine){
                this.setState({redirect: true})
            }
        }
    }
    componentWillUnmount(){
        this.map.remove()
    }
    setMarkers(){
        const { longtitude, latitude, machines } = this.props
        machines.forEach(machine => {
            const el = document.createElement('div')
            el.className = 'machinePoint'; el.setAttribute('visited', machine.visited)
            this.machines.points.push(new mapboxgl.Marker(el, {anchor:'bottom', rotation:-45})
                        .setLngLat([machine.longtitude, machine.latitude])
                        .addTo(this.map))
            })
        if(longtitude && latitude){
            this.setUserMarker()
        }else{
            this.map.fitBounds(this.bounds(), {linear:false, padding: {top: 30, left: 20, right: 20, bottom: 10}})
        }
    }
    setUserMarker(){
        const { longtitude, latitude, machines } = this.props
        if(this.userPoint) {
            this.userPoint.remove()
            this.userPoint = undefined
        }
        const el = document.createElement('div')
        el.className = 'userPoint'
        this.userPoint = new mapboxgl.Marker(el, {anchor:'center'})
                            .setLngLat([longtitude, latitude])
                            .addTo(this.map)
        if(!machines || !machines.length){
            this.map.flyTo({center:[longtitude, latitude], essential: true})
        }else{
            this.map.fitBounds(this.bounds(), {linear:false, padding: {top: 30, left: 20, right: 20, bottom: 10}})
        }
    }
    bounds(){
        const { machines, longtitude, latitude } = this.props
        const first = [machines[0].longtitude, machines[0].latitude]
        const second = (longtitude && latitude) ? [longtitude, latitude] : [machines[0].longtitude, machines[0].latitude]
        const bounds =  machines.reduce((bounds, machine) => {
            return bounds.extend([machine.longtitude, machine.latitude])
            }, new mapboxgl.LngLatBounds( first, first) )
        if(longtitude && latitude) bounds.extend(second)
        return bounds
    }
    render(){
        const { rootPath, getListMachines } = this.props
        return(
            <>
            {this.state.redirect && <Redirect to={`${rootPath}/machine`}/>}
            <div className='page-content mapContent'>
                <div ref={el => this.container = el} />
                <ButtonQR reload={getListMachines} />
            </div>
            </>
        )
    }
}
const AppMap = connect(
    machineStateToProps,{
        unsetActiveMachine,
        getListMachines
    }
)(_AppMap)

const _ButtonQR = props => {
    const [on, setOn] = useState(false)
    const { initialized, goToScan, reload } = props
    const onClick = (initialized) ? goToScan : null
    const className = (on) ? 'QR on' : 'QR'
    const touchStart = ()=>{
        setOn(true);
        setTimeout(setOn, 500, false)
    }
    return(
        <div className={`scanQR`}>
            <div className='update' onClick={reload}></div>
            <div className={className} onClick={onClick} onTouchStart={touchStart}></div>
        </div>
    )
}
const ButtonQR = connect(
    appMapStateToProps,{
        goToScan
    }
)(_ButtonQR)

export {
    AppMap as default,
    ButtonQR
}

// add new changes