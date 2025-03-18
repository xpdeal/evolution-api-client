import { AxiosInstance } from 'axios';

export interface InstanceOptions {
  instanceName?: string;
  qrcode?: boolean;
  integration?: string;
}

export interface WebhookConfig {
  enabled?: boolean;
  url?: string;
  webhookByEvents?: boolean;
  webhookBase64?: boolean;
  events?: string[];
}

export interface IConfig {
  getUrl(): string;
  getApiKey(): string;
  setUrl(url: string): void;
  setApiKey(apiKey: string): void;
}

export interface Settings {
  rejectCall?: boolean;
  msgCall?: string;
  groupsIgnore?: boolean;
  alwaysOnline?: boolean;
  readMessages?: boolean;
  syncFullHistory?: boolean;
  readStatus?: boolean;
}

export interface MessageOptions {
  delay?: number;
  presence?: 'composing' | 'recording' | 'paused';
  quoted?: any;
  options?: {
    delay?: number;
    presence?: 'composing' | 'recording' | 'paused';
  };
}

export interface GroupConfig {
  subject: string;
  participants: string[];
  description?: string;
}

export interface GroupResponse {
  id: string;
  subject: string;
  description?: string;
  participants: string[];
}

export interface InviteCodeResponse {
  code: string;
  expiration?: number;
}

export type PresenceStatus = 'available' | 'unavailable' | 'composing' | 'recording' | 'paused';
