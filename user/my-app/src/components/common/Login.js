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
            email:'',
            password:'',
            message:'',
            UserRedirect:false
        }
        this.onUserRedirect=this.onUserRedirect.bind(this);
    }

    //after form submit
    formSubmit  = (e) =>{
        e.preventDefault();
        const data={
            email:this.state.email,
            password:this.state.password
        }

        axios.post(ApiURL.login, data)
          .then((response)=> {
              let token = response.data.token;
              let uname = response.data.user.name;
                LocalStorageHelper.setToken(token);       //token store on local storage
                LocalStorageHelper.setEmail(this.state.email);
                LocalStorageHelper.setName(uname);
                this.setState({
                    UserRedirect:true
                })

          })
          .catch( (error) => {
              this.setState({message:error.response.data.message})
              toast.error(this.state.message,{
                position:"bottom-center"
            });
          });
    /* 
        .catch(function (error) {
            toast.error("Request Fail ! Try Again",{
                position:"bottom-center"
            });
            sendBtn.innerHTML="Send"
        }) 
    */
    }

    onUserRedirect(){
        if(this.state.UserRedirect===true){
            let winPath=LocalStorageHelper.GetRedirectFromDetails('winlocation')
            if(winPath===null){
                return(<Redirect to="/"/>)
            }
            else {
                return(<Redirect to={winPath}/>)
            }
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
                                        <h4 className="section-title">USER SING IN</h4>
                                        <h6 className="section-sub-title">Please Enter Your Email, Password And Go Next</h6>
                                        <input className="form-control m-2" type="text" placeholder="Email" required onChange={(e)=>{this.setState({email:e.target.value})}}/>
                                        <input className="form-control m-2" type="password" placeholder="Password" required onChange={(e)=>{this.setState({password:e.target.value})}}/>
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