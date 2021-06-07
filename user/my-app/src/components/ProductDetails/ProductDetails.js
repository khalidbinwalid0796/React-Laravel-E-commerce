import React, {Component,Fragment} from 'react';
import {Container, Row, Col} from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import ApiURL from "../../api/ApiURL";
import axios from "axios";
import LocalStorageHelper from "../../LocalStorageHelper/LocalStorageHelper";
import {Redirect} from "react-router";
import ReviewList from "./ReviewList";
import SuggestedProducts from "./SuggestedProducts";

class ProductDetails extends Component {

    constructor() {
        super();
        this.state={
            previewImg:"0",
            isSize:null,
            isColor:null,
            color:"",
            size:"",
            quantity:"",
            productCode:null,
            PageRefreshStatus:false,
            PageRedirectStatus:false,
            addToCart:"Add To Cart",
            orderNow:"Order Now",
            addToFav:"Favourite",
            RedirectToLogin:false
        }
    }

    imgOnclick=(event)=>{
        let imgSrc= event.target.getAttribute('src');
        this.setState({previewImg:imgSrc})
    }



  PriceOption(special_price,price){
      if(special_price==="NA"){
          return(
              <p className="product-price-on-card">Price: { price}TK</p>
          )
      }
      else{
          return(
              <p className="product-price-on-card">
                  Price: <strike class="text-secondary">{ price}TK</strike>  { special_price} TK
              </p>
          )
      }

  }

  addToCart=()=>{
    if(LocalStorageHelper.getToken('token')){
        let isSize= this.state.isSize;
        let isColor= this.state.isColor;
        let productCode=this.state.productCode;
        let color=this.state.color;
        let size=this.state.size;
        let quantity=this.state.quantity;
        let Email=LocalStorageHelper.getEmail('email');

        if(isColor==="YES" && color.length===0){
            toast.error("Please Select Color",{position:'bottom-center'});
        }
        else if(isSize==="YES" && size.length===0){
            toast.error("Please Select Size",{position:'bottom-center'});
        }
        else if(quantity.length===0){
            toast.error("Please Select Quantity",{position:'bottom-center'});
        }
        else {
            this.setState({addToCart:"Adding.."})
            let MyFormData=new FormData();
            MyFormData.append("color",color);
            MyFormData.append("size",size);
            MyFormData.append("quantity",quantity);
            MyFormData.append("email",Email);
            MyFormData.append("product_code",productCode);
            axios.post(ApiURL.addToCart('productCode'),MyFormData).then((res)=>{
                if(res.data.success){
                    toast.success("Successfully Added To Cart",{position:'bottom-center'});
                    this.setState({PageRefreshStatus:true})
                    this.setState({addToCart:"Add To Cart"})
                }
                else {
                    toast.error("Product Already has on Cart",{position:'bottom-center'});
                    this.setState({addToCart:"Add To Cart"})
                }
            }).catch((err)=>{
                toast.error("Request Fail ! Try Again",{position:'bottom-center'})
                this.setState({addToCart:"Add To Cart"})
            })
        }
    }
    else {
        let winlocation=window.location.pathname;
        //alert(winlocation)-->/productDetails/p2
        LocalStorageHelper.SetRedirectFromDetails(winlocation);
        this.setState({RedirectToLogin:true})
    }
 }

 orderNow=()=>{
  if(LocalStorageHelper.getToken('token')){
      let isSize= this.state.isSize;
      let isColor= this.state.isColor;
      let productCode=this.state.productCode;
      let color=this.state.color;
      let size=this.state.size;
      let quantity=this.state.quantity;
      let Email=LocalStorageHelper.getEmail('email');
      if(isColor==="YES" && color.length===0){
          toast.error("Please Select Color",{position:'bottom-center'});
      }
      else if(isSize==="YES" && size.length===0){
          toast.error("Please Select Size",{position:'bottom-center'});
      }
      else if(quantity.length===0){
          toast.error("Please Select Quantity",{position:'bottom-center'});
      }
      else {
          this.setState({orderNow:"Processing.."})
          let MyFormData=new FormData();
          MyFormData.append("color",color);
          MyFormData.append("size",size);
          MyFormData.append("quantity",quantity);
          MyFormData.append("email",Email);
          MyFormData.append("product_code",productCode);
          axios.post(ApiURL.addToCart('productCode'),MyFormData).then((res)=>{
              if(res.data.success){
                  toast.success("Successfully Added To Cart",{position:'bottom-center'});
                  this.setState({orderNow:"Order Now"})
                  this.setState({PageRedirectStatus:true})
              }
              else {
                  this.setState({orderNow:"Order Now"})
                  toast.error("Product Already has on Cart",{position:'bottom-center'});
              }
          }).catch((err)=>{
              this.setState({orderNow:"Order Now"})
              toast.error("Request Fail ! Try Again",{position:'bottom-center'})
          })
      }
  }
 else {
      let winlocation=window.location.pathname;
      LocalStorageHelper.SetRedirectFromDetails(winlocation);
         this.setState({RedirectToLogin:true})
     }
 }

