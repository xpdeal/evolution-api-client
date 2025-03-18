import { EvolutionAPI } from '../evolution-api-client';
import { IConfig, ChatResponse, MessageHistoryResponse } from '../types';
import axios from 'axios';
import { BaseService } from './base-service';

export class ChatService extends BaseService {
  constructor(config: IConfig) {
    super(config);
  }

  async findChat(chatId: string): Promise<ChatResponse> {
    try {
      const response = await this.axiosInstance.get(
        `/chat/findChat/${this.instance}?id=${chatId}`,
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

  async fetchAllChats(): Promise<ChatResponse[]> {
    try {
      const response = await this.axiosInstance.get(
        `/chat/fetchAllChats/${this.instance}`,
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

  async fetchPrivateChats(): Promise<ChatResponse[]> {
    try {
      const response = await this.axiosInstance.get(
        `/chat/fetchPrivateChats/${this.instance}`,
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

  async fetchGroupChats(): Promise<ChatResponse[]> {
    try {
      const response = await this.axiosInstance.get(
        `/chat/fetchGroupChats/${this.instance}`,
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

  async fetchMessages(chatId: string, count?: number): Promise<MessageHistoryResponse> {
    try {
      const response = await this.axiosInstance.get(
        `/chat/fetchMessages/${this.instance}`,
        {
          params: {
            id: chatId,
            count
          },
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

  async getChats(): Promise<ChatResponse[]> {
    try {
      const response = await this.axiosInstance.get(
        `/chat/get/${this.instance}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getMessageHistory(chatId: string, includeMe: boolean = true): Promise<MessageHistoryResponse> {
    try {
      const response = await this.axiosInstance.get(
        `/chat/messages/${this.instance}`,
        {
          params: {
            chatId,
            includeMe
          }
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async markMessageAsRead(messageId: string): Promise<void> {
    try {
      await this.axiosInstance.post(
        `/chat/markMessageAsRead/${this.instance}`,
        { messageId }
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async archiveChat(chatId: string): Promise<void> {
    try {
      await this.axiosInstance.post(
        `/chat/archive/${this.instance}`,
        { chatId }
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async unarchiveChat(chatId: string): Promise<void> {
    try {
      await this.axiosInstance.post(
        `/chat/unarchive/${this.instance}`,
        { chatId }
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteChat(chatId: string): Promise<void> {
    try {
      await this.axiosInstance.delete(
        `/chat/delete/${this.instance}`,
        {
          data: { chatId }
        }
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async clearChat(chatId: string): Promise<void> {
    try {
      await this.axiosInstance.post(
        `/chat/clear/${this.instance}`,
        { chatId }
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }
}
