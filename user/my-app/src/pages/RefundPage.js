import React, {Component, Fragment} from 'react';
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import FooterDesktop from "../components/common/FooterDesktop";
import Refund from "../components/Others/Refund";

class RefundPage extends Component {
    componentDidMount() {
        window.scroll(0,0)
    }

    render() {
        return (
            <Fragment>
                <div className="Desktop">
                    <NavMenuDesktop/>
                </div>

                <Refund/>

                <div className="Desktop">
                    <FooterDesktop/>
                </div>

            </Fragment>
        );
    }
}

export default RefundPage;