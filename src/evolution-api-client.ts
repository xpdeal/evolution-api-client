import axios, { AxiosInstance, AxiosError } from 'axios';
import {
  InstanceOptions,
  WebhookConfig,
  Settings,
  MessageOptions,
  PresenceStatus,
  IConfig,
  GroupConfig,
  GroupResponse,
  InviteCodeResponse
} from './types';

export default class EvolutionAPI {
  private baseUrl: string;
  private globalApikey: string;
  private instance: string | null;
  private apikey: string | null;
  private axiosInstance: AxiosInstance;

  constructor(private config: IConfig) {
    this.baseUrl = config.getUrl();
    this.globalApikey = config.getApiKey();
    this.instance = null;
    this.apikey = null;
    
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'apikey': this.globalApikey
      }
    });
  }

  setInstance(instance: string): this {
    this.instance = instance;
    return this;
  }

  setApikey(apikey: string): this {
    this.apikey = apikey;
    this.axiosInstance.defaults.headers.apikey = apikey;
    return this;
  }

  useGlobalApikey(): this {
    this.axiosInstance.defaults.headers.apikey = this.globalApikey;
    return this;
  }

  private _handleError(error: unknown): never {
    // Check if it's an Axios error (both real and mocked)
    if (error && typeof error === 'object' && 'isAxiosError' in error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.data) {
        throw new Error(`Error ${axiosError.response.status}: ${JSON.stringify(axiosError.response.data)}`);
      }
      throw new Error(axiosError.message);
    } else if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('An unknown error occurred');
  }

  async createInstance(options: InstanceOptions = {}): Promise<any> {
    try {
      const defaultOptions: InstanceOptions = {
        instanceName: this.instance || undefined,
        qrcode: true,
        integration: 'WHATSAPP-BAILEYS'
      };

      const response = await this.axiosInstance.post(
        '/instance/create',
        { ...defaultOptions, ...options }
      );

      if (response.data?.hash) {
        this.apikey = response.data.hash;
        this.axiosInstance.defaults.headers.apikey = this.apikey;
      }

      return response.data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async fetchInstances(instanceName?: string): Promise<any> {
    try {
      let url = '/instance/fetchInstances';
      if (instanceName) {
        url += `?instanceName=${instanceName}`;
      }
      return (await this.axiosInstance.get(url)).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async connectInstance(number?: string): Promise<any> {
    try {
      let url = `/instance/connect/${this.instance}`;
      if (number) {
        url += `?number=${number}`;
      }
      return (await this.axiosInstance.get(url)).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async restartInstance(): Promise<any> {
    try {
      return (await this.axiosInstance.post(`/instance/restart/${this.instance}`)).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async setPresence(presence: PresenceStatus = 'available'): Promise<any> {
    try {
      return (await this.axiosInstance.post(`/instance/setPresence/${this.instance}`, { presence })).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async getConnectionState(): Promise<any> {
    try {
      return (await this.axiosInstance.get(`/instance/connectionState/${this.instance}`)).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async logoutInstance(): Promise<any> {
    try {
      return (await this.axiosInstance.delete(`/instance/logout/${this.instance}`)).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async deleteInstance(): Promise<any> {
    try {
      return (await this.useGlobalApikey().axiosInstance.delete(`/instance/delete/${this.instance}`)).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async setWebhook(webhookConfig: WebhookConfig = {}): Promise<any> {
    try {
      const defaultConfig: WebhookConfig = {
        enabled: true,
        url: "https://webhook.site",
        webhookByEvents: false,
        webhookBase64: false,
        events: [
          "MESSAGES_UPSERT",
          "MESSAGES_UPDATE",
          "SEND_MESSAGE"
        ]
      };

      return (await this.axiosInstance.post(
        `/webhook/set/${this.instance}`,
        { ...defaultConfig, ...webhookConfig }
      )).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async findWebhook(): Promise<any> {
    try {
      return (await this.axiosInstance.get(`/webhook/find/${this.instance}`)).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async setSettings(settings: Settings = {}): Promise<any> {
    try {
      const defaultSettings: Settings = {
        rejectCall: true,
        msgCall: "I do not accept calls",
        groupsIgnore: false,
        alwaysOnline: true,
        readMessages: false,
        syncFullHistory: false,
        readStatus: false
      };

      return (await this.axiosInstance.post(
        `/settings/set/${this.instance}`,
        { ...defaultSettings, ...settings }
      )).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async findSettings(): Promise<any> {
    try {
      return (await this.axiosInstance.get(`/settings/find/${this.instance}`)).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async sendText(number: string, text: string, options: MessageOptions = {}): Promise<any> {
    try {
      return (await this.axiosInstance.post(
        `/message/sendText/${this.instance}`,
        { number, text, ...options }
      )).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async createGroup(config: GroupConfig): Promise<GroupResponse> {
    try {
      return (await this.axiosInstance.post(
        `/group/create/${this.instance}`,
        config
      )).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async updateGroupDescription(groupJid: string, description: string): Promise<any> {
    try {
      return (await this.axiosInstance.post(
        `/group/updateDescription/${this.instance}`,
        { groupJid, description }
      )).data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async fetchInviteCode(groupJid: string): Promise<InviteCodeResponse> {
    try {
      return (await this.axiosInstance.get(
        `/group/inviteCode/${this.instance}?id=${groupJid}`
      )).data;
    } catch (error) {
      this._handleError(error);
    }
  }
}
