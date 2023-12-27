import { Divider, Typography } from "antd";

export default function PageTitle({ title, divider }) {
  document.title = `Watchify | ${title}`;

  return (
    <>
      <Typography.Title type="secondary" level={4}>
        {title}
      </Typography.Title>
      {/* {divider ? <Divider style={{ margin: "0.25em 0" }} /> : null} */}
    </>
  );
}
