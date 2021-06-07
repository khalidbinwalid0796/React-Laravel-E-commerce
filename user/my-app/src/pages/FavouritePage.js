import React, {Component, Fragment} from 'react';
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import Policy from "../components/Others/Policy";
import FooterDesktop from "../components/common/FooterDesktop";
import Favourite from "../components/Favourite/Favourite";
import {Redirect} from "react-router";
import LocalStorageHelper from "../LocalStorageHelper/LocalStorageHelper";

class FavouritePage extends Component {

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
        let token=LocalStorageHelper.getToken('Token');
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

                <Favourite/>

                <div className="Desktop">
                    <FooterDesktop/>
                </div>

                {this.pageRedirect()}
            </Fragment>
        );
    }
}

export default FavouritePage;