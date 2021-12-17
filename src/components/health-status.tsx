import { HealthStatus } from "@navitaire-digital/nsk-api-4.5.0";
import { Drvspace7, Issue, Ulclient1235, User4 } from "@react95/icons";
import { FC } from "react";

export const HealthStatusDisplay: FC<{
  healthStatus: HealthStatus;
}> = (props) => {
  switch (props.healthStatus) {
    case HealthStatus.Ok:
      return <Drvspace7></Drvspace7>;
    case HealthStatus.Error:
      return <User4></User4>;
    case HealthStatus.Unknown:
      return <Issue></Issue>;
    case HealthStatus.Warning:
      return <Ulclient1235></Ulclient1235>;
  }
};
