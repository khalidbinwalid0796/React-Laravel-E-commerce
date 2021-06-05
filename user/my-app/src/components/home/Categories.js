import React, {Component,Fragment} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import {Link} from "react-router-dom";
import ApiURL from "../../api/ApiURL";
import CategoryPlaceholder from "../placeholder/CategoryPlaceholder";

class Categories extends Component {

    constructor() {
        super();
        this.state={
            Categories:[],
            isLoading:"BetweenTwoSection",
            MainDiv:"d-none"
        }
    }


    componentDidMount() {
        axios.get(ApiURL.GetCatwithSubcat).then(response=> {
            this.setState({
                Categories:response.data,
                isLoading:"d-none",
                MainDiv:" "
            })
        }).catch(error=> {

        });
    }


    render() {

        const MyList=this.state.Categories;

        const MyView=MyList.map((Category,i)=>{

            return <Col key={i.toString()} className="p-0" key={1} xl={2} lg={2} md={2} sm={6} xs={6} >
                <Link to={"ProductByCategory/"+Category.CategoryId+"/"+Category.CategoryName}>
                    <Card className="h-100 w-100 text-center">
                        <Card.Body>
                            <img className="w-75" src={Category.CategoryImg}/>
                            <h5 className="category-name">{Category.CategoryName}</h5>
                        </Card.Body>
                    </Card>
                </Link>
                
            </Col>

        })


        return (

            <Fragment>
                <CategoryPlaceholder isLoading={this.state.isLoading}/>

                <div className={this.state.MainDiv}>
                <Container className="text-center pt-3  BetweenTwoSection" fluid={true}>
                    <h4 className="section-title">CATEGORIES</h4>
                    <h6 className="section-sub-title pb-3">Some Of Our Exclusive Collection, You May Like</h6>
                    <Row>
                        {MyView}
                    </Row>
                </Container>
                </div>

            </Fragment>
        );
    }
}

export default Categories;