import React, { createContext, useContext, useReducer } from "react";
import Api from "../services/Api";

const actionTypes = {
  LOADING: "loading",
  ERROR: "error",
  LOGIN: "login",
};

type UserState = {
  logged: boolean;
  loading: boolean;
  error: any;
};

type UserContextType = {
  state: UserState;
  dispatch: React.Dispatch<any>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children?: React.ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const initialState: UserState = {
    logged: false,
    loading: false,
    error: null,
  };

  // Reducer para manejar acciones
  const reducer = (state: UserState, action: any) => {
    switch (action.type) {
      case actionTypes.LOADING: {
        return {
          ...state,
          loading: true,
          error: null,
          logged: false,
        };
      }
      case actionTypes.LOGIN: {
        return {
          ...state,
          loading: false,
          logged: true,
        };
      }
      case actionTypes.ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un UserProvider");
  }
  return context;
};

export const userActions = {
  login:
    ({ email, password }: any) =>
    async (dispatch: any) => {
      dispatch({
        type: actionTypes.LOADING,
        payload: { loading: true },
      });

      try {
        const { data } = await Api.login({ email, password });
        localStorage.setItem("token", data.data.token);

        dispatch({
          type: actionTypes.LOGIN,
        });
      } catch (error:any) {
        console.log(error);
        dispatch({
          type: actionTypes.ERROR,
          payload: error.response.data.message,
        });
      }
    },
};
