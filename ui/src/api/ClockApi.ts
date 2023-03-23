import Api from "../utils/ApiUtils";

export const putClockSpeed = (props) => {
  return Api.apiCall({
    url: "/clock",
    method: "PUT",
    data: props,
  });
};

export const patchClockRun = (props) => {
  return Api.apiCall({
    url: "/clock",
    method: "PATCH",
    data: props,
  });
};

export const syncClockTime = () => {
  return Api.apiCall({
    url: "/clock",
    method: "GET",
  });
};
