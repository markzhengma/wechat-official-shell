import React, { Component } from 'react';
import {
    Link,
    Redirect,
} from 'react-router-dom';
import CreateRecord from './CreateRecord';

class AdminPage extends Component {
    constructor(){
        super();
        this.state = {
            search_selection: '使用换油证号查找',
            service_num: '',
            make: '',
            plate: '',
            driver_name: '',
            phone_num: '',
            search_name: '',
            search_phone: '',
            search_plate: '',
            search_service: '',
            isInputNew: false,
            selectRecordId: '',
            selectUserId: '',
            updateMake: '',
            updatePlate: '',
            updateDriverName: '',
            updatePhone: '',
            updateDate: '',
            updateRecordName: '',
            updateMilage: '',
            updateOperator: '',
            updateGift: '',
            updateDetail: '',
            isUserUpdating: false,
            isRecordUpdating: false,
        }
    }
    componentDidMount(){
        this.props.resetRedirect();
        this.props.resetCreateCompleted();
        this.props.resetRecordData();
        if(this.props.location == "海拉尔河东门店"){
            this.props.getNewHD();
        }
        if(this.props.location == "海拉尔河西门店"){
            this.props.getNewH();
        }
        if(this.props.location == "满洲里老店"){
            this.props.getNewM();
        }
        if(this.props.location == "满洲里新店"){
            this.props.getNewM8();
        }
        if(this.props.location == "牙克石门店"){
            this.props.getNewY();
        }
    }
    componentWillUnmount(){
        this.props.setAuthState(false);
    }
    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        });
    }
    logOut = () => {
        this.props.setAuthState(false);
    }
    submitAndClearState = (e, service_num, make, plate, driver_name, phone_num) => {
        this.props.handleNewUserSubmit(e, service_num, make, plate, driver_name, phone_num);
        this.setState({
            service_num: '',
            make: '',
            plate: '',
            driver_name: '',
            phone_num: '',
            admin_selection: "查找老客户",
        });
    }
    switchInputNew = () => {
        this.setState({
            isInputNew: !this.state.isInputNew,
        })
    }
    selectUserUpdate = (id, make, plate, name, phone) => {
        this.setState({
            isUserUpdating: true,
            selectUserId: id,
            updateMake: make,
            updatePlate: plate,
            updateDriverName: name,
            updatePhone: phone,
        })
    }
    completeUserUpdate = (e, updateMake, updatePlate, updateDriverName, updatePhone, selectUserId) => {
        this.props.updateUser(e, updateMake, updatePlate, updateDriverName, updatePhone, selectUserId);
        this.setState({
            selectUserId: '',
            updateMake: '',
            updatePlate: '',
            updateDriverName: '',
            updatePhone: '',
            isUserUpdating: false,
        })
    }
    selectRecordUpdate = (id, record_time, record_name, record_milage, record_operator, record_gift, record_detail) => {
        this.setState({
            isRecordUpdating: true,
            selectRecordId: id,
            updateDate: record_time,
            updateRecordName: record_name,
            updateMilage: record_milage,
            updateOperator: record_operator,
            updateGift: record_gift,
            updateDetail: record_detail,
        })
    }
    completeRecordUpdate = (e, updateDate, updateRecordName, updateMilage, updateOperator, updateGift, updateDetail, selectRecordId) => {
        this.props.updateRecord(e, updateDate, updateRecordName, updateMilage, updateOperator, updateGift, updateDetail, selectRecordId);
        this.setState({
            selectRecordId: '',
            updateDate: '',
            updateRecordName: '',
            updateMilage: '',
            updateOperator: '',
            updateGift: '',
            updateDetail: '',
            isRecordUpdating: false,
        })
    }
    render(){
        if(this.props.fireRedirect == true){
            return <Redirect to = {this.props.redirect}/>
        }
        if(!this.props.auth){
            return <Redirect to = '/login'/>
        }
        return (
            <div className = "admin-page">
                <h3>管理员登录：{this.props.location}</h3> 
                <div>
                    <select name = "admin_selection" className = "admin-select" onChange = {this.props.handleInputChange} value = {this.props.admin_selection}>
                        <option>查找老客户</option>
                        <option>创建新客户</option>
                    </select>
                </div>
                <div className = "admin-box">
                    {this.props.admin_selection === "查找老客户" ?
                        <select name = "search_selection" className = "admin-select" onChange = {this.handleInputChange} value = {this.state.search_selection}>
                            <option>使用换油证号查找</option>
                            <option>使用手机号查找</option>
                            <option>使用车牌号查找</option>
                        </select>
                    : ""}
                    {this.props.admin_selection === "查找老客户" ?
                        this.state.search_selection === "使用换油证号查找" ?
                        <form className = "search-form" onSubmit ={(e) => this.props.getRecordByService(e, this.state.search_service)}>
                            <input name = "search_service" placeholder = "请输入换油证号" onChange = {this.handleInputChange}/>
                            <button className = "admin-page-btn" type = "submit">查找</button>
                        </form>
                        : ""
                    : ""}
                    {this.props.admin_selection === "查找老客户" ?
                        this.state.search_selection === "使用手机号查找" ?
                        <form className = "search-form" onSubmit ={(e) => this.props.getRecordByPhone(e, this.state.search_phone)}>
                            <input name = "search_phone" placeholder = "请输入手机号" onChange = {this.handleInputChange}/>
                            <button className = "admin-page-btn" type = "submit">查找</button>
                        </form>
                        : ""
                    : ""}
                    {this.props.admin_selection === "查找老客户" ?
                        this.state.search_selection === "使用车主姓名查找" ?
                        <form className = "search-form" onSubmit ={(e) => this.props.getRecordByName(e, this.state.search_name)}>
                            <input name = "search_name" placeholder = "请输入车主姓名" onChange = {this.handleInputChange}/>
                            <button className = "admin-page-btn" type = "submit">查找</button>
                        </form>
                        : ""
                    : ""}
                    {this.props.admin_selection === "查找老客户" ?
                        this.state.search_selection === "使用车牌号查找" ?
                        <form className = "search-form" onSubmit ={(e) => this.props.getRecordByPlate(e, this.state.search_plate)}>
                            <input name = "search_plate" placeholder = "请输入车牌号" onChange = {this.handleInputChange}/>
                            <button className = "admin-page-btn" type = "submit">查找</button>
                        </form>
                        : ""
                    : ""}
                    {this.props.userData != null && this.props.userData.length >= 1 ? 
                        this.props.admin_selection === "查找老客户" ?
                                <div>
                                    <div className = "record-table-admin">
                                        <div className = "record-table-head-admin">
                                            <div className = "record-table-head-single-admin">换油证号</div>
                                            <div className = "record-table-head-single-admin">车型</div>
                                            <div className = "record-table-head-single-admin">车牌号码</div>
                                            <div className = "record-table-head-single-admin">车主姓名</div>
                                            <div className = "record-table-head-single-admin">联系方式</div>
                                            <div className = "record-table-head-single-admin"/>
                                            <div className = "record-table-head-single-admin">编辑</div>
                                        </div>
                                        {this.state.selectUserId !== this.props.userData[0].id ?
                                            <div className = "record-single-admin">
                                                <div className = "record-single-detail-admin">{this.props.userData[0].service_num ? this.props.userData[0].service_num : "无记录"}</div>
                                                <div className = "record-single-detail-admin">{this.props.userData[0].make ? this.props.userData[0].make : "无记录"}</div>
                                                <div className = "record-single-detail-admin">{this.props.userData[0].plate ? this.props.userData[0].plate : "无记录"}</div>
                                                <div className = "record-single-detail-admin">{this.props.userData[0].driver_name ? this.props.userData[0].driver_name : "无记录"}</div>
                                                <div className = "record-single-detail-admin">{this.props.userData[0].phone_num ? this.props.userData[0].phone_num : "无记录"}</div>
                                                <div className = "record-single-detail-admin"/>
                                                {!this.state.isUserUpdating ? 
                                                    <div className = "record-single-detail-admin">
                                                        <button className = "admin-edit-btn" onClick = {() => this.selectUserUpdate(this.props.userData[0].id,
                                                                                                                                        this.props.userData[0].make,
                                                                                                                                        this.props.userData[0].plate,
                                                                                                                                        this.props.userData[0].driver_name,
                                                                                                                                        this.props.userData[0].phone_num,
                                                                                                                                    )}/>
                                                        {this.props.recordData === null || this.props.recordData.length < 1 ?
                                                            <button className = "admin-delete-btn" onClick = {() => this.props.deleteUser(this.props.userData[0].id)}/>
                                                        : ""}
                                                    </div>
                                                : ""}
                                            </div>
                                        : 
                                            <form onSubmit = {(e) => this.completeUserUpdate(e, this.state.updateMake,
                                                                                                this.state.updatePlate,
                                                                                                this.state.updateDriverName,
                                                                                                this.state.updatePhone,
                                                                                                this.state.selectUserId
                                                                                            )}>
                                                <div className = "record-single-admin">
                                                    <div className = "record-single-detail-admin">{this.props.userData[0].service_num ? this.props.userData[0].service_num : "无记录"}</div>
                                                    <input className = "record-single-detail-admin-edit" name = "updateMake" defaultValue = {this.state.updateMake} onChange = {this.handleInputChange}/>
                                                    <input className = "record-single-detail-admin-edit" name = "updatePlate" defaultValue = {this.state.updatePlate} onChange = {this.handleInputChange}/>
                                                    <input className = "record-single-detail-admin-edit" name = "updateDriverName" defaultValue = {this.state.updateDriverName} onChange = {this.handleInputChange}/>
                                                    <input className = "record-single-detail-admin-edit" name = "updatePhone" defaultValue = {this.state.updatePhone} onChange = {this.handleInputChange}/>
                                                    <div className = "record-single-detail-admin"/>
                                                    <div className = "record-single-detail-admin"><button className = "form-btn" type = "submit">确定</button></div>
                                                </div>
                                            </form>
                                        }
                                    </div>
                                </div>
                        : ""
                    : ""}
                    {this.props.recordData != null && this.props.recordData.length >= 1 ? 
                        this.props.admin_selection === "查找老客户" ?
                            <div className = "record-table-admin">
                                <div className = "record-table-head-admin">
                                    <div className = "record-table-head-single-admin">日期</div>
                                    <div className = "record-table-head-single-admin">产品<br/>名称</div>
                                    <div className = "record-table-head-single-admin">表示<br/>里程</div>
                                    <div className = "record-table-head-single-admin">操作人</div>
                                    <div className = "record-table-head-single-admin">赠品<br/>情况</div>
                                    <div className = "record-table-head-single-admin">备注</div>
                                    <div className = "record-table-head-single-admin">编辑</div>
                                </div>
                                {this.props.recordData.map(record => {
                                    var date = new Date(record.record_time);
                                    var month = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                                    var dateFormatted = date.getFullYear() + "-" + month + "-" + date.getDate()
                                    return (
                                        <div key = {record.id}>
                                            {this.state.selectRecordId != record.id ?
                                                <div className = "record-single-admin" style = {this.props.recordData.indexOf(record) % 2 == 0 ? {backgroundColor: 'white'} : {backgroundColor: '#faefc9'}}>
                                                    <div className = "record-single-detail-admin">{date.getFullYear()}年<br/>{month}月{date.getDate()}日</div>
                                                    <div className = "record-single-detail-admin">{record.record_name}</div>
                                                    <div className = "record-single-detail-admin">{record.record_milage}</div>
                                                    <div className = "record-single-detail-admin">{record.record_operator}</div>
                                                    <div className = "record-single-detail-admin">{record.record_gift}</div>
                                                    <div className = "record-single-detail-admin">{record.record_detail}</div>
                                                    {!this.state.isRecordUpdating ? 
                                                        <div className = "record-single-detail-admin">
                                                            <button className = "admin-edit-btn" onClick = {() => this.selectRecordUpdate(record.id,
                                                                                                                                        dateFormatted,
                                                                                                                                        record.record_name,
                                                                                                                                        record.record_milage,
                                                                                                                                        record.record_operator,
                                                                                                                                        record.record_gift,
                                                                                                                                        record.record_detail,
                                                                                                                                    )}/>
                                                            <button className = "admin-delete-btn" onClick = {(e) => this.props.deleteRecord(e, record.id)}/>
                                                        </div>
                                                    : ""}
                                                </div>
                                                :
                                                <form onSubmit = {(e) => this.completeRecordUpdate(e, this.state.updateDate, 
                                                                                                    this.state.updateRecordName, 
                                                                                                    this.state.updateMilage, 
                                                                                                    this.state.updateOperator, 
                                                                                                    this.state.updateGift, 
                                                                                                    this.state.updateDetail, 
                                                                                                    this.state.selectRecordId
                                                                                                    )}>
                                                    <div className = "record-single-admin" style = {this.props.recordData.indexOf(record) % 2 == 0 ? {backgroundColor: 'white'} : {backgroundColor: '#faefc9'}}>
                                                        <input className = "record-single-detail-admin-edit" name = "updateDate" type = "date" defaultValue = {this.state.updateDate} onChange = {this.handleInputChange}/>
                                                        <select className = "record-single-detail-admin-edit" name = "updateRecordName" defaultValue = {this.state.updateRecordName} onChange = {this.handleInputChange}>
                                                            <option value = "">-产品名称-</option>
                                                            <option value = "">**喜力**</option>
                                                            <option>HX2</option>
                                                            <option>HX3</option>
                                                            <option>HX3C</option>
                                                            <option>HX5</option>
                                                            <option>HX5AJ</option>
                                                            <option>HX6(10W)</option>
                                                            <option>HX6(5W)</option>
                                                            <option>HX6</option>
                                                            <option>HX7</option>
                                                            <option>HX7-30</option>
                                                            <option>1LHX7</option>
                                                            <option>HX7AJ</option>
                                                            <option>HX8-40</option>
                                                            <option>HX8-30</option>
                                                            <option>HX8</option>
                                                            <option>超凡5W</option>
                                                            <option>超凡0W</option>
                                                            <option>超凡</option>
                                                            <option>极净超凡-40</option>
                                                            <option>极净超凡-30</option>
                                                            <option>极净超凡-20</option>
                                                            <option>极净</option>
                                                            <option>金装超凡</option>
                                                            <option value = "">**劲霸**</option>
                                                            <option>4LR2</option>
                                                            <option>18LR2</option>
                                                            <option>4LR2E</option>
                                                            <option>18LR2E</option>
                                                            <option>4LR3</option>
                                                            <option>18LR3</option>
                                                            <option>4LR4</option>
                                                            <option>18LR4</option>
                                                            <option>4LR5</option>
                                                            <option>18LR5</option>
                                                            <option>4LR5E</option>
                                                            <option>18LR5E</option>
                                                            <option>18LR6</option>
                                                            <option value = "">**齿轮油**</option>
                                                            <option>2L齿油</option>
                                                            <option>4L齿油</option>
                                                            <option>18L齿油</option>
                                                            <option>齿轮油</option>
                                                            <option>4LG80W</option>
                                                            <option>4LA80W</option>
                                                            <option>18LA80W</option>
                                                            <option>18LA85W</option>
                                                            <option>4LA90</option>
                                                            <option>18LA90</option>
                                                            <option>1LS4(75W-90)</option>
                                                            <option>S5X</option>
                                                            <option>1LS6</option>
                                                            <option value = "">**变速箱油**</option>
                                                            <option>1LMD3</option>
                                                            <option>4LIID</option>
                                                            <option>CVT变速箱油</option>
                                                            <option>DCTF变速箱油</option>
                                                            <option>自动挡油S2D</option>
                                                            <option>自动挡S3</option>
                                                            <option>自动挡S6</option>
                                                            <option value = "">**防冻液**</option>
                                                            <option>18KG防冻液</option>
                                                            <option>防冻液</option>
                                                            <option>壳防</option>
                                                            <option value = "">**液压油**</option>
                                                            <option>16L液压油</option>
                                                            <option>16L液力油</option>
                                                            <option>20L海加力</option>
                                                            <option value = "">**刹车油**</option>
                                                            <option>巨豹DOT4</option>
                                                            <option value = "">**中华**</option>
                                                            <option>18L中华CF-4</option>
                                                            <option>中华2升齿</option>
                                                            <option>3.8L中华1000</option>
                                                            <option>蓝中华CD</option>
                                                            <option>红中华CF</option>
                                                            <option>中华9900</option>
                                                            <option>中华1000</option>
                                                            <option value = "">**美孚**</option>
                                                            <option>美孚</option>
                                                            <option>金美孚1L</option>
                                                            <option>银美孚4L</option>
                                                            <option value = "">**其他**</option>
                                                            <option>余油</option>
                                                            <option>自带油品</option>
                                                            <option>火花塞</option>
                                                            <option>刹车片</option>
                                                        </select>
                                                        <input className = "record-single-detail-admin-edit" name = "updateMilage" defaultValue = {this.state.updateMilage} onChange = {this.handleInputChange}/>
                                                        <select className = "record-single-detail-admin-edit" name = "updateOperator" defaultValue = {this.state.updateOperator} onChange = {this.handleInputChange}>
                                                            <option value = "">-操作人-</option>
                                                            <option value = "">**海拉尔**</option>
                                                            <option>杜军</option>
                                                            <option>姜国才</option>
                                                            <option>马彦龙</option>
                                                            <option>马燕龙</option>
                                                            <option>王宏斌</option>
                                                            <option>王洪彬</option>
                                                            <option>外购</option>
                                                            <option>杨超</option>
                                                            <option>赵德军</option>
                                                            <option>赵炎</option>
                                                            <option>张拓</option>
                                                            <option>朱汨龙</option>
                                                            <option value = "">**满洲里**</option>
                                                            <option>段丛峰</option>
                                                            <option>姜金龙</option>
                                                            <option>姜国才</option>
                                                            <option>李重阳</option>
                                                            <option>刘明</option>
                                                            <option>逯新永</option>
                                                            <option>乔红</option>
                                                            <option>孙鹏远</option>
                                                            <option>徐正东</option>
                                                            <option>杨德超</option>
                                                            <option>朱汨龙</option>
                                                            <option value = "">**牙克石**</option>
                                                            <option>段丛峰</option>
                                                            <option>顾丛刚</option>
                                                            <option>姜国才</option>
                                                            <option>李重阳</option>
                                                            <option>孙鹏远</option>
                                                            <option>赵正东</option>
                                                        </select>
                                                        <select className = "record-single-detail-admin-edit" name = "updateGift" defaultValue = {this.state.updateGift} onChange = {this.handleInputChange}>
                                                            <option value = "">-赠品情况-</option>
                                                            <option>四轮定位</option>
                                                            <option>倒胎</option>
                                                            <option>电瓶连接线</option>
                                                            <option>手电</option>
                                                            <option>工装（套）</option>
                                                            <option>工装（件）</option>
                                                            <option>保温杯</option>
                                                            <option>劲霸水杯</option>
                                                            <option>急救包</option>
                                                            <option>车衣</option>
                                                            <option>法拉利车模</option>
                                                            <option>钓鱼保温箱</option>
                                                            <option>折叠椅</option>
                                                            <option>行车记录仪</option>
                                                            <option>茶壶</option>
                                                            <option>茶杯</option>
                                                            <option>车充</option>
                                                            <option>洗发水</option>
                                                            <option>蓝牙耳机</option>
                                                            <option>车载套装</option>
                                                            <option>车载吸尘器</option>
                                                            <option>毛巾包</option>
                                                            <option>手机架</option>
                                                            <option>油路清洁剂</option>
                                                            <option>雨伞</option>
                                                            <option>足球</option>
                                                            <option>颈枕</option>
                                                            <option>手机壳</option>
                                                            <option>博朗礼盒</option>
                                                            <option>钥匙链</option>
                                                            <option>可乐</option>
                                                            <option>车载电热杯</option>
                                                            <option>香水</option>
                                                            <option>防滑垫</option>
                                                            <option>雨伞</option>
                                                            <option>真皮把套</option>
                                                            <option>电吹风</option>
                                                            <option>头灯</option>
                                                            <option>刮雪手套</option>
                                                            <option>剃须刀</option>
                                                            <option>手套</option>
                                                            <option>多用锅</option>
                                                            <option>塑料水杯</option>
                                                            <option>宝马车衣</option>
                                                            <option>车载加湿器</option>
                                                            <option>壳牌水杯</option>
                                                            <option>腰靠</option>
                                                            <option>手电</option>
                                                        </select>
                                                        <input className = "record-single-detail-admin-edit" name = "updateDetail" defaultValue = {this.state.updateDetail} onChange = {this.handleInputChange}/>
                                                        <div className = "record-single-detail-admin"><button className = "form-btn" type = "submit">确定</button></div>
                                                    </div>
                                                </form>
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                        :""
                    : ""}
                    {this.props.admin_selection === "查找老客户" && this.props.userData != null ?
                        this.state.isInputNew ? 
                            <CreateRecord 
                                service_num = {this.props.userData[0].service_num}
                                handleNewRecordSubmit = {this.props.handleNewRecordSubmit}
                                getRecordByService = {this.props.getRecordByService}
                                switchInputNew = {this.switchInputNew}
                            />
                        : 
                        <div className = "create-record-btn-group">
                            <button id = "add-btn" onClick = {this.switchInputNew}/>
                            <div>添加保养记录</div>
                        </div>
                    : ""}
                    {this.props.admin_selection === "创建新客户" ?
                        <form className = "create-form" onSubmit = {(e) => this.submitAndClearState(e, this.props.newServiceNum,
                                                                                                                this.state.make,
                                                                                                                this.state.plate,
                                                                                                                this.state.driver_name,
                                                                                                                this.state.phone_num)}>
                            <input className = "newrecord-input" value = {this.props.newServiceNum} readOnly = {true}/>
                            <input className = "newrecord-input" type = "text" name = "make" placeholder = "车型" onChange = {this.handleInputChange} value = {this.state.make}/>
                            <input className = "newrecord-input" type = 'text' name = 'plate' placeholder = "车牌号" onChange = {this.handleInputChange} value = {this.state.plate}/>
                            <input className = "newrecord-input" type = 'text' name = 'driver_name' placeholder = "车主姓名" onChange = {this.handleInputChange} value = {this.state.driver_name}/>
                            <input className = "newrecord-input" type = "text" name = "phone_num" placeholder = "联系方式" onChange = {this.handleInputChange} value = {this.state.phone_num}/>
                            <button className = "admin-page-btn" type = "submit">创建新客户</button>
                            <button className = "admin-page-btn" type = "reset">清空输入框</button>
                        </form>
                    : ""}
                    {this.props.admin_selection === "创建换油记录" ?
                        <form>
                            <input name = "search_service" placeholder = "换油证号"/>
                        </form>
                    : ""}
                </div>
                <div className = "admin-btn-list">
                    <button className = "admin-page-btn" onClick = {this.logOut}>返回登录</button>
                    <Link to = "/"><button className = "admin-page-btn">返回首页</button></Link>
                </div>
            </div>
        )
    }
}

export default AdminPage;