import Cookies from "js-cookie";
import { LOGIN, LOGOUT } from '../types';

export const login = (isAuthenticated : boolean) => {

    Cookies.set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", {
        expires: 0.01,
      });

    return {
        type: "LOGIN",
        payload: isAuthenticated
      }
}

export const logout = () => {

    Cookies.remove("token");

    return {
        type: "LOGOUT",
        // payload: isAuthenticated
      }
}