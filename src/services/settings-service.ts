import { EvolutionAPI } from '../evolution-api-client';
import { IConfig, Settings, PresenceStatus } from '../types';
import axios from 'axios';

export class SettingsService extends EvolutionAPI {
  constructor(config: IConfig) {
    super(config);
  }

  async findSettings(): Promise<Settings> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/settings/find/${this.instance}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.globalApikey
          }
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateSettings(settings: Settings): Promise<Settings> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/settings/update/${this.instance}`,
        settings,
        {
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.globalApikey
          }
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getQrcode(): Promise<string> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/settings/qrcode/${this.instance}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.globalApikey
          }
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async restart(): Promise<void> {
    try {
      await axios.post(
        `${this.baseUrl}/settings/restart/${this.instance}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.globalApikey
          }
        }
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await axios.delete(
        `${this.baseUrl}/settings/logout/${this.instance}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.globalApikey
          }
        }
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async setPresence(presence: PresenceStatus): Promise<void> {
    try {
      await axios.post(
        `${this.baseUrl}/settings/setPresence/${this.instance}`,
        { presence },
        {
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.globalApikey
          }
        }
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getConnectionState(): Promise<string> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/settings/connectionState/${this.instance}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.globalApikey
          }
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
}
