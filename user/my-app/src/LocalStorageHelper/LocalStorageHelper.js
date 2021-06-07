import {reactLocalStorage} from 'reactjs-localstorage';
class LocalStorageHelper {

    // Set Get User Token
    static setToken(Token){
        reactLocalStorage.set("Token",Token)
    }
    static getToken(){
        return  reactLocalStorage.get("Token")
    }

    // Set Get User Email
    static setEmail(Email){
        reactLocalStorage.set("Email",Email)
    }
    static getEmail(){
        return  reactLocalStorage.get("Email")
    }

    // Set Get User Name
    static setName(Name){
        reactLocalStorage.set("Name",Name)
    }
    static getName(){
        return  reactLocalStorage.get("Name")
    }

    static storageClear(){
        reactLocalStorage.clear();
    }

    static SetRedirectFromDetails(winlocation){
        sessionStorage.setItem("winlocation",winlocation)
    }

    static GetRedirectFromDetails(){
        return sessionStorage.getItem("winlocation");
    }

}
export default LocalStorageHelper;