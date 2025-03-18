import { IConfig, MessageOptions, SendMessageResponse } from '../types';
import { BaseService } from './base-service';
import axios from 'axios';

export class MessageService extends BaseService {
  constructor(config: IConfig) {
    super(config);
  }

  async sendText(to: string, text: string, options?: MessageOptions): Promise<SendMessageResponse> {
    try {
      const response = await this.axiosInstance.post(
        `/message/text/${this.instance}`,
        { number: to, text, ...options }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async sendImage(to: string, image: string, caption?: string, options?: MessageOptions): Promise<SendMessageResponse> {
    try {
      const response = await this.axiosInstance.post(
        `/message/image/${this.instance}`,
        { number: to, image, caption, ...options }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async sendVideo(to: string, video: string, caption?: string, options?: MessageOptions): Promise<SendMessageResponse> {
    try {
      const response = await this.axiosInstance.post(
        `/message/video/${this.instance}`,
        { number: to, video, caption, ...options }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async sendAudio(to: string, audio: string, options?: MessageOptions): Promise<SendMessageResponse> {
    try {
      const response = await this.axiosInstance.post(
        `/message/audio/${this.instance}`,
        { number: to, audio, ...options }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async sendDocument(to: string, document: string, filename?: string, options?: MessageOptions): Promise<SendMessageResponse> {
    try {
      const response = await this.axiosInstance.post(
        `/message/document/${this.instance}`,
        { number: to, document, filename, ...options }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async sendLocation(to: string, latitude: number, longitude: number, options?: MessageOptions): Promise<SendMessageResponse> {
    try {
      const response = await this.axiosInstance.post(
        `/message/location/${this.instance}`,
        { number: to, latitude, longitude, ...options }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async sendContact(to: string, contact: string, options?: MessageOptions): Promise<SendMessageResponse> {
    try {
      const response = await this.axiosInstance.post(
        `/message/contact/${this.instance}`,
        { number: to, contact, ...options }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async sendReaction(to: string, messageId: string, reaction: string): Promise<SendMessageResponse> {
    try {
      const response = await this.axiosInstance.post(
        `/message/reaction/${this.instance}`,
        { number: to, messageId, reaction }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async reply(to: string, messageId: string, text: string, options?: MessageOptions): Promise<SendMessageResponse> {
    try {
      const response = await this.axiosInstance.post(
        `/message/reply/${this.instance}`,
        { number: to, messageId, text, ...options }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
}
