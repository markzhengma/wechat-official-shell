import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NewRecord extends Component {
    constructor() {
        super();
        this.state = {
            record_time: '',
            record_name: '',
            record_milage: '', 
            record_operator: '', 
            record_gift: '', 
            record_detail: '', 
            record_id: '',
            service_num: '',
            make: '',
            plate: '',
            driver_name: '',
            phone_num: '',
            admin: '',
            pass: '',
            inputAdmin: '',
            inputPass: '',
            userOrRecord: '用户',
        }
    }

    componentDidMount(){
        this.props.resetRedirect();
        this.props.resetCreateCompleted();
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

    handleLogIn = (e) => {
        e.preventDefault();
        this.setState({
            admin: this.state.inputAdmin,
            pass: this.state.inputPass,
        })
        if(this.state.inputAdmin == "ShellHulunbuir" && this.state.inputPass == "Cheers!"){
            this.props.setAuthState(true);
        }
    }

    render() {
        // if(this.props.fireRedirect){
        //     return <Redirect to = {this.props.redirect}/>
        // }
        return (
            <div className = "create-page">
                {this.props.createCompleted != null ? 
                    this.props.createCompleted == true ?
                    <h5 className = "banner">创建成功</h5>
                    :
                    <h5 className = "banner">创建失败</h5>
                : ''}
                {this.state.admin === "ShellHulunbuir" ? 
                    this.state.pass === "Cheers!" ?
                    this.state.userOrRecord === "保养记录" ?
                    <form className = "create-form" onSubmit = {(e) => this.props.handleNewRecordSubmit(e, this.state.record_time, 
                                                                                                            this.state.record_name, 
                                                                                                            this.state.record_milage, 
                                                                                                            this.state.record_operator, 
                                                                                                            this.state.record_gift, 
                                                                                                            this.state.record_detail, 
                                                                                                            this.state.record_id)}>
                        <select name = "userOrRecord" onChange = {this.handleInputChange}>
                            <option>用户</option>
                            <option>保养记录</option>
                        </select>
                        <h3>创建新保养记录（若有新用户请先创建用户后再创建保养记录）</h3>
                        <input className = "newrecord-input" type = "date" name = "record_time" placeholder = "日期" onChange = {this.handleInputChange}/>
                        {/* <input className = "newrecord-input" type = "text" name = "record_name" placeholder = "产品名称" onChange = {this.handleInputChange}/> */}
                        <select name = "record_name" onChange = {this.handleInputChange}>
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
                        <input className = "newrecord-input" type = 'text' name = 'record_milage' placeholder = "表示里程" onChange = {this.handleInputChange}/>
                        {/* <input className = "newrecord-input" type = 'text' name = 'record_operator' placeholder = "操作人" onChange = {this.handleInputChange}/> */}
                        <select name = "newrecord-input" onChange = {this.handleInputChange}>
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
                        {/* <input className = "newrecord-input" type = "text" name = "record_gift" placeholder = "赠品情况" onChange = {this.handleInputChange}/> */}
                        <select name = "record_gift" onChange = {this.handleInputChange}>
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
                        <input className = "newrecord-input" type = "text" name = "record_detail" placeholder = "备注" onChange = {this.handleInputChange}/>
                        <input className = "newrecord-input" type = "text" name = "record_id" placeholder = "换油证号" onChange = {this.handleInputChange}/>
                        <button className = "newrecord-btn" type = "submit">创建保养记录</button>
                        <button className = "newrecord-btn" type = "reset">清空输入框</button>
                    </form>
                    :
                    <form className = "create-form" onSubmit = {(e) => this.props.handleNewUserSubmit(e, this.state.service_num,
                                                                                                            this.state.make,
                                                                                                            this.state.plate,
                                                                                                            this.state.driver_name,
                                                                                                            this.state.phone_num)}>
                        <select name = "userOrRecord" onChange = {this.handleInputChange}>
                            <option>用户</option>
                            <option>保养记录</option>
                        </select>
                        <h3>创建新用户（若有新用户请先创建用户再创建保养记录）</h3>
                        <input className = "newrecord-input" type = "text" name = "service_num" placeholder = "换油证号（唯一）" onChange = {this.handleInputChange}/>
                        <input className = "newrecord-input" type = "text" name = "make" placeholder = "车型" onChange = {this.handleInputChange}/>
                        <input className = "newrecord-input" type = 'text' name = 'plate' placeholder = "车牌号" onChange = {this.handleInputChange}/>
                        <input className = "newrecord-input" type = 'text' name = 'driver_name' placeholder = "车主姓名" onChange = {this.handleInputChange}/>
                        <input className = "newrecord-input" type = "text" name = "phone_num" placeholder = "联系方式" onChange = {this.handleInputChange}/>
                        <button className = "newrecord-btn" type = "submit">创建新用户</button>
                        <button className = "newrecord-btn" type = "reset">清空输入框</button>
                    </form>
                    :
                    <div className = "login-box">
                        <h3>请以管理员身份登录</h3> 
                        <form className = "login-form" onSubmit = {(e) => this.handleLogIn(e, this.state.inputAdmin, this.state.inputPass)}>
                            <input className = "login-input" type = "text" name = "inputAdmin" placeholder = "管理员" onChange = {this.handleInputChange}/>
                            <input className = "login-input" type = "password" name = "inputPass" placeholder = "密码" onChange = {this.handleInputChange}/>
                            <button className = "login-btn" type = "submit">登录</button>
                        </form>
                    </div>
                    :
                    <div className = "login-box">
                        <h3>请以管理员身份登录</h3> 
                        <form className = "login-form" onSubmit = {(e) => this.handleLogIn(e, this.state.inputAdmin, this.state.inputPass)}>
                            <input className = "login-input" type = "text" name = "inputAdmin" placeholder = "管理员" onChange = {this.handleInputChange}/>
                            <input className = "login-input" type = "password" name = "inputPass" placeholder = "密码" onChange = {this.handleInputChange}/>
                            <button className = "login-btn" type = "submit">登录</button>
                        </form>
                    </div>
                }
                <Link to = "/"><button>返回首页</button></Link>
                
            </div>
        )
    }
}

export default NewRecord;