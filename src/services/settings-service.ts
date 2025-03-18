import { IConfig, Settings, PresenceStatus } from '../types';
import { BaseService } from './base-service';

export class SettingsService extends BaseService {
  constructor(config: IConfig) {
    super(config);
  }

  async setSettings(settings: Partial<Settings>): Promise<Settings> {
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
      throw this.handleError(error);
    }
  }

  async getSettings(): Promise<Settings> {
    try {
      const response = await this.axiosInstance.get(
        `/settings/get/${this.instance}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getQrcode(): Promise<string> {
    try {
      const response = await this.axiosInstance.get(
        `/settings/qrcode/${this.instance}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async restart(): Promise<void> {
    try {
      await this.axiosInstance.post(
        `/settings/restart/${this.instance}`
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.axiosInstance.delete(
        `/settings/logout/${this.instance}`
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async setPresence(presence: PresenceStatus): Promise<void> {
    try {
      await this.axiosInstance.post(
        `/settings/presence/${this.instance}`,
        { presence }
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getConnectionState(): Promise<string> {
    try {
      const response = await this.axiosInstance.get(
        `/settings/connection-state/${this.instance}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async setProfilePicture(image: string): Promise<void> {
    try {
      await this.axiosInstance.post(
        `/settings/profile/picture/${this.instance}`,
        { image }
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async setProfileName(name: string): Promise<void> {
    try {
      await this.axiosInstance.post(
        `/settings/profile/name/${this.instance}`,
        { name }
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async setProfileStatus(status: string): Promise<void> {
    try {
      await this.axiosInstance.post(
        `/settings/profile/status/${this.instance}`,
        { status }
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }
}