 addToFav=()=>{
     if(LocalStorageHelper.getToken('token')){
         this.setState({addToFav:"Adding..."})
         let productCode=this.state.productCode;
         let Email=LocalStorageHelper.getEmail('email');
         axios.get(ApiURL.AddFav(Email,productCode)).then((res)=>{
             if(res.data===1){
                 toast.success("Item Added",{position:'bottom-center'});
                 this.setState({addToFav:"Favourite"})
             }
             else {
                 toast.error("Request Fail ! Try Again",{position:'bottom-center'})
                 this.setState({addToFav:"Favourite"})
             }

         }).catch((err)=> {
             toast.error("Request Fail ! Try Again",{position:'bottom-center'})
             this.setState({addToFav:"Favourite"})
         })
     }
     else {
         let winlocation=window.location.pathname;
         LocalStorageHelper.SetRedirectFromDetails(winlocation);
         this.setState({RedirectToLogin:true})
     }

 }

  colorOnChange=(e)=>{
    let color= e.target.value;
    //alert(color)
    this.setState({color:color})
 }

 sizeOnChange=(e)=>{
     let size= e.target.value;
     this.setState({size:size})
 }

 quantityOnChange=(e)=>{
     let quantity= e.target.value;
     this.setState({ quantity:quantity})
 }

 PageRefresh=()=>{
    if(this.state.PageRefreshStatus===true){
        let URL=window.location;
        return(
               <Redirect to={URL}/>
         )
    }
}

PageRedirect=()=>{
    if(this.state.PageRedirectStatus===true){
        return(
            <Redirect to="/cart"/>
        )
    }
}

PageRedirectToLogin=()=>{
    if(this.state.RedirectToLogin===true){
        return <Redirect to="/LoginPage"/>
    }
}

