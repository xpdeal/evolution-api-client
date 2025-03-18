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
  reject_call: boolean;
  msg_call: string;
  groups_ignore: boolean;
  always_online: boolean;
  read_messages: boolean;
  read_status: boolean;
}

export type MessagePresence = 'composing' | 'recording' | 'paused';
export type ConnectionPresence = 'online' | 'offline' | 'available' | 'unavailable';

export interface MessageOptions {
  delay?: number;
  presence?: MessagePresence;
  quoted?: any;
  mentions?: string[];
}

export interface SendMessageResponse {
  key: {
    id: string;
    remoteJid: string;
    fromMe: boolean;
  };
  status: string;
  message: any;
}

export interface ChatResponse {
  id: string;
  name?: string;
  pushName?: string;
  description?: string;
  isBroadcast?: boolean;
  isGroup?: boolean;
  isReadOnly?: boolean;
  unreadCount?: number;
  timestamp?: number;
  archived?: boolean;
  pinned?: boolean;
  ephemeralDuration?: number;
}

export interface MessageHistoryResponse {
  messages: {
    key: {
      remoteJid: string;
      fromMe: boolean;
      id: string;
    };
    message: any;
    messageTimestamp: number;
    pushName?: string;
    status?: string;
  }[];
  cursor?: string;
}

export interface GroupConfig {
  subject: string;
  description?: string;
  participants: string[];
  messageOnAdd?: boolean;
  addParticipantsMessage?: string;
}

export interface GroupResponse {
  id: string;
  subject: string;
  description?: string;
  owner?: string;
  creation?: number;
  participants?: {
    id: string;
    admin?: boolean;
    superAdmin?: boolean;
  }[];
}

export interface InviteCodeResponse {
  code: string;
  expiration?: number;
}

export type PresenceStatus = ConnectionPresence;
