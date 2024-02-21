import { getUser } from "@/api/apiCalls";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

const INITIAL_STATE = {
  user: null,
  loading: true,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN_START":
      return { ...state, loading: true };
    case "LOGIN_SUCCESS":
      return { ...state, user: payload, loading: false };
    case "LOGIN_FAILURE":
      return { ...state, loading: false };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
      };
    default:
      return state;
  }
};

const AuthAPIContext = createContext();
const AuthUserContext = createContext(INITIAL_STATE.user);
const AuthLoadingContext = createContext(INITIAL_STATE.loading);

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const api = useMemo(() => {
    const onLoginStart = () => {
      dispatch({ type: "LOGIN_START" });
    };

    const onLoginSuccess = (payload) => {
      dispatch({ type: "LOGIN_SUCCESS", payload });
    };
    const onLoginFailure = () => {
      dispatch({ type: "LOGIN_FAILURE" });
    };
    const onLogout = () => {
      dispatch({ type: "LOGOUT" });
    };

    return { onLoginStart, onLoginSuccess, onLoginFailure, onLogout };
  }, []);

  useEffect(() => {
    (async () => {
      api.onLoginStart();
      const { data } = await getUser();

      if (data) {
        console.log("User is fetched successfulyy", { ___uSEr___: data });
        api.onLoginSuccess(data?.user);
      } else {
        api.onLoginFailure();
      }
    })();
  }, []);

  return (
    <AuthAPIContext.Provider value={api}>
      <AuthUserContext.Provider value={state.user}>
        <AuthLoadingContext.Provider value={state.loading}>
          {children}
        </AuthLoadingContext.Provider>
      </AuthUserContext.Provider>
    </AuthAPIContext.Provider>
  );
}

export const useAuthAPI = () => useContext(AuthAPIContext);
export const useAuthUser = () => useContext(AuthUserContext);
export const useAuthLoading = () => useContext(AuthLoadingContext);