    render() {
        let ProductData=this.props.ProductData;

        let title =ProductData['ProductList'][0]['title'];
        let price =ProductData['ProductList'][0]['price'];
        let special_price =ProductData['ProductList'][0]['special_price'];
        let image =ProductData['ProductList'][0]['image'];
        let category_id =ProductData['ProductList'][0]['category_id'];
        let subcategory_id =ProductData['ProductList'][0]['subcategory_id'];
        let remark =ProductData['ProductList'][0]['remark'];
        let brand =ProductData['ProductList'][0]['brand'];
        let star =ProductData['ProductList'][0]['star'];
        let product_code =ProductData['ProductList'][0]['product_code'];

        let img1 =ProductData['ProductDetails'][0]['img1'];

        if(this.state.previewImg==="0"){
            this.setState({previewImg:img1})
        }

        let img2 =ProductData['ProductDetails'][0]['img2'];
        let img3 =ProductData['ProductDetails'][0]['img3'];
        let img4 =ProductData['ProductDetails'][0]['img4'];
        
        let des =ProductData['ProductDetails'][0]['des'];
        let color =ProductData['ProductDetails'][0]['color'];
        let size =ProductData['ProductDetails'][0]['size'];
        let details =ProductData['ProductDetails'][0]['details'];

        var ColorDiv="d-none"
        if(color!="NA"){
            let ColorArray = color.split(',');
            var ColorOption=ColorArray.map((ColorList,i)=>{
                return <option value={ColorList}>{ColorList}</option>
            })
            ColorDiv=""
        }
        else{
            ColorDiv="d-none"
        }

        var SizeDiv="d-none"
        if(size!="NA"){
            let SizeArray = size.split(',');
            var  SizeOption=SizeArray.map((SizeList,i)=>{
                return <option value={SizeList}>{SizeList}</option>
            })
            SizeDiv=""
        }
        else{
            SizeDiv="d-none"
        }

        if(this.state.isSize===null){
            if(size!=="NA"){
                this.setState({isSize:"YES"})
            }
            else{
                this.setState({isSize:"NO"})
            }
        }

        if(this.state.isColor===null){
            if(color!=="NA"){
                this.setState({isColor:"YES"})
            }
            else{
                this.setState({isColor:"NO"})
            }
        }

        if(this.state.productCode===null){
            this.setState({productCode:product_code})
        }


        return (
            <Fragment>
                <Container fluid={true}  className="mt-5">
                    <Row className="p-2">
                        <Col className="shadow-sm bg-white pb-3 mt-4" md={12} lg={12} sm={12} xs={12}>
                            <Row>
                                <Col className="p-3" md={6} lg={6} sm={12} xs={12}>
                                    <InnerImageZoom
                                            zoomType={"hover"}
                                            zoomScale={1.8}
                                            src={this.state.previewImg}
                                            zoomSrc={this.state.previewImg} />
                                    <Container  className="my-3">
                                        <Row>
                                            <Col className="p-0 image-box m-0"  md={3} lg={3} sm={3} xs={3}>
                                                <img onClick={this.imgOnclick} className="w-100 Product-sm-img" src={img2}/>
                                            </Col>
                                            <Col className="p-0 image-box m-0" md={3} lg={3} sm={3} xs={3}>
                                                <img onClick={this.imgOnclick} className="w-100 Product-sm-img" src={img3}/>
                                            </Col>
                                            <Col className="p-0 image-box m-0" md={3} lg={3} sm={3} xs={3}>
                                                <img onClick={this.imgOnclick} className="w-100 Product-sm-img" src={img4}/>
                                            </Col>
                                            <Col className="p-0 image-box m-0" md={3} lg={3} sm={3} xs={3}>
                                                <img onClick={this.imgOnclick} className="w-100 Product-sm-img" src={img1}/>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                                <Col className="p-3 " md={6} lg={6} sm={12} xs={12}>
                                    <h5 className="Product-Name">{title}</h5>
                                    <h6 className="section-sub-title">{des}</h6>
                                    {this.PriceOption(special_price,price)}

                                    <div className={ColorDiv}>
                                        <h6 className="mt-2">Choose Color</h6>
                                        <select onChange={this.colorOnChange} className="form-control form-select">
                                            <option value="">Choose Color</option>
                                            {ColorOption}
                                        </select>
                                    </div>

                                    <div className={SizeDiv}>
                                        <h6 className="mt-2">Choose Size</h6>
                                        <select onChange={this.sizeOnChange} className="form-control form-select">
                                            <option value="">Choose Size</option>
                                            {SizeOption}
                                        </select>
                                    </div>

                                    <div className="">
                                        <h6 className="mt-2">Choose Quantity</h6>
                                        <select onChange={this.quantityOnChange} className="form-control form-select">
                                            <option value="">Choose Quantity</option>
                                            <option value="01">01</option>
                                            <option value="02">02</option>
                                            <option value="03">03</option>
                                            <option value="04">04</option>
                                            <option value="05">05</option>
                                            <option value="06">06</option>
                                            <option value="07">07</option>
                                            <option value="08">08</option>
                                            <option value="09">09</option>
                                            <option value="10">10</option>
                                        </select>
                                    </div>

                                    <div className="input-group mt-3">
                                        <button onClick={this.addToCart} className="btn site-btn m-1"><i className="fa fa-shopping-cart"></i>{this.state.addToCart}</button>
                                        <button onClick={this.orderNow} className="btn btn-primary m-1"><i className="fa fa-car"></i>{this.state.orderNow}</button>
                                        <button onClick={this.addToFav} className="btn btn-primary m-1"><i className="fa fa-heart"></i>{this.state.addToFav}</button>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col className="" md={6} lg={6} sm={12} xs={12}>
                                    <h6 className="mt-2">DETAILS</h6>
                                    { ReactHtmlParser(details) }
                                </Col>

                                <Col className="" md={6} lg={6} sm={12} xs={12}>
                                    <div className="shadow-sm p-3 bg-white">
                                        <ReviewList code={product_code}/>
                                    </div>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                </Container>
                {this.PageRefresh()}
                {this.PageRedirect()}
                {this.PageRedirectToLogin()}
                <SuggestedProducts subcategory_id={subcategory_id}/>
            </Fragment>
        );
    }
}

export default ProductDetails;