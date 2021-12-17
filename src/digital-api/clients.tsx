import { HealthClient } from "@navitaire-digital/nsk-api-4.5.0";
import { createContext, FC, useState } from "react";
import { useDispatch } from "react-redux";
import { DigitalApiHttpClient } from "./http-client";
import { DigitalApiSessionService } from "./session.service";

export const ClientServicesContext = createContext<{
  nav1HealthClient?: HealthClient;
  nav2HealthClient?: HealthClient;
}>({});

const endpoint = "http://nvlcmwb100:10261";

export const ClientServicesProvider: FC = ({ children }) => {
  const dispatch = useDispatch();
  const [httpClient] = useState(new DigitalApiHttpClient(dispatch));
  const [sessionService] = useState(new DigitalApiSessionService());

  const [nav1HealthClient] = useState(
    new HealthClient(endpoint, httpClient, sessionService)
  );

  const [nav2HealthClient] = useState(
    new HealthClient(endpoint, httpClient, sessionService)
  );

  const [clients] = useState({
    nav1HealthClient,
    nav2HealthClient,
  });

  return (
    <ClientServicesContext.Provider value={clients}>
      {children}
    </ClientServicesContext.Provider>
  );
};
