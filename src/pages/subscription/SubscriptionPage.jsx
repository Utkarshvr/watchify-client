import axiosInstance from "@/api/apiCalls";
import { API_URL } from "@/config/api.routes";
import { Button, Flex } from "antd";

export default function SubscriptionPage() {
  async function sendRequest() {
    try {
      const data = await axiosInstance.get(`${API_URL}/user/me/notify`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Flex>
      <Button onClick={sendRequest}>Send Request</Button>
    </Flex>
  );
}
