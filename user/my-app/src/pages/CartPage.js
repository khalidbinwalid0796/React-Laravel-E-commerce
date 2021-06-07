import React, {Component,Fragment} from 'react';
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import FooterDesktop from "../components/common/FooterDesktop";
import CartList from "../components/Cart/CartList";
import {Redirect} from "react-router";
import LocalStorageHelper from "../LocalStorageHelper/LocalStorageHelper";

class CartPage extends Component {

    constructor() {
        super();
        this.state={
            RedirectStatus:false,
        }
    }

    pageRedirect=()=>{
        if(this.state.RedirectStatus===true){
            return(
                <Redirect to="/LoginPage"/>
            )
        }
    }

    componentDidMount() {
        window.scroll(0,0)
        let token= LocalStorageHelper.getToken('Token');
        if(token===null){
            this.setState({RedirectStatus:true})
        }else{
            this.setState({RedirectStatus:false})
        }
    }

    render() {
        return (
            <Fragment>
                <div className="Desktop">
                    <NavMenuDesktop/>
                </div>

                <CartList/>

                <div className="Desktop">
                    <FooterDesktop/>
                </div>

                {this.pageRedirect()}
            </Fragment>
        );
    }
}

export default CartPage;