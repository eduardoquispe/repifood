import { useEffect, useRef, useState } from "react";
import { toODataString } from "@progress/kendo-data-query";
import Notiflix from "notiflix";
import authAxios from "../config/authAxios";
import response from "../config/network/response";

const useLoaderTable = () => {
  const [dataState, setDataState] = useState({
    take: 20,
    skip: 0,
  });

  const [dataResul, setDataResult] = useState();

  const dataStateChange = (e) => {
    setDataState(e.dataState);
  };

  const dataReceived = (products) => {
    Notiflix.Loading.remove();
    setDataResult(products);
  };

  const baseUrl = "https://demos.telerik.com/kendo-ui/service-v4/odata/Products?$count=true&";

  const lastSuccess = useRef("");
  const pending = useRef("");

  const requestDataIfNeeded = async (reload = false) => {

    Notiflix.Loading.init({
      svgColor: "#023ca1",
      backgroundColor: "rgba(132,131,131,0.191)",
    });
    Notiflix.Loading.pulse();

    if ((pending.current || toODataString(dataState) === lastSuccess.current) && !reload) {
      Notiflix.Loading.remove();
      return;
    }

    pending.current = toODataString(dataState);
    
    try {
      const response = await authAxios.get(baseUrl + pending.current);
      const json = response.data; 
      
      lastSuccess.current = pending.current;
      pending.current = "";

      if (toODataString(dataState) === lastSuccess.current) {
        dataReceived.call(undefined, {
          data: json.value,
          total: json["@odata.count"],
        });
      } else {
        requestDataIfNeeded();
      }
    } catch (error) {
      response.error(error);
      Notiflix.Loading.remove();
    }
  };

  useEffect(() => {
    requestDataIfNeeded();
  }, [dataState]);

  return { dataResul, dataState, dataStateChange, requestDataIfNeeded };
};

export default useLoaderTable;
