import { Frame, TitleBar } from "@react95/core";
import { FC } from "react";
import { HealthCheckItem } from "./health-check-item";

export const HealthCheckWrapper: FC = () => {
  return (
    <Frame width={"500"} height={"auto"}>
      <TitleBar width={"100%"} title="Environment Health"></TitleBar>
      <HealthCheckItem env="nav1" type="api"></HealthCheckItem>
      <HealthCheckItem env="nav1" type="nsk"></HealthCheckItem>
      <HealthCheckItem env="nav2" type="api"></HealthCheckItem>
      <HealthCheckItem env="nav2" type="nsk"></HealthCheckItem>
    </Frame>
  );
};
