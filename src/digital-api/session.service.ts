import {
  ApiRestHeaders,
  ManipulateRequest,
} from "@navitaire-digital/clients-core";

export class DigitalApiSessionService implements ManipulateRequest {
  manipulateRequest(): ApiRestHeaders {
    return {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
  }
}
