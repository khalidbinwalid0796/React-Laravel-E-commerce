import React, {Component, Fragment} from 'react';
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import NavMenuMobile from "../components/common/NavMenuMobile";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import axios from "axios";
import ApiURL from "../api/ApiURL";
import ListBySubCategory from "../components/ProductDetails/ListBySubCategory";
import ProductListLoader from "../components/placeholder/ProductListLoader";

class ProductListBySubCategory extends Component {

    constructor({match}) {
        super();
        this.state={
            subcategory_id:match.params.subcategory_id,
            category_id:match.params.category_id,
            subcat_name:match.params.subcat_name,
            ProductData:[],
            isLoading:"",
            MainDiv:"d-none"
        }

    }

    componentDidMount() {
        window.scroll(0,0)
        axios.get(ApiURL.ProductBySubCategory(this.state.category_id,this.state.subcategory_id)).then(response=> {
            this.setState({ProductData:response.data,isLoading:"d-none",MainDiv:" "})
        }).catch(error=> {

        });
    }

    render() {
        return (
            <Fragment>
                <div className="Desktop">
                    <NavMenuDesktop/>
                </div>
                <div className="Mobile">
                    <NavMenuMobile/>
                </div>

                <ProductListLoader isLoading={this.state.isLoading}/>
                <div className={this.state.MainDiv}>
                    <ListBySubCategory  category_id={this.state.category_id} subcategory_id={this.state.subcategory_id} subcat_name={this.state.subcat_name} ProductData={this.state.ProductData} />
                </div>

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

export default ProductListBySubCategory;