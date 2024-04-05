import axios from "../utils/axios";

const { instance, instanceDocumentation } = axios;

const token = localStorage.getItem("token");

const login = ({ email, password }: any) =>
  instance.post("/test/login", { email, password });

const getCurrencies = () =>
  instance.get("/test/getCurrencies", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

const getPayment = () => instanceDocumentation.get("/test/getPayment");

const getModels = () =>
  instance.get("/test/getModels", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

const simulateInvestment = ({ modelId, currencyId, amount }: any) =>
  instance.post(
    "/test/simulateInvestment",
    {
      model_id: modelId,
      currency_id: currencyId,
      amount,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

const Api = {
  login,
  getCurrencies,
  getPayment,
  getModels,
  simulateInvestment,
};

export default Api;
