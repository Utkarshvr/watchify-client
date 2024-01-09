import {
  CheckCircleOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  StopOutlined,
} from "@ant-design/icons";

export default function NotificationIcon({ severity }) {
  switch (severity) {
    case "success":
      return <CheckCircleOutlined style={{ color: "green", fontSize: 24 }} />;

    case "error":
      return <StopOutlined style={{ color: "red", fontSize: 24 }} />;

    case "in_progress":
      return <LoadingOutlined style={{ color: "lightblue", fontSize: 24 }} />;

    default:
      return (
        <InfoCircleOutlined style={{ color: "lightblue", fontSize: 24 }} />
      );
  }
}
