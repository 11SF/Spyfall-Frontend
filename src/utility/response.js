export function buildResponse(apiResponse) {
  if (apiResponse instanceof Error) {
    return {
      meta: {
        code: apiResponse.code,
        error: apiResponse.name,
        message: apiResponse.message,
      },
      data: null,
    };
  }
  return apiResponse.data;
}

export function buildMetaResponse(apiResponse) {
  if (apiResponse instanceof Error) {
    return {
      meta: {
        code: apiResponse.code,
        error: apiResponse.name,
        message: apiResponse.message,
      },
    };
  }
  return {
    meta: apiResponse.data.meta,
  };
}
