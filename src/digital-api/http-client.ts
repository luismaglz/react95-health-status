import {
  ApiRestHeaders,
  DigitalApiResponse,
  DigitalApiRestHttpClient,
  DigitalApiRestHttpResponse,
} from "@navitaire-digital/clients-core";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Dispatch } from "redux";

export class DigitalApiHttpClient implements DigitalApiRestHttpClient {
  requestConfig: AxiosRequestConfig = {
    timeout: 25000,
  };
  constructor(protected dispatch: Dispatch<any>) {}
  async get<T>(
    url: string,
    headers?: ApiRestHeaders
  ): Promise<DigitalApiRestHttpResponse<T>> {
    const axiosResponse = await axios.get<DigitalApiResponse<T>>(url, {
      headers,
      ...this.requestConfig,
    });

    return this.mapToRestHttpResponse(axiosResponse);
  }

  async put<T>(
    url: string,
    body: {},
    headers?: ApiRestHeaders
  ): Promise<DigitalApiRestHttpResponse<T>> {
    const axiosResponse = await axios.post<DigitalApiResponse<T>>(
      url,
      {
        headers,
        body,
      },
      this.requestConfig
    );

    return this.mapToRestHttpResponse(axiosResponse);
  }

  async patch<T>(
    url: string,
    body: {},
    headers?: ApiRestHeaders
  ): Promise<DigitalApiRestHttpResponse<T>> {
    const axiosResponse = await axios.patch<DigitalApiResponse<T>>(
      url,
      {
        headers,
        body,
      },
      this.requestConfig
    );

    return this.mapToRestHttpResponse(axiosResponse);
  }

  async delete<T>(
    url: string,
    body: {},
    headers?: ApiRestHeaders
  ): Promise<DigitalApiRestHttpResponse<T>> {
    const axiosResponse = await axios.delete<DigitalApiResponse<T>>(url, {
      headers,
      ...this.requestConfig,
    });

    return this.mapToRestHttpResponse(axiosResponse);
  }

  async post<T>(
    url: string,
    body: {},
    headers?: ApiRestHeaders
  ): Promise<DigitalApiRestHttpResponse<T>> {
    const axiosResponse = await axios.post<DigitalApiResponse<T>>(
      url,
      {
        headers,
        body,
      },
      this.requestConfig
    );

    return this.mapToRestHttpResponse(axiosResponse);
  }

  mapToRestHttpResponse<T>(
    response: AxiosResponse<DigitalApiResponse<T>>
  ): DigitalApiRestHttpResponse<T> {
    const headers: ApiRestHeaders = {};
    // for (const key of response.headers.keys) {
    //   headers[key] = response.headers[key];
    // }

    const httpResponse: DigitalApiRestHttpResponse<T> = {
      headers,
      status: response.status,
      body: response.data,
    };
    return httpResponse;
  }

  slideTokenExpiration(): void {}
}
