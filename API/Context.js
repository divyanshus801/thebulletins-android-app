import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { getCategoriesAPI, getNewsAPI, getSourceAPI } from "./api";

export const NewsContext = createContext();

const Context = ({ children }) => {
  const [news, setNews] = useState([]);
  const [notificationArray, setNotificationArray] = useState([]);
  const [category, setCategory] = useState("general");
  const [categoryArray, setCategoryArray] = useState([]);
  const [source, setSource] = useState();
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(1);
  const [darkTheme, setDarkTheme] = useState(true);
  

  // const fetchNews = async (reset = category) => {
  //   const { data } = await axios.get(getNewsAPI(reset));
  //   setNews(data);
  //   setIndex(1);
  // };

  const fetchNewsfromSource = async () => {
    if(category === "general"){
      try {
        setLoading(true);
        const { data } = await axios.get(getSourceAPI());
        setNews(data);
        setLoading(false);
        setNotificationArray(data);
        setIndex(1);
      } catch (error) {
        console.log(error);
      }
    }
    else{
      try {
        setLoading(true);
        const { data } = await axios.get(`https://thebulletins-server.herokuapp.com/api/news/${category}`);
        setNews(data);
        setLoading(false);
        setIndex(1);
      } catch (error) {
        console.log(error);
      }
    }
   
  };

  const fetchCategoryfromSource = async () => {
    try {
      const { data } = await axios.get(getCategoriesAPI());
      setCategoryArray(data);
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   fetchNews();
  // }, [category]);

  useEffect(() => {
    fetchNewsfromSource();
    fetchCategoryfromSource();
    
  }, [category]);

  return (
    <NewsContext.Provider
      value={{
        news,
        setCategory,
        setNews,
        categoryArray,
        notificationArray,
        index,
        setIndex,
        setSource,
        darkTheme,
        setDarkTheme,
        fetchNewsfromSource,
        setLoading,
        loading
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export default Context;
