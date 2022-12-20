import { useState } from "react";

const useFetch = (baseUrl: string) => {

  // dynamic interace
  type commonArgs = {
    params: object;
    headers: HeadersInit;
  };

  const requiredHeadears = {
    // "content-type": "application/json",
    "Ced-Source-Id": 476,
    "Ced-Source-Name": "shopify",
    "Ced-Target-Id": 479,
    "Ced-Target-Name": "amazon",
    appCode:
      "eyJzaG9waWZ5IjoiYW1hem9uX3NhbGVzX2NoYW5uZWwiLCJhbWF6b24iOiJhbWF6b24ifQ==",
    appTag: "amazon_sales_channel",
    authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjk2ZDYwZDVlMzE3NjI3NThiMmY5Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjk4OTA3Mzc0LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNjIxMTZlNTdiNGE3NjNlYzM5YWY5MiJ9.FXwul26U6GG2d9Wrfh5lNu-ikW_vwZ0tbBdjmoVTWhF3tOibyff7buM3tuIcgOkti9UvBpKtTo-SRU8A5UNEah37q1K1k-GQOSdwYxO1Q4Z9oF5AkIk8whl_-gZymjUqlMO0fjKJie6a_A4vxYk-PF8DEUHHOsc0MHeQA7TuaHR95fbV281SVXcmEP17_snN-eNsdOoP70vqiER3BkLV7Nr78JoSNZ38iqqznHEDKkLAgr2p3qI4OKZ7S6SiQglh1YfZgt4oZho868e8RAuV9QSomVpuuXAmyBHDGbUPrLTqvhj_CnzvQzEiNDnu__oh9UbWkTdZdAZhY_S5uzBMYg",
  };
  interface OBJI {
    [name: string]: any;
  }
  const get = (endpoint: string, additionalArgs: commonArgs) => {
    if (!additionalArgs.hasOwnProperty("params")) {
      additionalArgs["params"] = {};
    }

    if (!additionalArgs.hasOwnProperty("headers")) {
      additionalArgs["headers"] = {};
    }

    let url: string;

    url = baseUrl + endpoint;
    let finalHeaders: OBJI;

    if (Object.keys(additionalArgs.params).length) {
      url += `?${new URLSearchParams({ ...additionalArgs.params }).toString()}`;
    }

    if (Object.keys(additionalArgs.headers).length) {
      finalHeaders = additionalArgs.headers;
    } else {
      finalHeaders = requiredHeadears;
    }

    return fetch(url, {
      method: "GET",
      headers: finalHeaders,
    }).then((response) => response.json());
  };

  const post = (endpoint: string, payload: string) => {
    return fetch(baseUrl + endpoint, {
      method: "post",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => response.json());
  };

  const put = (endpoint: string, payload: string) => {
    return fetch(baseUrl + endpoint, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => response.json());
  };

  const del = (endpoint: string) => {
    return fetch(baseUrl + endpoint, {
      method: "DELETE",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => response.json());
  };


  return [{ get, post, put, del }];
};

export { useFetch };
