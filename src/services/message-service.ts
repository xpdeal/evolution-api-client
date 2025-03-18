import { EvolutionAPI } from '../evolution-api-client';
import { IConfig, MessageOptions, SendMessageResponse } from '../types';
import axios from 'axios';

export class MessageService extends EvolutionAPI {
  constructor(config: IConfig) {
    super(config);
  }

  async sendText(to: string, text: string, options?: MessageOptions): Promise<SendMessageResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/message/sendText/${this.instance}`,
        {
          number: to,
          text,
          ...options
        },
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

  async sendImage(to: string, image: string, caption?: string, options?: MessageOptions): Promise<SendMessageResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/message/sendImage/${this.instance}`,
        {
          number: to,
          image,
          caption,
          ...options
        },
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

  async sendVideo(to: string, video: string, caption?: string, options?: MessageOptions): Promise<SendMessageResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/message/sendVideo/${this.instance}`,
        {
          number: to,
          video,
          caption,
          ...options
        },
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

  async sendAudio(to: string, audio: string, options?: MessageOptions): Promise<SendMessageResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/message/sendAudio/${this.instance}`,
        {
          number: to,
          audio,
          ...options
        },
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

  async sendDocument(to: string, document: string, filename?: string, options?: MessageOptions): Promise<SendMessageResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/message/sendDocument/${this.instance}`,
        {
          number: to,
          document,
          filename,
          ...options
        },
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

  async sendLocation(to: string, latitude: number, longitude: number, options?: MessageOptions): Promise<SendMessageResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/message/sendLocation/${this.instance}`,
        {
          number: to,
          latitude,
          longitude,
          ...options
        },
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

  async sendContact(to: string, contact: string, options?: MessageOptions): Promise<SendMessageResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/message/sendContact/${this.instance}`,
        {
          number: to,
          contact,
          ...options
        },
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

  async sendReaction(to: string, messageId: string, reaction: string): Promise<SendMessageResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/message/sendReaction/${this.instance}`,
        {
          number: to,
          messageId,
          reaction
        },
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

  async reply(to: string, text: string, messageId: string, options?: MessageOptions): Promise<SendMessageResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/message/reply/${this.instance}`,
        {
          number: to,
          text,
          messageId,
          ...options
        },
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
