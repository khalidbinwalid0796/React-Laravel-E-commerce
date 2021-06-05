import React, {Component,Fragment} from 'react';
import FeaturedProducts from "../components/home/FeaturedProducts";
import Categories from "../components/home/Categories";
import Collection from "../components/home/Collection";
import NewArrival from "../components/home/NewArrival";
import HomeTop from "../components/home/HomeTop";
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import NavMenuMobile from "../components/common/NavMenuMobile";
import HomeTopMobile from "../components/home/HomeTopMobile";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import axios from "axios";
import ApiURL from "../api/ApiURL";

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state={
            user:{},
        }
    }

    componentDidMount()
    {
        window.scroll(0,0);
        this.GetVisitorDetails();

        //login user credentials
        
        axios.get(ApiURL.user)
        .then((response)=> {
            this.setUser(response.data)
        })
        .catch( (error) => {
            console.log(error);
        });
          
    }

    GetVisitorDetails=()=>{
        axios.get(ApiURL.VisitorDetails).then().catch();
    }

    setUser =(user) =>{
        this.setState({user:user})
    }

    render() {
        return (
            <Fragment>
                <div className="Desktop">
                    <NavMenuDesktop user={this.state.user} setUser={this.setUser}/>
                    <HomeTop/>
                </div>
                <div className="Mobile">
                    <NavMenuMobile />
                    <HomeTopMobile/>
                </div>


                <FeaturedProducts/>
                <NewArrival/>
                <Collection/>
                <Categories/>


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
export default HomePage;