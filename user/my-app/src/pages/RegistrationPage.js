import React, {Component, Fragment} from 'react';
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import NavMenuMobile from "../components/common/NavMenuMobile";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import Registration from "../components/common/Registration";
import axios from "axios";
import ApiURL from "../api/ApiURL";

class RegistrationPage extends Component {


    constructor(props) {
        super(props);
        this.state={
            user:{},
        }
    }

    componentDidMount()
    {
        window.scroll(0,0);

        //login user credentials
        
        axios.get(ApiURL.user)
        .then((response)=> {
            this.setUser(response.data)
        })
        .catch( (error) => {
            console.log(error);
        });
          
    }

    setUser =(user) =>{
        this.setState({user:user})
    }


    render() {
        return (
            <Fragment>
                <div className="Desktop">
                    <NavMenuDesktop user={this.state.user} setUser={this.setUser}/>
                </div>
                <div className="Mobile">
                    <NavMenuMobile/>
                </div>

                <Registration/>

                <div className="Desktop">
                    <FooterDesktop/>
                </div>
                <div className="Mobile">
                    <FooterMobile/>
                </div>

            </Fragment>
        );
    }
}

export default RegistrationPage;