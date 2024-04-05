import axios from "axios";

//const baseURL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:30040";
const baseURL =
  "http://easyfund-production.eba-suv83ss2.us-east-1.elasticbeanstalk.com/api";
const baseURLDOC = "https://02ede33a-b196-40a7-87ea-40cc76ac4399.mock.pstmn.io";

const instance = axios.create({
  baseURL,
});
const instanceDocumentation = axios.create({
  baseURL: baseURLDOC,
});

const Axios = {
  instance,
  instanceDocumentation,
};

export default Axios;
