import axios, { AxiosInstance } from "axios";

const { API_HOST, CLIENT_VERSION } = process.env;

// TODO: need transfer to .env
const BACKEND_TIMEOUT = 60000;

type ErrorListener = (error: unknown) => void;

class Backend {
  private readonly axios: AxiosInstance;
  private errorListeners: Array<ErrorListener> = [];

  private responseInterceptorId: number | null = null;

  constructor() {
    this.axios = axios.create({
      baseURL: API_HOST,
      headers: {
        common: {
          "Content-Type": "application/json",
          "X-Client-Type": "Web",
          "X-Client-Version": CLIENT_VERSION
        }
      },
      timeout: BACKEND_TIMEOUT
    });

    this.createAxiosResponseInterceptor();
  }

  public createAxiosResponseInterceptor = () => {
    this.responseInterceptorId = this.axios.interceptors.response.use(
      response => response,
      async error => {
        this.handleResponseError(error);

        return Promise.reject(error);
      }
    );
  };

  public addErrorListener = (listener: ErrorListener) => {
    this.errorListeners.push(listener);

    return () => this.removeErrorListener(listener);
  };

  public removeErrorListener = (listener: ErrorListener) => {
    this.errorListeners = this.errorListeners.filter(item => item !== listener);
  };

  public reset = () => {
    this.errorListeners = [];

    if (this.responseInterceptorId) {
      axios.interceptors.response.eject(this.responseInterceptorId);
      this.responseInterceptorId = null;
    }
  };

  private handleResponseError(error: unknown) {
    this.errorListeners.forEach(listener => listener(error));
  }
}

export default Backend;
