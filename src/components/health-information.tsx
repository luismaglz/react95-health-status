import { HealthInformation } from "@navitaire-digital/nsk-api-4.5.0";
import { Frame } from "@react95/core";
import { FC } from "react";
import { HealthStatusDisplay } from "./health-status";

export const HealthInformationDisplay: FC<{
  healthInfo: HealthInformation;
}> = (props) => {
  return (
    <Frame width={"200"} height={"50"} className="health-info-display-status">
      {props.healthInfo.component}
      <HealthStatusDisplay
        healthStatus={props.healthInfo.status || 0}
      ></HealthStatusDisplay>
    </Frame>
  );
};
