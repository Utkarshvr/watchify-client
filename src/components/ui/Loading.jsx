import { Spin } from "antd";
import Backdrop from "./Backdrop";

export default function Loading() {
  return (
    <Backdrop>
      <Spin tip="Loading" size="large" />
    </Backdrop>
  );
}
