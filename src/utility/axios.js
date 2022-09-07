import axios from "axios";
import { ClientError } from "./error";
import { buildResponse } from "./response";

export async function axiosClient(httpMethod, path, params, body, token) {
  const BASE_URL = "http://127.0.0.1:3000/api";
  try {
    let result = await axios({
      method: httpMethod.toLowerCase(),
      url: BASE_URL + path,
      headers: {
        Authorization: "Bearer " + token,
      },
      params: params,
      data: body,
      // paramsSerializer: (params) => {
      //   return qs.stringify(params);
      // },
    });
    // console.log(result);
    return buildResponse(result);
  } catch (err) {
    return buildResponse(new ClientError(9000, err));
  }
}
