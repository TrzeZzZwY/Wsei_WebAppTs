import { jwt } from '../types/jwt';
import axios, { AxiosInstance } from "axios";
import { user } from '../types/user';

export class jwtService{
    private axiosInstance:AxiosInstance;
    private _localStoragePrefix: string = "jwt";

    constructor() {
        this.axiosInstance = axios.create(
            {
                baseURL: "http://127.0.0.1:3000/",
                headers: {
                    "Content-Type" : "application/json; charset=UTF-8"
                }
            }
        )
    }
     
    login(login: string, password: string) {
        const post = {
            user: login,
            password: password
        }
        
        return this.axiosInstance.post("token",post,{ validateStatus: (status: number) => {
            return status == 200
        }})
        .then(res => {
            const jwt: jwt = {
                token: res.data.token,
                refreshToken: res.data.refreshToken
            }
            localStorage.setItem(this._localStoragePrefix, JSON.stringify(jwt));
            return jwt
        })
        .catch(error => console.log(error))
    }

    GetToken():jwt | null{
        return this.getJWT();
    }

    Refresh(){
        const jwt = this.getJWT();
        if(!jwt) return null;

        const post = {
            refreshToken: jwt.refreshToken ?? ""
        }

        return this.axiosInstance.post("refreshToken",post,{ validateStatus: (status: number) => {
            return status == 200
        }})
        .then(res => {
            const jwt: jwt = {
                token: res.data.token,
                refreshToken: res.data.refreshToken
            }
            localStorage.setItem(this._localStoragePrefix, JSON.stringify(jwt));
        })
        .catch(error => localStorage.setItem(this._localStoragePrefix, ""))
    }

    logout(){
        localStorage.setItem(this._localStoragePrefix, "")
    }

    protected(user: user){
        return this.axiosInstance.get("protected")
    }

    private getJWT() : jwt | null{
        const jsonJwt = localStorage.getItem(this._localStoragePrefix);
        return jsonJwt ? JSON.parse(jsonJwt): null;
    }

}
