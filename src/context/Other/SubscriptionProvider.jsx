import axiosInstance, { getAllVideos } from "@/api/apiCalls";
import { API_URL } from "@/config/api.routes";
import { createContext, useContext, useEffect, useState } from "react";

const SubscriptionDataContext = createContext();
const SubscriptionAPIContext = createContext();

const SubscriptionProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState([]);

  // const user = useAuthUser();

  async function loadSubscriptions() {
    setIsLoading(true);
    try {
      const data = await axiosInstance.get(`${API_URL}/user/me/subscriptions`);
      console.log(data);
      setSubscriptions(data?.data?.subscriptions);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadSubscriptions();
  }, []);

  useEffect(() => {
    if (subscriptions?.length > 0) {
      const allVideos = [];
      subscriptions?.map(async ({ channel }) => {
        try {
          const { data } = await getAllVideos(channel?._id);

          allVideos.push(...data?.videos);
          setVideos(allVideos);
        } catch (error) {
          console.log(error);
        }
      });
    }
  }, [subscriptions]);

  return (
    <SubscriptionDataContext.Provider
      value={{ subscriptions, isLoading, videos }}
    >
      <SubscriptionAPIContext.Provider value={{}}>
        {children}
      </SubscriptionAPIContext.Provider>
    </SubscriptionDataContext.Provider>
  );
};

export default SubscriptionProvider;

export const useSubscriptionData = () => useContext(SubscriptionDataContext);
