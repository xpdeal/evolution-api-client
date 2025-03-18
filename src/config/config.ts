import { IConfig } from '../types';

export class Config implements IConfig {
  constructor(
    private url: string,
    private apiKey: string
  ) {}

  getUrl(): string {
    return this.url;
  }

  getApiKey(): string {
    return this.apiKey;
  }

  setUrl(url: string): void {
    this.url = url;
  }

  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }
}