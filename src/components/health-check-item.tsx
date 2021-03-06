import { DigitalApiRestHttpResponse } from "@navitaire-digital/clients-core";
import {
  EnvironmentHealth,
  HealthClient,
} from "@navitaire-digital/nsk-api-4.5.0";
import { Button, Fieldset, Tooltip } from "@react95/core";
import { FC, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClientServicesContext } from "../digital-api/clients";
import { makeHealthKey } from "../utilities/make-key";
import { HealthInformationDisplay } from "./health-information";
import { selectHealth } from "./healthSelectors";
import { SetHealth, SetHealthStatus } from "./healthSlice";

export const HealthCheckItem: FC<{
  env: "nav1" | "nav2";
  type: "nsk" | "api";
}> = (props) => {
  const healthResponse = useSelector(selectHealth(props.env, props.type));
  const clients = useContext(ClientServicesContext);
  const dispatch = useDispatch();
  const key = makeHealthKey(props.env, props.type);
  function reloadHealth() {
    dispatch(
      SetHealthStatus({
        key: makeHealthKey(props.env, props.type),
        status: "LOADING",
      })
    );
    let client: HealthClient | undefined;

    if (props.env === "nav1") {
      client = clients.nav1HealthClient;
    } else if (props.env === "nav2") {
      client = clients.nav2HealthClient;
    }
    if (!client) {
      return;
    }

    let method: Promise<DigitalApiRestHttpResponse<EnvironmentHealth>> | null =
      null;

    if (props.type === "api") {
      method = client.v1_health_get();
    } else if (props.type === "nsk") {
      method = client.nsk_v1_health_get();
    }

    if (!method) {
      return;
    }

    method
      .then((response) => {
        const health: EnvironmentHealth = response.body as EnvironmentHealth;
        dispatch(
          SetHealth({
            key: makeHealthKey(props.env, props.type),
            health,
          })
        );
      })
      .catch(() => {
        dispatch(
          SetHealthStatus({
            key: makeHealthKey(props.env, props.type),
            status: "ERROR",
          })
        );
      });
  }

  const nodes = healthResponse?.health?.nodes?.map((node) => (
    <Tooltip text={node.details || "everything looks good"}>
      <HealthInformationDisplay healthInfo={node}></HealthInformationDisplay>
    </Tooltip>
  ));

  return (
    <Fieldset legend={key}>
      <Button onClick={() => reloadHealth()}>
        Fetch {healthResponse?.status}
      </Button>
      {nodes}
    </Fieldset>
  );
};
