import React, { createContext, useContext, useReducer } from "react";
import Api from "../services/Api";

const actionTypes = {
  LOADING: "loading",
  ERROR: "error",
  GET_CURRENCIES: "get_currencies",
  GET_PAYMENT: "get_payment",
  GET_MODELS: "get_models",
  SIMULATE_INVESTMENT: "simulate_investment",
  REMOVE_PAYMENT: "remove_payment",
};

type InvestmentState = {
  currencies: any;
  payment: any;
  models: any;
  simulateData: any;
  loading: boolean;
  error: any;
};

type InvestmentContextType = {
  state: InvestmentState;
  dispatch: React.Dispatch<any>;
};

const InvestmentContext = createContext<InvestmentContextType | undefined>(
  undefined
);

type InvestmentProviderProps = {
  children?: React.ReactNode;
};

export const InvestmentProvider: React.FC<InvestmentProviderProps> = ({
  children,
}) => {
  const initialState: InvestmentState = {
    currencies: [],
    payment: {},
    models: [],
    simulateData: {},
    loading: false,
    error: null,
  };

  // Reducer para manejar acciones
  const reducer = (state: InvestmentState, action: any) => {
    switch (action.type) {
      case actionTypes.LOADING: {
        return {
          ...state,
          loading: true,
          error: null,
        };
      }
      case actionTypes.GET_CURRENCIES: {
        return {
          ...state,
          loading: false,
          currencies: Object.entries(action.payload).map(([id, value]) => ({
            id: parseInt(id),
            currency: value,
          })),
        };
      }
      case actionTypes.GET_PAYMENT: {
        return {
          ...state,
          loading: false,
          payment: action.payload,
        };
      }
      case actionTypes.GET_MODELS: {
        return {
          ...state,
          loading: false,
          models: Object.entries(action.payload).map(([id, value]) => ({
            id: parseInt(id),
            model: value,
          })),
        };
      }
      case actionTypes.SIMULATE_INVESTMENT: {
        const wrapperData = {
          ...action.payload,
          currency: state.currencies.find(
            ({ id }: any) => action.payload.currency_id === id
          ).currency,
          model: state.models.find(
            ({ id }: any) => action.payload.modelId === id
          ).model,
          totalReceived:
            Number(action.payload.amount) + action.payload.profitability_amount,
        };

        return {
          ...state,
          loading: false,
          simulateData: wrapperData,
        };
      }
      case actionTypes.REMOVE_PAYMENT: {
        return {
          ...state,
          payment: {},
        };
      }
      case actionTypes.ERROR: {
        return {
          ...state,
          error: action.payload,
        };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <InvestmentContext.Provider value={{ state, dispatch }}>
      {children}
    </InvestmentContext.Provider>
  );
};

export const useInvestment = () => {
  const context = useContext(InvestmentContext);
  if (!context) {
    throw new Error(
      "useInvestment debe usarse dentro de un InvestmentProvider"
    );
  }
  return context;
};

export const investmentActions = {
  getCurrencies: () => async (dispatch: any) => {
    dispatch({
      type: actionTypes.LOADING,
      payload: { loading: true },
    });

    try {
      const { data } = await Api.getCurrencies();

      dispatch({
        type: actionTypes.GET_CURRENCIES,
        payload: data.data,
      });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: actionTypes.ERROR,
        payload: error.response.data.message,
      });
    }
  },
  getPayment: () => async (dispatch: any) => {
    dispatch({
      type: actionTypes.LOADING,
      payload: { loading: true },
    });

    try {
      const { data } = await Api.getPayment();

      dispatch({
        type: actionTypes.GET_PAYMENT,
        payload: data.data,
      });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: actionTypes.ERROR,
        payload: error.response.data.message as string,
      });
    }
  },
  getModels: () => async (dispatch: any) => {
    dispatch({
      type: actionTypes.LOADING,
      payload: { loading: true },
    });

    try {
      const { data } = await Api.getModels();

      dispatch({
        type: actionTypes.GET_MODELS,
        payload: data.data,
      });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: actionTypes.ERROR,
        payload: error.response.data.message,
      });
    }
  },
  simulateInvestment:
    ({ modelId, currencyId, amount }: any) =>
    async (dispatch: any) => {
      dispatch({
        type: actionTypes.LOADING,
        payload: { loading: true },
      });

      try {
        const { data } = await Api.simulateInvestment({
          modelId,
          currencyId,
          amount,
        });

        dispatch({
          type: actionTypes.SIMULATE_INVESTMENT,
          payload: { ...data.data, modelId },
        });
      } catch (error: any) {
        console.log(error);
        dispatch({
          type: actionTypes.ERROR,
          payload: error.response.data.message,
        });
      }
    },
  removePayment: () => async (dispatch: any) => {
    dispatch({
      type: actionTypes.REMOVE_PAYMENT,
    });
  },
};
