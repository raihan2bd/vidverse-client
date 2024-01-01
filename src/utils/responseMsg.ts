export const errMsgWithStatus = (error: any) => {
  const msg: string =
    error && error.response && error.response.data && error.response.data.error
      ? error.response.data.error
      : error.message
      ? error.message
      : "Something went wrong";
  const status: number =
    error && error.response && error.response.status
      ? error.response.status
      : 500;
  return { errMsg: msg, status };
};

export const successMsg = (response: any, defaultMsg: string): string => {
  return response && response.data && response.data.message
    ? response.data.message
    : defaultMsg
    ? defaultMsg
    : "Success";
};
