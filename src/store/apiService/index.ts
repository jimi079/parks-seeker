import axios from "axios";
import { API_KEY as API} from '../../common/constant/constant';


const API_KEY = process.env.REACT_APP_API_KEY ? process.env.REACT_APP_API_KEY : API;

/**
 * global api service
 */
const getUrl = (endpoint: string) =>
    `https://developer.nps.gov/api/v1/${endpoint}`;

const getConfigs = (config: Record<string, any>, additionalHeaders = {}) => ({
  headers: {
    'Accept': "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    ...additionalHeaders
  },
  ...config
});

const request = async (
  method: "get" | "post" | "put",
  endpoint: string,
  params = {},
  payload = {},
  additionalHeaders = {}
) => {
  let request;
  let newEndpoint = endpoint
  if (endpoint.length === 5) {
    newEndpoint+= `?api_key=${API_KEY}`
  } else {
    newEndpoint+= `&api_key=${API_KEY}`
  }
  if (method === "post" || method === "put") {
    request = axios[method](
        getUrl(newEndpoint),
        payload,
        getConfigs({ params }, additionalHeaders)
    );
  } else {
    request = axios.get(
        getUrl(newEndpoint),
        getConfigs({ params }, additionalHeaders)
    );
  }

  const { data } = await request;

  return data;
};

export const get = (endpoint: string, params = {}) =>
  request("get", endpoint, params);

export const post = (endpoint: string, data = {}, params = {}, headers = {}) =>
  request("post", endpoint, params, data, headers);

export const put = (endpoint: string, data = {}, params = {}) =>
  request("put", endpoint, params, data);
