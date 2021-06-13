import { useEffect, useRef, useState } from "react";
import { toODataString } from "@progress/kendo-data-query";
import Notiflix from "notiflix";
import { authAxios } from "../config/authAxios";
import response from "../config/network/response";
import loadAxios from "../config/network/loadAxios";

const useLoaderTable = ({ url = null }) => {
  const [dataState, setDataState] = useState({
    take: 20,
    skip: 0,
  });

  const [dataResul, setDataResult] = useState();

  const dataStateChange = (e) => {
    setDataState(e.dataState);
  };

  const dataReceived = (products) => {
    setDataResult(products);
  };

  const baseUrl = `${process.env.REACT_APP_API_URL}/${url}?$count=true&`;

  const lastSuccess = useRef("");
  const pending = useRef("");

  const requestDataIfNeeded = async (reload = false) => {

    if ((toODataString(dataState) === lastSuccess.current) && !reload) {
      return;
    }
    
    pending.current = toODataString(dataState);
    
    try {
      const response = await loadAxios({ url: baseUrl + pending.current, method: "GET" });
      const json = response.data; 
      
      lastSuccess.current = pending.current;
      pending.current = "";

      if (toODataString(dataState) === lastSuccess.current) {
        dataReceived.call(undefined, {
          data: json.body,
          // total: json["@odata.count"],
          total: 1,
        });
      } else {
        requestDataIfNeeded();
      }
    } catch (error) {
      response.error(error);
    }
  };

  useEffect(() => {
    requestDataIfNeeded();
  }, [dataState]);

  return { dataResul, dataState, dataStateChange, requestDataIfNeeded };
};

export default useLoaderTable;
