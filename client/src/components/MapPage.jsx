import React, { Component } from 'react';
import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmap';
// import ReactQMap from 'react-qmap';

class MapPage extends Component {
    constructor(){
        super();
        this.state = {
            location: '',
            isShowList: true,
        }
    }
    setLocation = (location) => {
        this.setState({
            location: location,
            isShowList: !this.state.isShowList,
        })
    }
    switchListShow = () => {
        this.setState({
            isShowList: !this.state.isShowList,
        })
    }
    render(){
        return (
            <div className = "map-page">
                <div className = "location-btn"  onClick = {this.switchListShow}>
                    <b>门店列表</b>
                </div>
                <div className = "location-list" style = {this.state.isShowList ? {maxHeight: "600px"}: {maxHeight: "0px"}}>
                    <b>海拉尔</b>
                    <p className = "location-list-single" onClick = {() => this.setLocation({lng: 119.784342, lat: 49.225553})}>海拉尔河东店</p>
                    <p className = "location-list-single" onClick = {() => this.setLocation({lng: 119.755715, lat: 49.23229})}>海拉尔河西店</p>
                    <b>满洲里</b>
                    <p className = "location-list-single" onClick = {() => this.setLocation({lng: 117.449949, lat: 49.599737})}>满洲里四道街店</p>
                    <p className = "location-list-single" onClick = {() => this.setLocation({lng: 117.503674, lat: 49.58917})}>满洲里粮库综合楼店</p>
                    <b>牙克石</b>
                    <p className = "location-list-single" onClick = {() => this.setLocation({lng: 120.718067, lat: 49.285365})}>牙克石光明南路店</p>
                </div>
                {this.state.location ? 
                    <div className = "map-container">
                        <Map center={this.state.location} zoom="17">
                            <Marker position={this.state.location} />
                            <NavigationControl /> 
                            {/* <InfoWindow position={this.state.location} text="内容" title="标题"/> */}
                        </Map>
                        {/* <ReactQMap 
                            center={this.state.location} 
                            initialOptions={{zoomControl: true, mapTypeControl: true}} 
                            apiKey="xxxxxx-xxxxx-xxxxx-xxxxxx"
                            style={{height: 300}}    // 高度和宽度默认占父元素的100%
                        /> */}
                    </div>
                :""}
            </div>
        )
    }
}

export default MapPage;