import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmap';
// import ReactQMap from 'react-qmap';

class MapPage extends Component {
    constructor(){
        super();
        this.state = {
            location: '',
            name: '',
            isShowList: true,
        }
    }
    setLocation = (location, name) => {
        this.setState({
            location: location,
            name: name,
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
            <script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=ygiWYb4B3RVLXFgkNGDZLrYV0jKawnH1"></script>
                <div className = "location-btn"  onClick = {this.switchListShow}>
                    <b>门店列表</b>
                </div>
                <div className = "location-list" style = {this.state.isShowList ? {maxHeight: "600px"}: {maxHeight: "0px"}}>
                    <b>海拉尔</b>
                    <p className = "location-list-single" onClick = {() => this.setLocation({lng: 119.784342, lat: 49.225553}, "海拉尔河东店")}>海拉尔河东店</p>
                    <p className = "location-list-single" onClick = {() => this.setLocation({lng: 119.755715, lat: 49.23229}, "海拉尔河西店")}>海拉尔河西店</p>
                    <b>满洲里</b>
                    <p className = "location-list-single" onClick = {() => this.setLocation({lng: 117.449949, lat: 49.599737}, "满洲里四道街店")}>满洲里四道街店</p>
                    <p className = "location-list-single" onClick = {() => this.setLocation({lng: 117.503674, lat: 49.58917}, "满洲里粮库综合楼店")}>满洲里粮库综合楼店</p>
                    <b>牙克石</b>
                    <p className = "location-list-single" onClick = {() => this.setLocation({lng: 120.718067, lat: 49.285365}, "牙克石光明南路店")}>牙克石光明南路店</p>
                    <p className = "location-list-single" onClick = {() => this.setLocation({lng: 120.726413, lat: 49.285677}, "牙克石一道街店")}>牙克石一道街店</p>
                </div>
                {this.state.name === "海拉尔河东店" ? 
                    <div className = "location-detail" style = {this.state.isShowList ? {opacity: 0} : {opacity: 1}}>
                        <b>海拉尔河东店</b>
                        <a href = 'tel:+86-0470-8223779'>联系电话：0470-8223779</a>
                        <p>地址：海拉尔河东加格达奇路109综合楼1号门市</p>
                    </div>
                : ""}
                {this.state.name === "海拉尔河西店" ? 
                    <div className = "location-detail" style = {this.state.isShowList ? {opacity: 0} : {opacity: 1}}>
                        <b>海拉尔河西店</b>
                        <a href = 'tel:+86-0470-8307711'>联系电话：0470-8307711</a>
                        <p>地址：海拉尔河西碧海金城夹信子二道街路口</p>
                    </div>
                : ""}
                {this.state.name === "满洲里四道街店" ? 
                    <div className = "location-detail" style = {this.state.isShowList ? {opacity: 0} : {opacity: 1}}>
                        <b>满洲里四道街店</b>
                        <a href = 'tel:+86-0470-2205900'>联系电话：0470-2205900</a>
                        <p>地址：满洲里四道街西头车之美宾馆西侧门市</p>
                    </div>
                : ""}
                {this.state.name === "满洲里粮库综合楼店" ? 
                    <div className = "location-detail" style = {this.state.isShowList ? {opacity: 0} : {opacity: 1}}>
                        <b>满洲里粮库综合楼店</b>
                        <a href = 'tel:+86-0470-6221541'>联系电话：0470-6221541</a>
                        <p>地址：满洲里粮库综合楼5号门市</p>
                    </div>
                : ""}
                {this.state.name === "牙克石光明南路店" ? 
                    <div className = "location-detail" style = {this.state.isShowList ? {opacity: 0} : {opacity: 1}}>
                        <b>牙克石光明南路店</b>
                        <a href = 'tel:+86-0470-7379457'>联系电话：0470-7379457</a>
                        <p>地址：牙克石光明南路民生B区26号楼9号门市</p>
                    </div>
                : ""}
                {this.state.name === "牙克石一道街店" ? 
                    <div className = "location-detail" style = {this.state.isShowList ? {opacity: 0} : {opacity: 1}}>
                        <b>牙克石一道街店</b>
                        <a href = 'tel:+86-13088520439'>联系电话：130 8852 0439</a>
                        <p>地址：牙克石市一道街西润泽园小区门市（原铁路中学）</p>
                    </div>
                : ""}
                <Link to = "/"><button className = "admin-page-btn">返回首页</button></Link>
                {this.state.location ? 
                    <div className = "map-container">
                        <Map center={this.state.location} zoom="17" style={{height: "100%", width: "100%"}}>
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