import React, {Component,Fragment} from 'react';
import {Dropdown,Container,Nav,Navbar, Row, Col, Button, InputGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Redirect} from "react-router";
import love from "../../assets/images/love.svg"
import user from "../../assets/images/user.svg"
import LocalStorageHelper from "../../LocalStorageHelper/LocalStorageHelper";
import axios from "axios";
import ApiURL from "../../api/ApiURL";

class NavMenuDesktop extends Component {

    constructor() {
        super();
        this.state={
            search_key:'',
            SearchRedirectStatus: false,
            RedirectHome:false,
            cartCount:0
        }
        this.SearchOnChange=this.SearchOnChange.bind(this);
        this.SearchOnClick=this.SearchOnClick.bind(this);
        this.searchRedirect=this.searchRedirect.bind(this);
    }

    componentDidMount() {
        axios.get(ApiURL.CartCount(LocalStorageHelper.getEmail('email'))).then((res)=>{
            this.setState({cartCount:res.data})
        })
    }

    SearchOnChange(event){
        let search_key=  event.target.value;
        this.setState({search_key:search_key});
      }
  
      SearchOnClick(){
          if(this.state.search_key.length>=2){
              this.setState({SearchRedirectStatus:true})
          }else{
            this.setState({RedirectHome:true})
          }
      }
      signOut=()=>{
        LocalStorageHelper.storageClear();
        //this.props.setUser(null);
        this.setState({RedirectHome:true});
    }
      searchRedirect(){
          if(this.state.SearchRedirectStatus===true){
              return <Redirect to={"/ProductBySearch/"+this.state.search_key} />
          }
      }
      RedirectHome=()=>{
          if(this.state.RedirectHome===true){
              return <Redirect to="/"/>
          }
      }

    render() {

        let name;
        let email;
        if(this.props.user){
            name =this.props.user.name;
            email =this.props.user.email;
        }

            if(LocalStorageHelper.getToken('token')){
                return (
                    <Container fluid={"true"} className="fixed-top shadow-sm p-2 m-0 bg-white">
                        <Row>
                            <Col className="p-1" lg={3} md={3} sm={12} xs={12}>
                                <Link to="/" className="btn"> <img className="nav-logo" src="images/logo.png" alt=""/></Link>
                                <Link to="/cart" className="cart-btn"><i className="fa fa-shopping-cart"/> {this.state.cartCount} items </Link>
                            </Col>
                            <Col className="p-1" lg={6} md={6} sm={12} xs={12}>
                                <div className="input-group w-100">
                                    <input onChange={this.SearchOnChange} name="example" list="exampleList" type="text" className="form-control" aria-label="Text input with segmented dropdown button"/>
                                    <button onClick={this.SearchOnClick} type="button" className="btn site-btn"><i className="fa fa-search"/></button>
                                </div>
    
                            </Col>
                            <Col className="p-1" lg={3} md={3} sm={12} xs={12}>
                                <Link to="/favourite" className="btn  nav-round-btn"><img src={love} alt="love"/> </Link>
                                <Link to="/orderlist" className="btn nav-round-btn"><img src={user} alt="user"/></Link>{name}
                                <button onClick={this.signOut} className="btn btn-light "> SIGN OUT</button>
                            </Col>
                        </Row>
                        {this.searchRedirect()}
                        {this.RedirectHome()}
                    </Container>
                );
            }
            else {

                return (
                    <Container fluid={"true"} className="fixed-top shadow-sm p-2 m-0 bg-white">
                    <Row>
                        <Col className="p-1" lg={4} md={4} sm={12} xs={12}>
                            <Link to="/" className="btn"> <img className="nav-logo" src="images/logo.png"/></Link>
                            <Link to="/cart" className="cart-btn"><i className="fa fa-shopping-cart"></i> {this.state.cartCount} items </Link>
                        </Col>
                        <Col className="p-1" lg={4} md={4} sm={12} xs={12}>
                            <div className="input-group w-100">
                                <input onChange={this.SearchOnChange} name="example" list="exampleList" type="text" className="form-control" aria-label="Text input with segmented dropdown button"/>
                                <button onClick={this.SearchOnClick} type="button" className="btn site-btn"><i className="fa fa-search"/></button>
                            </div>
                        </Col>
                        <Col className="p-1" lg={4} md={4} sm={12} xs={12}>
                            <Link to="/RegistrationPage" className="h4 btn">REGISTRATION </Link>
                            <Link to="/LoginPage" className="h4 btn">LOGIN </Link>
                        </Col>
                    </Row>
                    {this.searchRedirect()}
                    {this.RedirectHome()}
                    </Container>
                );
            }

    }
}

export default NavMenuDesktop;