import PageTitle from "@/components/ui/PageTitle";
import { useMessageAPI } from "@/context/Other/MessageProvider";
import { Navigate } from "react-router-dom";
export default function DashboardPage() {
  const { info } = useMessageAPI();

  info("Dashboard will be available soon!");

  return (
    <>
      <PageTitle title={"Dashboard"} divider />
      {/* Navigate to Content for now */}
      <Navigate to={"content"} />
    </>
  );
}
