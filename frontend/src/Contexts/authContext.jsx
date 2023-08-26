import { createContext } from "react";

const AuthContext = createContext({
    islogin : false ,
    token : null ,
    userinfo : null ,
    login : () => {} ,
    logout : () => {}
})


export default AuthContext

