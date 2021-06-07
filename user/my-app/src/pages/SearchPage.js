import React, {Component, Fragment} from 'react';
import axios from "axios";
import ApiURL from "../api/ApiURL";
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import ProductListLoader from "../components/placeholder/ProductListLoader";
import FooterDesktop from "../components/common/FooterDesktop";
import SearchList from "../components/ProductDetails/SearchList";

class SearchPage extends Component {

    constructor({match}) {
        super();
        this.state={
            search_key:match.params.search_key,
            ProductData:[],
            isLoading:"",
            MainDiv:"d-none"
        }

    }


    componentDidMount() {
        window.scroll(0,0)
        axios.get(ApiURL.ProductBySearch(this.state.search_key)).then(response=> {
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
                    <SearchList search_key={this.state.search_key}  ProductData={this.state.ProductData} />
                </div>

                <div className="Desktop">
                    <FooterDesktop/>
                </div>

            </Fragment>
        );
    }
}

export default SearchPage;