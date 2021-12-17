import {
  ApiRestHeaders,
  ManipulateRequest,
} from "@navitaire-digital/clients-core";

export class DigitalApiSessionService implements ManipulateRequest {
  manipulateRequest(
    url?: string,
    method?: "GET" | "POST" | "PATCH" | "DELETE" | "PUT",
    headers?: ApiRestHeaders,
    content?: string
  ): { headers?: ApiRestHeaders } {
    return {
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Ocp-Apim-Subscription-Key": "bba82a487de542c2b6a886abacce2742",
      },
    };
  }
}
