import { api_response } from "./common";
import isEmpty from "lodash/isEmpty";

export const APIhandler = options => {
  let params = {};
  // get url params
  const routeParams = options.reqUrl.split("?");
  if (routeParams.length > 1) {
    let paramsStr = routeParams[1];
    paramsStr.split("&").map(data => {
      let keyValue = data.split("=");
      params[keyValue[0]] = keyValue[1] ? keyValue[1] : "";
      return "";
    });
  }

  // name: "dsds"
  // limit: "20"
  // skip: "0"
  return new Promise(async (resolve, reject) => {
    // console.log("params", params);
    if (api_response.length) {
      let response = api_response;
      if (!isEmpty(params.name)) {
        response = response.filter(item =>
          item["Transaction Details"]
            .toLowerCase()
            .includes(params.name.toLowerCase())
        );
      }
      let { skip = 0, limit = 10 } = params;
      skip = parseInt(skip);
      limit = parseInt(limit);
      return resolve({
        data: {
          totalElements: response.length,
          content: response.slice(skip, skip + limit)
        }
      });
    } else {
      return reject({});
    }
  });
};
