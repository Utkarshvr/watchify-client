import { API_URL } from "@/config/api.routes";

export const googleAuth = () => {
  window.open(`${API_URL}/auth/google/callback`, "_self");
};

export const logout = () => {
  window.open(`${API_URL}/auth/logout`, "_self");
};
