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
import { GroupService } from './services/group-service';
import { SettingsService } from './services/settings-service';
import { MessageService } from './services/message-service';
import { ChatService } from './services/chat-service';

export class EvolutionAPI {
  protected baseUrl: string;
  protected globalApikey: string;
  protected instance: string | null;
  private apikey: string | null;
  private axiosInstance: AxiosInstance;
  readonly group: GroupService;
  readonly settings: SettingsService;
  readonly message: MessageService;
  readonly chat: ChatService;

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

    this.group = new GroupService(config);
    this.settings = new SettingsService(config);
    this.message = new MessageService(config);
    this.chat = new ChatService(config);
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

  protected handleError(error: unknown): never {
    // Check if it's an Axios error (both real and mocked)
    if (axios.isAxiosError(error)) {
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
      this.handleError(error);
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
      this.handleError(error);
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
      this.handleError(error);
    }
  }

  async restartInstance(): Promise<any> {
    try {
      return (await this.axiosInstance.post(`/instance/restart/${this.instance}`)).data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async setPresence(presence: PresenceStatus = 'available'): Promise<any> {
    try {
      return (await this.axiosInstance.post(`/instance/setPresence/${this.instance}`, { presence })).data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getConnectionState(): Promise<any> {
    try {
      return (await this.axiosInstance.get(`/instance/connectionState/${this.instance}`)).data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async logoutInstance(): Promise<any> {
    try {
      return (await this.axiosInstance.delete(`/instance/logout/${this.instance}`)).data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteInstance(): Promise<any> {
    try {
      return (await this.useGlobalApikey().axiosInstance.delete(`/instance/delete/${this.instance}`)).data;
    } catch (error) {
      this.handleError(error);
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
      this.handleError(error);
    }
  }

  async findWebhook(): Promise<any> {
    try {
      return (await this.axiosInstance.get(`/webhook/find/${this.instance}`)).data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async setSettings(settings: Partial<Settings>): Promise<any> {
    try {
      const defaultSettings: Settings = {
        reject_call: true,
        msg_call: "I do not accept calls",
        groups_ignore: false,
        always_online: true,
        read_messages: false,
        read_status: false
      };

      const mergedSettings = { ...defaultSettings, ...settings };
      const response = await this.axiosInstance.post(
        `/settings/set/${this.instance}`,
        mergedSettings
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findSettings(): Promise<any> {
    try {
      return (await this.axiosInstance.get(`/settings/find/${this.instance}`)).data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async sendText(number: string, text: string, options: MessageOptions = {}): Promise<any> {
    try {
      return (await this.axiosInstance.post(
        `/message/sendText/${this.instance}`,
        { number, text, ...options }
      )).data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async createGroup(config: GroupConfig): Promise<GroupResponse> {
    try {
      return (await this.axiosInstance.post(
        `/group/create/${this.instance}`,
        config
      )).data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateGroupDescription(groupJid: string, description: string): Promise<any> {
    try {
      return (await this.axiosInstance.post(
        `/group/updateDescription/${this.instance}`,
        { groupJid, description }
      )).data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async fetchInviteCode(groupJid: string): Promise<InviteCodeResponse> {
    try {
      return (await this.axiosInstance.get(
        `/group/inviteCode/${this.instance}?id=${groupJid}`
      )).data;
    } catch (error) {
      this.handleError(error);
    }
  }
}
