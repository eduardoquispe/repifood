import { useEffect, useRef, useState } from "react";
import { toODataString } from "@progress/kendo-data-query";
import response from "../config/network/response";
import loadAxios from "../config/network/loadAxios";

const useLoaderTable = ({ url = null }) => {
  const [dataState, setDataState] = useState({
    take: 20,
    skip: 0,
  });

  const [baseUrl, setBaseUrl] = useState(`${process.env.REACT_APP_API_URL}/${url}?$count=true&`);

  const [dataResul, setDataResult] = useState();

  const dataStateChange = (e) => {
    setDataState(e.dataState);
  };

  const dataReceived = (products) => {
    setDataResult(products);
  };

  const lastSuccess = useRef("");
  const pending = useRef("");
  const infoHelperRef = useRef(null);

  const handleCustomSearch = (e) => {
    if (e.key === 'Enter') {
      const valueSearch = e.target.value;
      requestDataIfNeeded(true, {search: valueSearch});
    }
  }

  const requestDataIfNeeded = async (reload = false, infoHelper = null) => {
    
    if ((toODataString(dataState) === lastSuccess.current) && !reload) {
      return;
    }

    pending.current = toODataString(dataState);
    
    try {

      let addUrl = '';

      if(infoHelper || infoHelperRef.current) {
       
        if(infoHelper !== infoHelperRef.current && infoHelper) {
          infoHelperRef.current = infoHelper;
        }
        addUrl = convertQueryString(infoHelperRef.current);
      }

      const response = await loadAxios({ url: baseUrl + pending.current + addUrl, method: "GET" });
      const json = response.data; 
      
      lastSuccess.current = pending.current;
      pending.current = "";

      if (toODataString(dataState) === lastSuccess.current) {
        dataReceived.call(undefined, {
          data: json.body.data,
          total: json.body.total,
        });
      } else {
        requestDataIfNeeded();
      }
    } catch (error) {
      console.log(error);
      response.error(error);
    }
  };

  useEffect(() => {
    requestDataIfNeeded();
  }, [dataState]);

  return { dataResul, dataState, handleCustomSearch, setBaseUrl, setDataState, baseUrl, dataStateChange, requestDataIfNeeded };
};

export default useLoaderTable;

const convertQueryString = (objQuery = {}) => {
  if (!Object.keys(objQuery).length) {
    return '';
  }

  let queryString = '';

  (Object.keys(objQuery)).forEach(key => {
    queryString += `&$${key}=${objQuery[key]}&`;
  })

  return queryString;

}
