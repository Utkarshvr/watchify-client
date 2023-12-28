import { Spin } from "antd";
import Backdrop from "./Backdrop";

export default function Loading() {
  return (
    <Backdrop>
      <Spin size="large" />
    </Backdrop>
  );
}
