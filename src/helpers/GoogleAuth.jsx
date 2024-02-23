import { API_URL } from "@/config/api.routes";

export const googleAuth = () => {
  // console.log(window.location.pathname);
  window.localStorage.setItem("redirect_pathname", window.location.pathname);

  window.open(`${API_URL}/auth/google?source=website`, "_self");
};

export const logout = () => {
  window.localStorage.setItem("redirect_pathname", window.location.pathname);

  window.open(`${API_URL}/auth/logout`, "_self");
};
