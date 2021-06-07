import React, {Component, Fragment} from 'react';
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import FooterDesktop from "../components/common/FooterDesktop";
import ListByCategory from "../components/ProductDetails/ListByCategory";
import axios from "axios";
import ApiURL from "../api/ApiURL";
import ProductListLoader from "../components/placeholder/ProductListLoader";

class ProductListByCategory extends Component {

    constructor({match}) {
        super();
        this.state={
            category_id:match.params.category_id,
            CategoryName:match.params.CategoryName,
            ProductData:[],
            isLoading:"",
            MainDiv:"d-none"
        }

    }


    componentDidMount() {
        window.scroll(0,0)
        axios.get(ApiURL.ProductByCategory(this.state.category_id)).then(response=> {
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

                <ProductListLoader isLoading={this.state.isLoading}/>
                <div className={this.state.MainDiv}>
                    <ListByCategory category_id={this.state.category_id}  CategoryName={this.state.CategoryName}  ProductData={this.state.ProductData} />
                </div>

                <div className="Desktop">
                    <FooterDesktop/>
                </div>
    
            </Fragment>
        );
    }
}

export default ProductListByCategory;