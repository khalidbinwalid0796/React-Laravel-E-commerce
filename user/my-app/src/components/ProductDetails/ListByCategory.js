import React, {Component, Fragment} from 'react';
import {Breadcrumb, Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

class ListByCategory extends Component {

    render() {
            const MyList=this.props.ProductData;
            const category_id=this.props.category_id;
            const CategoryName=this.props.CategoryName;
            const MyView=MyList.map((ProductList,i)=>{
            if(ProductList.special_price=="NA"){
                return <Col className="p-1" key={1} xl={2} lg={2} md={2} sm={4} xs={6} >
                    <Link to={"/productDetails/"+ProductList.product_code}>
                    <Card className="card h-100 w-100  image-box ">
                        <img src={ProductList.image}/>
                        <Card.Body>
                            <h5 className="product-name-on-card">{ProductList.title }</h5>
                            <p className="product-price-on-card">Price: { ProductList.price}TK</p>
                        </Card.Body>
                    </Card>
                    </Link>
                </Col>
            }
            else{

                return <Col className="p-1" key={1} xl={2} lg={2} md={2} sm={4} xs={6} >
                    <Link to={"/productDetails/"+ProductList.product_code}>
                    <Card className="card h-100 w-100  image-box ">
                        <img src={ProductList.image}/>
                        <Card.Body>
                            <h5 className="product-name-on-card">{ProductList.title }</h5>
                            <p className="product-price-on-card">
                                Price: <strike class="text-secondary">{ ProductList.price}TK</strike>  { ProductList.special_price}TK
                            </p>
                        </Card.Body>
                    </Card>
                    </Link>
                </Col>
            }

        })

        return (
            <Fragment>
                <Container className="text-center TopSection" fluid={true}>
                    <Row>
                    <Breadcrumb className="shadow-sm w-100 bg-white">
                        <Breadcrumb.Item> <Link to="/">Home</Link> </Breadcrumb.Item>
                        <Breadcrumb.Item> <Link to={"/ProductByCategory/"+category_id+"/"+CategoryName}>{CategoryName}</Link></Breadcrumb.Item>
                    </Breadcrumb>
                    </Row>
                    <Row>
                        {MyView}
                    </Row>
                </Container>

            </Fragment>
        );
    }
}

export default ListByCategory;