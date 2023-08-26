import React, { useCallback, useEffect, useState } from "react";
import { json, useRoutes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import AuthContext from "./Contexts/authContext";
import api from "./Components/UserApi";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Index from "./pages/Index";
import Courseinfo from "./pages/Courseinfo";
import Category from "./pages/Category";
import ArticleInfo from "./pages/ArticleInfo";
import SignUp from "./pages/SignUp";
import Lodin from "./pages/Lodin";
import Search from "./pages/Search";

import Adminpanel from "./pages/AdminPanel/Index";

export default function App() {
  const [islogin, setislogin] = useState(false);
  const [token, settoken] = useState(false);
  const [userinfo, setuserinfo] = useState(false);

  const login = useCallback((userinfo, token) => {
    setislogin(true);
    setuserinfo(userinfo);
    settoken(token);
    localStorage.setItem("user", JSON.stringify({ token }));
  }, []);

  const logout = useCallback(() => {
    settoken(null);
    localStorage.removeItem("user");
    setuserinfo({});
  }, []);

  useEffect(() => {
    const getdataLocal = () => {
      const getlocalAuth = JSON.parse(localStorage.getItem("user"));

      if (getlocalAuth) {
        const response = api
          .get("/v1/auth/me", {
            headers: {
              Authorization: `Bearer ${getlocalAuth.token}`,
            },
          })
          .then(function (response) {
            setislogin(true);
            setuserinfo(response.data);
          });
      }else{
        setislogin(false)
      }
    };
    getdataLocal();
  }, [login , logout]);

  return (
    <AuthContext.Provider value={{ islogin, token, userinfo, login, logout }}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/course-info/:courseName" element={<Courseinfo />} />
            <Route path="/category-info/:categoryName" element={<Category />} />
            <Route path="/article-info/:articleName" element={<ArticleInfo />}/>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Lodin />} />
            <Route path="/search/:searchName" element={<Search />} />
          </Route>
          <Route path="/admin/*" element={<Adminpanel />} >
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
