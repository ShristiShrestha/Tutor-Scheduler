import _ from "lodash";

export const getErrorMsg = (error) =>
  _.get(error, "response.static_data.error.error", "Something went wrong!");
