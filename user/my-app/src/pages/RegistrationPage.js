import React, {Component, Fragment} from 'react';
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import FooterDesktop from "../components/common/FooterDesktop";
import Registration from "../components/common/Registration";

class RegistrationPage extends Component {

    render() {
        return (
            <Fragment>
                <div className="Desktop">
                    <NavMenuDesktop/>
                </div>

                <Registration/>

                <div className="Desktop">
                    <FooterDesktop/>
                </div>

            </Fragment>
        );
    }
}

export default RegistrationPage;