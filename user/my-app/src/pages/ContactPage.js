import React, {Component, Fragment} from 'react';
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import FooterDesktop from "../components/common/FooterDesktop";
import Contact from "../components/common/Contact";

class ContactPage extends Component {

    componentDidMount() {
        window.scroll(0,0)
    }


    render() {
        return (
            <Fragment>
                <div className="Desktop">
                    <NavMenuDesktop/>
                </div>

                <Contact/>

                <div className="Desktop">
                    <FooterDesktop/>
                </div>

            </Fragment>
        );
    }
}

export default ContactPage;