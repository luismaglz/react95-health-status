import {
  EnvironmentHealth,
  HealthClient,
} from "@navitaire-digital/nsk-api-4.5.0";
import { Button } from "@react95/core";
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
    client
      .v1_health_get()
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
    <HealthInformationDisplay healthInfo={node}></HealthInformationDisplay>
  ));

  return (
    <div>
      <div>{key}</div>
      <Button onClick={() => reloadHealth()}>Check Status</Button>
      {nodes}
    </div>
  );
};
