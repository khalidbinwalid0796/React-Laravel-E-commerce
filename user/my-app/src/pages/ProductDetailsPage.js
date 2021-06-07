import React, {Component, Fragment} from 'react';
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import FooterDesktop from "../components/common/FooterDesktop";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import axios from "axios";
import ApiURL from "../api/ApiURL";
import ProductDetailsPlaceholder from "../components/placeholder/ProductDetailsPlaceholder";

class ProductDetailsPage extends Component {

    constructor({match}) {
        super();
        this.state={
            product_code:match.params.product_code,
            ProductData:[],
            isLoading:"BetweenTwoSection",
            MainDiv:"d-none"
        }
    }

    componentDidMount() {
        window.scroll(0,0);

        axios.get(ApiURL.ProductDetails(this.state.product_code)).then(response=> {
            this.setState({ProductData:response.data,isLoading:"d-none",MainDiv:" "})
        }).catch(error=> {

        });

    }

    render() {

            if(this.state.MainDiv=="d-none"){

                return (
                    <Fragment>
                        <div className="Desktop">
                            <NavMenuDesktop/>
                        </div>
                    
                        <ProductDetailsPlaceholder isLoading={this.state.isLoading}/>

                    </Fragment>

                );
            }
            else{
                return (
                    <Fragment>
                        <div className="Desktop">
                            <NavMenuDesktop/>
                        </div>

                        <ProductDetails ProductData={this.state.ProductData}/>

                        <div className="Desktop">
                            <FooterDesktop/>
                        </div>

                    </Fragment>

                );
            }



    }
}

export default ProductDetailsPage;