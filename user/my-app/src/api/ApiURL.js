class ApiURL{
    
    static BaseURL="http://127.0.0.1:8000/api/";
    static  VisitorDetails=this.BaseURL+"VisitorDetails";
    static  SendContactDetails=this.BaseURL+"SendContactDetails";
    static  GetSiteInfo=this.BaseURL+"GetSiteInfo";
    static  GetCatwithSubcat=this.BaseURL+"GetCatwithSubcat";
    static  GetSliderInfo=this.BaseURL+"GetSliderInfo";

    static  ProductByCategory(category_id,CategoryName){
        return this.BaseURL+"ProductByCategory/"+category_id+"/"+CategoryName;
    };

    static  ProductBySubCategory(category_id,subcategory_id,subcat_name){
        return this.BaseURL+"ProductBySubCategory/"+category_id+"/"+subcategory_id+"/"+subcat_name;
    };

    static  ProductByRemark(Remark){
        return this.BaseURL+"ProductByRemark/"+Remark;
    };

    static  ProductDetails(product_code){
        return this.BaseURL+"ProductDetails/"+product_code;
    }

    static  ProductBySearch(search_key){
        return this.BaseURL+"ProductBySearch/"+search_key;
    }

    static  login=this.BaseURL+"login";
    static  register=this.BaseURL+"register";
    static  user=this.BaseURL+"user";

    //static  addToCart=this.BaseURL+"addToCart";
    static  addToCart(product_code){
        return this.BaseURL+"addToCart/"+product_code;
    }
    static  CartCount(email){
        return this.BaseURL+"CartCount/"+email;
    }
    static  CartList(email){
        return this.BaseURL+"CartList/"+email;
    }
    static RemoveCartList(id){
        return this.BaseURL+"RemoveCartList/"+id;
    }
    static CartItemMinus(id,quantity,price){
        return this.BaseURL+"CartItemMinus/"+id+"/"+quantity+"/"+price;
    }
    static CartItemPlus(id,quantity,price){
        return this.BaseURL+"CartItemPlus/"+id+"/"+quantity+"/"+price;
    }
    static  CartOrder=this.BaseURL+"CartOrder";

    static  OrderListByUser(email){
        return this.BaseURL+"OrderListByUser/"+email;
    }

    static  AddFav(email,product_code){
        return this.BaseURL+"addFav/"+product_code+"/"+email;
    }
    static  favList(email){
        return this.BaseURL+"favList/"+email;
    }
    static  removeFavItem(email,product_code){
        return this.BaseURL+"removeFavItem/"+product_code+"/"+email;
    }

    static  postReview=this.BaseURL+"postReview";
    static  ReviewList(product_code){
        return this.BaseURL+"reviewList/"+product_code;
    }

    static SimilarProduct(subcategory_id){
        return this.BaseURL+"SimilarProduct/"+subcategory_id;
    }
}
export default ApiURL;
