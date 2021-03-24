import axios from "axios";

export const Base_URL = "https://marketune-visualization-test.herokuapp.com";
export const Request = () => {
  return axios.create({
    baseURL: Base_URL,
    contentType: "application/json",
  });
};
