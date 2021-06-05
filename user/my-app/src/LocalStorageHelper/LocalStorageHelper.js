import {reactLocalStorage} from 'reactjs-localstorage';
class LocalStorageHelper {

    // Set Get User Token
    static setToken(Token){
        reactLocalStorage.set("Token",Token)
    }
    static getToken(){
        return  reactLocalStorage.get("Token")
    }
    static storageClear(){
        reactLocalStorage.clear();
    }

    // Set Get User Email
    static setEmail(Email){
        reactLocalStorage.set("Email",Email)
    }
    static getEmail(){
        return  reactLocalStorage.get("Email")
    }

    static SetRedirectFromDetails(winlocation){
        sessionStorage.setItem("winlocation",winlocation)
    }

    static GetRedirectFromDetails(){
        return sessionStorage.getItem("winlocation");
    }

}
export default LocalStorageHelper;