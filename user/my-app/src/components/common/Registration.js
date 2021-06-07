import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import LocalStorageHelper from "../../LocalStorageHelper/LocalStorageHelper";
import { Redirect } from 'react-router-dom';

class UserOnboard extends Component {

    constructor() {
        super();
        this.state={
            name:'',
            email:'',
            mobile:'',
            password:'',
            password_confirmation:'',
            UserRedirect:false
        }
        this.onUserRedirect=this.onUserRedirect.bind(this);
    }



    formSubmit =(e)=>{
        e.preventDefault();
        const data={
            name:this.state.name,
            email:this.state.email,
            mobile:this.state.mobile,
            password:this.state.password,
            password_confirmation:this.state.password_confirmation
        }

        axios.post(ApiURL.register, data)
          .then((response)=> {
            LocalStorageHelper.setToken('token',response.data.token);       //token store on local storage
                this.setState({
                    UserRedirect:true
                })

                toast.success("Registration Success",{
                    position:"bottom-center"
                });

          })
          .catch( (error) => {
            console.log(error);
          });

     }

     onUserRedirect(){
        if(this.state.UserRedirect===true){
            return(<Redirect to="/"/>)
        }
    }

    render() {

        return (
            <Fragment>
                <Container className="TopSection">
                    <Row className="p-2">
                        <Col className="shadow-sm bg-white mt-2" md={12} lg={12} sm={12} xs={12}>
                            <Row className="text-center ">
                                <Col className="d-flex justify-content-center" md={6} lg={6} sm={12} xs={12}>
                                    <Form className=" onboardForm" onSubmit={this.formSubmit}>
                                        <h4 className="section-title">USER SING UP</h4>
                                        <h6 className="section-sub-title">Please Enter Your Name, Email, Mobile, Password And Go Next</h6>
                                        <input className="form-control m-2" type="text" placeholder="Name" required onChange={(e)=>{this.setState({name:e.target.value})}}/>
                                        <input className="form-control m-2" type="text" placeholder="Email" required onChange={(e)=>{this.setState({email:e.target.value})}}/>
                                        <input className="form-control m-2" type="text" placeholder="Mobile" required onChange={(e)=>{this.setState({mobile:e.target.value})}}/>
                                        <input className="form-control m-2" type="password" placeholder="Password" required onChange={(e)=>{this.setState({password:e.target.value})}}/>
                                        <input className="form-control m-2" type="password" placeholder="password_confirmation" required onChange={(e)=>{this.setState({password_confirmation:e.target.value})}}/>
                                        {/* <Button className="btn btn-block m-2 site-btn">Next</Button> */}
                                        <button type="submit" class="btn btn-block m-2 site-btn">Next</button>
                                    </Form>
                                </Col>
                                <Col className="p-0 Desktop m-0" md={6} lg={6} sm={6} xs={6}>
                                    <img className="onboardBanner" src="Images/otppagebanner.png"/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                {this.onUserRedirect()}
            </Fragment>
        );
    }
}

export default UserOnboard;