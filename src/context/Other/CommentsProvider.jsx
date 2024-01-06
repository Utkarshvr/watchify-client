import { createContext, useContext, useMemo, useReducer } from "react";

const INITIAL_STATE = {
  comments: [],
  isLoading: false,
  videoID: "",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "STORE_VIDEOID":
      return { ...state, videoID: payload?.videoID };
    case "FETCH_START":
      return { ...state, isLoading: true };
    case "FETCH_SUCCESS":
      return { ...state, comments: payload?.comments, isLoading: false };
    case "FETCH_FAILURE":
      return { ...state, isLoading: false };

    default:
      return state;
  }
};

const CommentsContext = createContext(INITIAL_STATE);
const CommentsAPIContext = createContext();

export default function CommentsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const api = useMemo(() => {
    const onFetchStart = (videoID) => {
      dispatch({ type: "FETCH_START", payload: { videoID } });
    };
    const storeVideoID = (videoID) => {
      dispatch({ type: "STORE_VIDEOID", payload: { videoID } });
    };

    const onFetchSuccess = (comments) => {
      dispatch({ type: "FETCH_SUCCESS", payload: { comments } });
    };
    const onFetchFailure = () => {
      dispatch({ type: "FETCH_FAILURE" });
    };

    return { onFetchStart, onFetchSuccess, onFetchFailure, storeVideoID };
  }, []);

  return (
    <CommentsContext.Provider value={state}>
      <CommentsAPIContext.Provider value={api}>
        {children}
      </CommentsAPIContext.Provider>
    </CommentsContext.Provider>
  );
}

export const useCommentsData = () => useContext(CommentsContext);
export const useCommentsAPI = () => useContext(CommentsAPIContext);
