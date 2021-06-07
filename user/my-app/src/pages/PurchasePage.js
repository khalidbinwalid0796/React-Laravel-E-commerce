import React, {Component, Fragment} from 'react';
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import FooterDesktop from "../components/common/FooterDesktop";
import Purchase from "../components/Others/Purchase";

class PurchasePage extends Component {
    componentDidMount() {
        window.scroll(0,0)
    }

    render() {
        return (
            <Fragment>
                <div className="Desktop">
                    <NavMenuDesktop/>
                </div>

                <Purchase/>

                <div className="Desktop">
                    <FooterDesktop/>
                </div>

            </Fragment>
        );
    }
}

export default PurchasePage;