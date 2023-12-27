import { API_URL } from "@/config/api.routes";

export const getUser = async () => {
  try {
    const url = `${API_URL}/auth/login/success`;
    const response = await fetch(url, { credentials: "include" });

    const data = await response.json();
    console.log(data);
    return { data, error: null };
  } catch (err) {
    console.error(err);
    return { data: null, error: err };
  }
};
