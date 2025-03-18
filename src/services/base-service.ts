import { IConfig } from '../types';
import axios, { AxiosInstance, AxiosError } from 'axios';

export class BaseService {
  protected baseUrl: string;
  protected globalApikey: string;
  protected instance: string | null;
  protected axiosInstance: AxiosInstance;

  constructor(protected config: IConfig) {
    this.baseUrl = config.getUrl();
    this.globalApikey = config.getApiKey();
    this.instance = null;
    
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'apikey': this.globalApikey
      }
    });
  }

  protected handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return new Error(`API Error: ${axiosError.response.status} - ${JSON.stringify(axiosError.response.data)}`);
      }
      return new Error(`Network Error: ${axiosError.message}`);
    }
    return error as Error;
  }

  useInstance(instance: string): this {
    this.instance = instance;
    return this;
  }
}
