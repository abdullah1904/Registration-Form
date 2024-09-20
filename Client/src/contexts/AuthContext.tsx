import React, { createContext, useReducer, useEffect } from "react";
import { ActionInterface, StateInterface } from "../types";

const initialState: StateInterface = {
  user: undefined,
};

export const AuthContext = createContext<{
  state: StateInterface;
  dispatch: React.Dispatch<ActionInterface>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const authReducer = (state: StateInterface, action: ActionInterface): StateInterface => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);
  console.log(state);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
